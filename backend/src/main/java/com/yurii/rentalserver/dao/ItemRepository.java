package com.yurii.rentalserver.dao;

import com.yurii.rentalserver.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ItemRepository extends MongoRepository<Item, String> {
    Page<Item> findByTitleContainingIgnoreCase(@RequestParam("title") String title, Pageable pageable);
    Page<Item> findByCategory(@RequestParam("category") String category, Pageable pageable);

    @Query("{'_id': {$in: ?0}}")
    List<Item> findItemsByItemIds(@RequestParam("item_ids") List<String> itemIds);
}
