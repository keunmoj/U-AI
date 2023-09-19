from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from ultralytics import YOLO
import cv2
import numpy as np
import time
import uuid
import requests
import json


@api_view(['POST'])
@csrf_exempt
def review(request):
    upload_file = request.FILES['file']
    image_data = upload_file.read() # .read() 함수를 통해 이미지를 바이트 형식으로 읽어온다.

    # 모델 불러오기
    model = load_yolo_model()
    # 이미지 전처리(화이트 보드 인식, 화이트 보드 제외한 부분 흰색으로 처리)
    output_path = image_preprocessing(model, image_data)
    # 저장된 이미지 파일을 읽어서 HttpResponse로 반환
    image_file = open(output_path, "rb")
    response = FileResponse(image_file)

    return response

def load_yolo_model():
    model = YOLO("C:\\Users\\SSAFY\\S09P22E104\\Back-end\\pythonserver\\whiteBoard_v8l.pt")
    return model

def image_preprocessing(model, image_data):
    input_image = cv2.imdecode(np.frombuffer(image_data, np.uint8), -1)  # 바이너리 이미지 데이터를 읽습니다.
    # classes=[63, 67]
    # Run inference on the source
    start = int(time.time() * 1000)  # 현재 시간을 밀리초로 변환
    results = model.predict(input_image, conf=0.05)  # list of Results objects
    end = int(time.time() * 1000)
    print("화이트보드 객체 인식 시간 = ", end - start)
    # rectangles = []

    height, width, _ = input_image.shape
    output_image = np.ones_like(input_image) * 255
    start = int(time.time() * 1000)  # 현재 시간을 밀리초로 변환
    for xys in results[0].boxes.xyxy:
        print(xys)

        x_min, y_min, x_max, y_max = xys.cpu().numpy()

        x_min = round(x_min)
        y_min = round(y_min)
        y_max = round(y_max)
        x_max = round(x_max)

        print(x_min, y_min, x_max, y_max)

        output_image[y_min:y_max, x_min:x_max] = input_image[y_min:y_max, x_min:x_max]
    end = int(time.time() * 1000)
    print("전처리 시간 = ", end - start)
    output_path = "media/jpg/output.jpg"
    cv2.imwrite(output_path, output_image)

    return output_path

def clova_api_call(output_path):
    api_url = 'https://pn1cviln5o.apigw.ntruss.com/custom/v1/25019/43cb75334f4b833fbad3ade5fea79ae61eb36111a883f491554027d696426ec9/general'
    secret_key = 'aFBtU09YS2JCQ09TVGJlaE1Qa2NLVlVZUGVyd2FxRFc='
    image_file = output_path
    request_json = {
        'images': [
            {
                'format': 'jpg',
                'name': 'demo'
            }
        ],
        'requestId': str(uuid.uuid4()),
        'version': 'V2',
        'timestamp': int(round(time.time() * 1000))
    }

    payload = {'message': json.dumps(request_json).encode('UTF-8')}
    files = [
        ('file', open(image_file, 'rb'))
    ]
    headers = {
        'X-OCR-SECRET': secret_key
    }

    response = requests.request("POST", api_url, headers=headers, data=payload, files=files)

    return response.text.encode('utf8')
