package com.yurii.rentalserver.dao;

import com.yurii.rentalserver.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface MessageRepository extends MongoRepository<Message, String> {
    Page<Message> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);
    Page<Message> findByClosed(Boolean closed, Pageable pageable);
}
