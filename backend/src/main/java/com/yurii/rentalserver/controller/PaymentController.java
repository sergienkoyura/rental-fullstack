package com.yurii.rentalserver.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.yurii.rentalserver.requestmodels.PaymentInfoRequest;
import com.yurii.rentalserver.service.PaymentService;
import com.yurii.rentalserver.utils.ExtractJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/payment/secure")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final ExtractJWT extractJWT;

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = extractJWT.payloadJWTExtraction(token, "sub");
        if (userEmail == null){
            throw new Exception("User email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }
}
