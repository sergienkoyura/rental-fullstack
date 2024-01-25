package com.yurii.rentalserver.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {
    private double rating;
    private String itemId;
    private Optional<String> reviewDescription;
}
