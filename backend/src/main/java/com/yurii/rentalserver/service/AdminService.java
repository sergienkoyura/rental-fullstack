package com.yurii.rentalserver.service;

import com.yurii.rentalserver.dao.ItemRepository;
import com.yurii.rentalserver.dao.CheckoutRepository;
import com.yurii.rentalserver.dao.ReviewRepository;
import com.yurii.rentalserver.entity.Item;
import com.yurii.rentalserver.requestmodels.AddItemRequest;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ItemRepository itemRepository;
    private final ReviewRepository reviewRepository;
    private final CheckoutRepository checkoutRepository;

    public void addItem(AddItemRequest addItemRequest){
        Item item = Item.builder()
                .title(addItemRequest.getTitle())
                .admin(addItemRequest.getAdmin())
                .description(addItemRequest.getDescription())
                .copies(addItemRequest.getCopies())
                .copiesAvailable(addItemRequest.getCopies())
                .category(addItemRequest.getCategory())
                .img(new Binary(BsonBinarySubType.ENCRYPTED, addItemRequest.getImg()))
                .build();
        itemRepository.save(item);
    }

    public void deleteItem(String itemId) throws Exception{
        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty()){
            throw new Exception("Item not found");
        }

        itemRepository.delete(item.get());
        checkoutRepository.deleteAllByItemId(itemId);
        reviewRepository.deleteAllByItemId(itemId);
    }

    public void increaseItemQuantity(String itemId) throws Exception{
        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty()){
            throw new Exception("Item not found");
        }

        item.get().setCopies(item.get().getCopies() + 1);
        item.get().setCopiesAvailable(item.get().getCopiesAvailable() + 1);
        itemRepository.save(item.get());
    }

    public void decreaseItemQuantity(String itemId) throws Exception{
        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isEmpty()){
            throw new Exception("Item not found");
        }

        item.get().setCopies(item.get().getCopies() - 1);
        item.get().setCopiesAvailable(item.get().getCopiesAvailable() - 1);
        itemRepository.save(item.get());
    }

}
