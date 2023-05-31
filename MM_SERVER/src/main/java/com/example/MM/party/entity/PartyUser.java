package com.example.MM.party.entity;

import com.example.MM.api.entity.party.Party;
import com.example.MM.api.entity.user.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "party_user")
public class PartyUser{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @CreatedDate
    private LocalDate created;

    @Builder
    public PartyUser(Party party, User user) {
        this.party = party;
        this.user = user;
    }

}