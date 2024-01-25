package com.yurii.rentalserver.dao;

import com.yurii.rentalserver.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends MongoRepository<Review, String> {
    Page<Review> findByItemId(@RequestParam("item_id") String itemId, Pageable pageable);

    Review findByUserEmailAndItemId(String userEmail, String itemId);
    @Query("{'item_id':  ?0}")
    void deleteAllByItemId(@Param("item_id") String itemId);
}
