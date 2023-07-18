package com.example.MM.api.service;

import com.example.MM.api.entity.party.Party;
import com.example.MM.api.entity.user.User;
import com.example.MM.api.repository.payment.PaymentRepository;
import com.example.MM.payment.entity.Payment;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Log4j2
@Service
@RequiredArgsConstructor
public class PaymentService {
    final static Logger logger = LogManager.getLogger(PartyService.class);
    private final PaymentRepository paymentRepository;

    @Transactional
    public void requestPay(User user, Party party, BigDecimal amount){
        Payment payment = Payment.builder()
                .user(user)
                .party(party)
                .paymentAmount(amount)
                .build();

        paymentRepository.save(payment);
    }
}
