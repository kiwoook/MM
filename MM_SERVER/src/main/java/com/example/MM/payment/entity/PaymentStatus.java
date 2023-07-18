package com.example.MM.payment.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum PaymentStatus {
    PENDING("Pending"),
    PAID("PAID"),
    FAILED("Failed"),
    REFUNDED("Refunded");

    private final String value;
}
