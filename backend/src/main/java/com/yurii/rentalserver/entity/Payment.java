package com.yurii.rentalserver.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "payment")
@Data
@Builder
public class Payment {
    @Id
    private String id;
    @Field(name = "user_email")
    private String userEmail;
    private double amount;
}
