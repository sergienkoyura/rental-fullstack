package com.yurii.rentalserver.requestmodels;

import lombok.Data;

@Data
public class AddItemRequest {
    private String title;
    private String admin;
    private String description;
    private int copies;
    private String category;
    private byte[] img;
}
