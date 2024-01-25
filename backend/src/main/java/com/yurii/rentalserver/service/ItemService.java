package com.yurii.rentalserver.service;

import com.yurii.rentalserver.dao.ItemRepository;
import com.yurii.rentalserver.dao.CheckoutRepository;
import com.yurii.rentalserver.dao.HistoryRepository;
import com.yurii.rentalserver.dao.PaymentRepository;
import com.yurii.rentalserver.entity.Item;
import com.yurii.rentalserver.entity.Checkout;
import com.yurii.rentalserver.entity.History;
import com.yurii.rentalserver.entity.Payment;
import com.yurii.rentalserver.responsemodels.CurrentLoansResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final CheckoutRepository checkoutRepository;
    private final HistoryRepository historyRepository;
    private final PaymentRepository paymentRepository;

    public Item checkoutItem(String userEmail, String itemId) throws Exception {
        Item item = itemRepository.findById(itemId).orElse(null);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndItemId(userEmail, itemId);

        if (item == null || validateCheckout != null || item.getCopiesAvailable() <= 0) {
            throw new RuntimeException("Item doesn't exist or already checked out by user");
        }

        List<Checkout> currentItemsCheckedOut = checkoutRepository.findItemsByUserEmail(userEmail);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        boolean itemNeedsReturned = false;
        for (Checkout checkout : currentItemsCheckedOut) {
            Date d1 = sdf.parse(checkout.getReturnDate());
            Date d2 = sdf.parse(LocalDate.now().toString());

            TimeUnit time = TimeUnit.DAYS;
            long differenceInTime = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);
            if (differenceInTime < 0) {
                itemNeedsReturned = true;
                break;
            }
        }

        Payment userPayment = paymentRepository.findByUserEmail(userEmail);
        if ((userPayment != null && userPayment.getAmount() > 0) || (userPayment != null && itemNeedsReturned)) {
            throw new Exception("Outstanding fees");
        }

        if (userPayment == null) {
            Payment payment = Payment.builder()
                    .amount(00.00)
                    .userEmail(userEmail)
                    .build();
            paymentRepository.save(payment);
        }

        item.setCopiesAvailable(item.getCopiesAvailable() - 1);
        itemRepository.save(item);

        Checkout checkout = Checkout.builder()
                .userEmail(userEmail)
                .checkoutDate(LocalDate.now().toString())
                .returnDate(LocalDate.now().plusDays(7).toString())
                .itemId(itemId)
                .build();
        checkoutRepository.save(checkout);
        return item;
    }

    public Boolean checkoutItemByUser(String userEmail, String itemId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndItemId(userEmail, itemId);
        return validateCheckout != null;
    }

    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findItemsByUserEmail(userEmail).size();
    }

    public List<CurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<CurrentLoansResponse> currentLoansRespons = new ArrayList<>();

        List<Checkout> checkouts = checkoutRepository.findItemsByUserEmail(userEmail);
        List<String> itemIds = checkouts.stream().map(Checkout::getItemId).toList();

        List<Item> items = itemRepository.findItemsByItemIds(itemIds);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Item item : items) {
            Optional<Checkout> checkout = checkouts.stream().filter(el -> el.getItemId().equals(item.getId())).findFirst();
            if (checkout.isPresent()) {
                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;
                long differenceInTime = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);
                currentLoansRespons.add(new CurrentLoansResponse(item, (int) differenceInTime));

            }
        }
        return currentLoansRespons;
    }

    public void returnItem(String userEmail, String itemId) throws Exception {
        Item item = itemRepository.findById(itemId).orElse(null);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndItemId(userEmail, itemId);

        if (item == null || validateCheckout == null) {
            throw new RuntimeException("Item doesn't exist or not checked out by user");
        }

        item.setCopiesAvailable(item.getCopiesAvailable() + 1);
        itemRepository.save(item);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        double difference = TimeUnit.DAYS.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);
        if (difference < 0) {
            Payment payment = paymentRepository.findByUserEmail(userEmail);
            payment.setAmount(payment.getAmount() + (difference * -1));
            paymentRepository.save(payment);
        }

        checkoutRepository.deleteById(validateCheckout.getId());

        //archive it
        History history = History.builder()
                .userEmail(userEmail)
                .checkoutDate(validateCheckout.getCheckoutDate())
                .returnedDate(LocalDate.now().toString())
                .title(item.getTitle())
                .admin(item.getAdmin())
                .description(item.getDescription())
                .img(item.getImg())
                .build();
        historyRepository.save(history);
    }

    public void renewLoan(String userEmail, String itemId) throws Exception {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndItemId(userEmail, itemId);

        if (validateCheckout == null) {
            throw new RuntimeException("Item doesn't exist or not checked out by user");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        if (d1.compareTo(d2) >= 0) {
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);
        }
    }

}
