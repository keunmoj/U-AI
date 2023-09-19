package com.isix.reactiveserver.socket.controller;

import com.isix.reactiveserver.socket.dto.SocketDto;
import com.isix.reactiveserver.videostream.handler.MultiSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SocketController {
    private final MultiSocketHandler multiSocketHandler;
    @PostMapping("/session/make")
    public ResponseEntity makeSession(@RequestBody SocketDto.SendInfo requestBody) throws IOException {
        System.out.println(requestBody.toString());
        String socketId = requestBody.getSocketId();
        if(multiSocketHandler.getSession(socketId).isOpen()) {
            multiSocketHandler.getSession(socketId).sendMessage(new TextMessage("HTTP"));
        }
        return new ResponseEntity("hi", HttpStatus.CREATED);
    }

    @GetMapping("/session/check")
    public ResponseEntity getMessage(@RequestBody SocketDto.SendInfo requestBody) throws Exception{
        byte[] temp = multiSocketHandler.getByteMessage(requestBody.getSocketId());

        String response = new String(temp);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity(temp,headers,HttpStatus.OK);
    }

}
