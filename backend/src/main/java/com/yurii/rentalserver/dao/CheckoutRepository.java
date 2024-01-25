package com.yurii.rentalserver.dao;

import com.yurii.rentalserver.entity.Checkout;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends MongoRepository<Checkout, String> {
    Checkout findByUserEmailAndItemId(String userEmail, String itemId);

    List<Checkout> findItemsByUserEmail(String userEmail);

    @Query("{'item_id':  ?0}")
    void deleteAllByItemId(@Param("item_id") String itemId);
}
