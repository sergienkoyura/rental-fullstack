package com.yurii.rentalserver.responsemodels;

import com.yurii.rentalserver.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrentLoansResponse {
    private Item item;
    private int daysLeft;
}
