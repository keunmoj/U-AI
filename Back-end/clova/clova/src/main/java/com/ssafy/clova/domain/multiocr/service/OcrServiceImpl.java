package com.ssafy.clova.domain.multiocr.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.clova.domain.multiocr.dto.OcrDto;
import com.ssafy.clova.domain.multiocr.dto.OcrResultDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OcrServiceImpl implements OcrService{
    private String apiURL = "https://pn1cviln5o.apigw.ntruss.com/custom/v1/25019/43cb75334f4b833fbad3ade5fea79ae61eb36111a883f491554027d696426ec9/general";
    private String secretKey = "aFBtU09YS2JCQ09TVGJlaE1Qa2NLVlVZUGVyd2FxRFc=";
    private String imageFile = "C:\\Users\\SSAFY\\S09P22E104\\Back-end\\clova\\clova\\build\\resources\\main\\static\\jpg\\goldenbell.jpg";
    @Override
    public OcrResultDto multiOcr(MultipartFile image) throws IOException{
        System.out.println("--------------- multiOcr 서비스 -------------------");
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("file", image.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody);
        RestTemplate restTemplate = new RestTemplate();

        long start, end, elapsed;

        start = System.currentTimeMillis();
        ResponseEntity<byte[]> response = restTemplate.exchange("http://127.0.0.1:8000/review/api/review/", HttpMethod.POST, requestEntity, byte[].class);
        end = System.currentTimeMillis();
        elapsed = end - start;
        System.out.println("파이썬 갔다 온 시간 = " + elapsed);
        OcrResultDto ocrResultDto = new OcrResultDto();
        if (response.getStatusCode().is2xxSuccessful()) {
             // 해당 코드는 내 로컬에 사진을 저장하는 방식임 -> 서버에 올리게 되면 어떻게 되는지 몰라서 주석처리
            byte[] bytes = response.getBody();
            // C:\Users\SSAFY\S09P22E104\Back-end\clova\clova\build\resources\main\static\jpg 해당 경로로 이미지가 올라간다.
            Path resourcesDirectoryPath = Paths.get(new ClassPathResource("static/jpg").getURI());
            System.out.println("resourcesDirectoryPath = " + resourcesDirectoryPath);
            // Create a file in the specific directory
            File file = new File(resourcesDirectoryPath.toFile(), "goldenbell.jpg");
            // Write the bytes to the file
            Files.write(file.toPath(), bytes);
            // 네이버 클로바 OCR API 호출

            start = System.currentTimeMillis();
            String resultText = apiCall();
            end = System.currentTimeMillis();
            System.out.println("네이버 클로바 api 호출 시간 = " + (end - start));
            System.out.println(resultText);

            // JSON 문자열을 파싱하는 ObjectMapper 생성
            ObjectMapper objectMapper = new ObjectMapper();

            // JSON 문자열을 JsonNode로 파싱
            JsonNode jsonNode = objectMapper.readTree(resultText);
            // JSON 내부에서 image 값을 확인하면서 필요한 값만 가져온다.
            JsonNode imagesNode = jsonNode.get("images");

            start = System.currentTimeMillis();
            if (imagesNode != null && imagesNode.isArray()) {
                for (JsonNode imageNode : imagesNode) {
                    // Extract the "fields" array
                    JsonNode fieldsNode = imageNode.get("fields");
                    if (fieldsNode != null && fieldsNode.isArray()) {
                        List<OcrDto> ocrDtoList = new ArrayList<>();
                        for (JsonNode field : fieldsNode) {
                            // Extract the values of "inferText" and "Vertical"
                            OcrDto ocrDto = new OcrDto();
                            String inferTextValue = field.get("inferText").asText().replaceAll(" ", "");
                            System.out.println("inferText = " + inferTextValue);
                            ocrDto.setInferText(inferTextValue);
                            JsonNode vertices = imageNode.get("fields").get(0).get("boundingPoly").get("vertices");
                            System.out.println("Vertices for Image:");
                            double[] xArray = new double[4];
                            double[] yArray = new double[4];
                            int idx = 0;
                            for (JsonNode vertex : vertices) {
                                double x = vertex.get("x").asDouble();
                                double y = vertex.get("y").asDouble();
                                xArray[idx] = x;
                                yArray[idx] = y;
                                idx++;
                                System.out.println("x: " + x + ", y: " + y);
                            }
                            ocrDto.setX(xArray);
                            ocrDto.setY(yArray);
                            ocrDtoList.add(ocrDto);
                        }
                        ocrResultDto.setOcrDtoList(ocrDtoList);
                    }
                }
            }
            end = System.currentTimeMillis();
            System.out.println("json 파싱하는 시간 = " + (end - start));
            ocrResultDto.setResult(1);
            return ocrResultDto;
        } else {
            System.out.println("안됨");
            ocrResultDto.setResult(-1);
            return ocrResultDto;
        }
    }
    public String apiCall(){
        try {
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setReadTimeout(30000);
            con.setRequestMethod("POST");
            String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
            con.setRequestProperty("X-OCR-SECRET", secretKey);

            JSONObject json = new JSONObject();
            json.put("version", "V2");
            json.put("requestId", UUID.randomUUID().toString());
            json.put("timestamp", System.currentTimeMillis());
            JSONObject image = new JSONObject();
            image.put("format", "jpg");
            image.put("name", "demo");
            JSONArray images = new JSONArray();
            images.put(image);
            json.put("images", images);
            String postParams = json.toString();

            con.connect();
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());

            File file = new File(imageFile);
            writeMultiPart(wr, postParams, file, boundary);
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            System.out.println(response);

            return response.toString();
        } catch (Exception e) {
            System.out.println(e);
            return "요청 실패";
        }
    }
    public void writeMultiPart(OutputStream out, String jsonMessage, File file, String boundary) throws
            IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("--").append(boundary).append("\r\n");
        sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");
        sb.append(jsonMessage);
        sb.append("\r\n");

        out.write(sb.toString().getBytes("UTF-8"));
        out.flush();

        if (file != null && file.isFile()) {
            out.write(("--" + boundary + "\r\n").getBytes("UTF-8"));
            StringBuilder fileString = new StringBuilder();
            fileString
                    .append("Content-Disposition:form-data; name=\"file\"; filename=");
            fileString.append("\"" + file.getName() + "\"\r\n");
            fileString.append("Content-Type: application/octet-stream\r\n\r\n");
            out.write(fileString.toString().getBytes("UTF-8"));
            out.flush();

            try (FileInputStream fis = new FileInputStream(file)) {
                byte[] buffer = new byte[8192];
                int count;
                while ((count = fis.read(buffer)) != -1) {
                    out.write(buffer, 0, count);
                }
                out.write("\r\n".getBytes());
            }

            out.write(("--" + boundary + "--\r\n").getBytes("UTF-8"));
        }
        out.flush();
    }
}
