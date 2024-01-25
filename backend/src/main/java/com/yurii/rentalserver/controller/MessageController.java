package com.yurii.rentalserver.controller;

import com.yurii.rentalserver.entity.Message;
import com.yurii.rentalserver.requestmodels.AdminQuestionRequest;
import com.yurii.rentalserver.service.MessagesService;
import com.yurii.rentalserver.utils.ExtractJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessagesService messagesService;
    private final ExtractJWT extractJWT;

    @PostMapping("/secure")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest){
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        String userType = extractJWT.payloadJWTExtraction(token, "userType");

        if (userType == null || !userType.equals("admin")){
            throw new Exception("Administrator page only");
        }
        messagesService.putMessage(adminQuestionRequest, userEmail);
    }
}
