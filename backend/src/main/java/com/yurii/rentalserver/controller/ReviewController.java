package com.yurii.rentalserver.controller;

import com.yurii.rentalserver.requestmodels.ReviewRequest;
import com.yurii.rentalserver.service.ReviewService;
import com.yurii.rentalserver.utils.ExtractJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final ExtractJWT extractJWT;

    @GetMapping("/secure/item")
    public Boolean reviewItemByUser(@RequestHeader(value = "Authorization") String token,
                                    @RequestParam String itemId){
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        if (userEmail == null)
            throw new RuntimeException("User email is missing");
        return reviewService.userReviewListed(userEmail, itemId);
    }

    @PostMapping("/secure")
    public void addReview(@RequestHeader(value = "Authorization") String token,
                          @RequestBody ReviewRequest request){
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        if (userEmail == null)
            throw new RuntimeException("User email is missing");
        reviewService.addReview(userEmail, request);
    }

}
