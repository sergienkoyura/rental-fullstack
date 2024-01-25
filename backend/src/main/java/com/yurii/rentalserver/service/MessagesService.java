package com.yurii.rentalserver.service;

import com.yurii.rentalserver.dao.MessageRepository;
import com.yurii.rentalserver.entity.Message;
import com.yurii.rentalserver.requestmodels.AdminQuestionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessagesService {
    private final MessageRepository messageRepository;

    public void postMessage(Message messageRequest, String userEmail){
        Message message = Message.builder()
                .title(messageRequest.getTitle())
                .question(messageRequest.getQuestion())
                .userEmail(userEmail)
                .build();
        messageRepository.save(message);
    }

    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws RuntimeException{
        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());
        if (message.isEmpty())
            throw new RuntimeException("Message not found");

        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }
}
