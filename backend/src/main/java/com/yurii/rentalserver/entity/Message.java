package com.yurii.rentalserver.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "messages")
@Data
@Builder
public class Message {
    @Id
    private String id;
    @Field(name = "user_email")
    private String userEmail;
    private String title;
    private String question;
    @Field(name = "admin_email")
    private String adminEmail;
    private String response;
    private boolean closed;
}
