package com.yurii.rentalserver.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "checkouts")
@Data
@Builder
public class Checkout {
    @Id
    private String id;
    @Field(name = "user_email")
    private String userEmail;
    @Field(name = "checkout_date")
    private String checkoutDate;
    @Field(name = "return_date")
    private String returnDate;
    @Field(name = "item_id")
    private String itemId;
}
