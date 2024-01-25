package com.yurii.rentalserver.dao;

import com.yurii.rentalserver.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    Payment findByUserEmail(String userEmail);
}
