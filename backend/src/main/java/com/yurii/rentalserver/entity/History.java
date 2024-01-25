package com.yurii.rentalserver.entity;

import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "history")
@Data
@Builder
public class History {
    @Id
    private String id;

    @Field(name = "user_email")
    private String userEmail;
    @Field(name = "checkout_date")
    private String checkoutDate;
    @Field(name = "returned_date")
    private String returnedDate;
    private String title;
    private String admin;
    private String description;
    private Binary img;
}
