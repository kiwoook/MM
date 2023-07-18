package com.example.MM.payment.entity;

import com.example.MM.api.entity.party.Party;
import com.example.MM.api.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //pg사 생성 주문번호
    @Column(nullable = false, unique = true)
    private String receiptId;

    //개발자 생성 주문번호
    @Column(nullable = false, unique = true)
    private String orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private BigDecimal paymentAmount;


    //"Paid", "Refunded"
    private PaymentStatus paymentStatus;

    @CreatedDate
    private LocalDateTime paymentDate;

    @Builder
    public Payment(String receiptId, String orderId, Party party, User user, BigDecimal paymentAmount, PaymentStatus paymentStatus) {
        this.receiptId = receiptId;
        this.orderId = orderId;
        this.party = party;
        this.user = user;
        this.paymentAmount = paymentAmount;
        this.paymentStatus = paymentStatus;
    }
}
