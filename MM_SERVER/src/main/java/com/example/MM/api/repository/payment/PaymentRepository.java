package com.example.MM.api.repository.payment;

import com.example.MM.api.entity.user.User;
import com.example.MM.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findAllByUser(User user);

    Optional<Payment> findByOrderIdAndUser(String orderId, User user);
}
