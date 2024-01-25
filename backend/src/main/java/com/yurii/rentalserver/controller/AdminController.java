package com.yurii.rentalserver.controller;

import com.yurii.rentalserver.requestmodels.AddItemRequest;
import com.yurii.rentalserver.service.AdminService;
import com.yurii.rentalserver.utils.ExtractJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final ExtractJWT extractJWT;
    @PostMapping("/secure/add-item")
    public void addItem(@RequestHeader(value = "Authorization") String token,
                        @RequestBody AddItemRequest addItemRequest) throws Exception {
        String userType = extractJWT.payloadJWTExtraction(token, "userType");
        if (userType == null || !userType.equals("admin"))
            throw new Exception("Access denied");
         adminService.addItem(addItemRequest);
    }

    @PutMapping("/secure/item-quantity/increase")
    public void increaseQuantity(@RequestHeader(value = "Authorization") String token,
                                 @RequestParam String itemId) throws Exception {
        String userType = extractJWT.payloadJWTExtraction(token, "userType");
        if (userType == null || !userType.equals("admin"))
            throw new Exception("Access denied");
        adminService.increaseItemQuantity(itemId);
    }

    @PutMapping("/secure/item-quantity/decrease")
    public void decreaseQuantity(@RequestHeader(value = "Authorization") String token,
                                 @RequestParam String itemId) throws Exception {
        String userType = extractJWT.payloadJWTExtraction(token, "userType");
        if (userType == null || !userType.equals("admin"))
            throw new Exception("Access denied");
        adminService.decreaseItemQuantity(itemId);
    }

    @DeleteMapping("/secure/delete-item")
    public void deleteItem(@RequestHeader(value = "Authorization") String token,
                                 @RequestParam String itemId) throws Exception {
        String userType = extractJWT.payloadJWTExtraction(token, "userType");
        if (userType == null || !userType.equals("admin"))
            throw new Exception("Access denied");
        adminService.deleteItem(itemId);
    }
}
