package com.yurii.rentalserver.service;

import com.yurii.rentalserver.dao.ReviewRepository;
import com.yurii.rentalserver.entity.Review;
import com.yurii.rentalserver.requestmodels.ReviewRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public void addReview(String userEmail, ReviewRequest request) {
        Review validateReview = reviewRepository.findByUserEmailAndItemId(userEmail, request.getItemId());
        if (validateReview != null)
            throw new RuntimeException("Review already created!");

        Review review = Review.builder()
                .itemId(request.getItemId())
                .rating(request.getRating())
                .userEmail(userEmail)
                .reviewDescription(request.getReviewDescription().orElse(null))
                .date(LocalDate.now())
                .build();
        reviewRepository.save(review);
    }

    public boolean userReviewListed(String userEmail, String itemId){
        Review validateReview = reviewRepository.findByUserEmailAndItemId(userEmail, itemId);
        return validateReview != null;
    }
}
