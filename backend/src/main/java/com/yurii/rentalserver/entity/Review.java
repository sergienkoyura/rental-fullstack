package com.yurii.rentalserver.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Document(collection = "reviews")
@Data
@Builder
public class Review {
    @Id
    private String id;
    @Field(name = "user_email")
    private String userEmail;
    @CreatedDate
    private LocalDate date;
    private double rating;
    @Field(name = "item_id")
    private String itemId;
    @Field(name = "review_description")
    private String reviewDescription;
}
