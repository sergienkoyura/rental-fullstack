package com.yurii.rentalserver.entity;

import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "items")
@Data
@Builder
public class Item {
    @Id
    private String id;
    private String title;
    private String admin;
    private String description;
    private int copies;
    @Field(name = "copies_available")
    private int copiesAvailable;
    private String category;
    private Binary img;
}
