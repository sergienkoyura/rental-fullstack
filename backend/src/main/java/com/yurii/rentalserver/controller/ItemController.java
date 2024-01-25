package com.yurii.rentalserver.controller;

import com.yurii.rentalserver.entity.Item;
import com.yurii.rentalserver.responsemodels.CurrentLoansResponse;
import com.yurii.rentalserver.service.ItemService;
import com.yurii.rentalserver.utils.ExtractJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    private final ExtractJWT extractJWT;

    @GetMapping("/secure/current-loans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        return itemService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/current-loans")
    public List<CurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        return itemService.currentLoans(userEmail);
    }

    @PutMapping("/secure/checkout")
    public Item checkoutItem(@RequestHeader(value = "Authorization") String token,
                             @RequestParam String itemId) throws Exception {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        return itemService.checkoutItem(userEmail, itemId);
    }

    @GetMapping("/secure/is-checked-out")
    public Boolean checkoutItemByUser(@RequestHeader(value = "Authorization") String token,
                                      @RequestParam String itemId) {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        return itemService.checkoutItemByUser(userEmail, itemId);
    }

    @PutMapping("/secure/return")
    public void returnItem(@RequestHeader(value = "Authorization") String token,
                           @RequestParam String itemId) throws Exception {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        itemService.returnItem(userEmail, itemId);
    }

    @PutMapping("/secure/renew")
    public void renewItem(@RequestHeader(value = "Authorization") String token,
                           @RequestParam String itemId) throws Exception {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        itemService.renewLoan(userEmail, itemId);
    }
}
