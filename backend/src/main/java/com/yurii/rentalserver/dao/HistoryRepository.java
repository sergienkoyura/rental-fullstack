package com.yurii.rentalserver.dao;

import com.yurii.rentalserver.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface HistoryRepository extends MongoRepository<History, String> {
   Page<History> findItemsByUserEmail(@RequestParam("email") String userEmail, Pageable pageable);
}
