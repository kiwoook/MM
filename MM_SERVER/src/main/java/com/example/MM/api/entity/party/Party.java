package com.example.MM.api.entity.party;

import com.example.MM.api.entity.user.User;
import com.example.MM.party.entity.OttType;
import com.example.MM.party.entity.PartyStatus;
import com.example.MM.party.entity.PartyUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;


@Getter
@NoArgsConstructor
@Entity
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "party")
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "party_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OttType ottType;

    // 파티 개설자
    @Column(name = "creator_id")
    private String partyCreatorId;

    @Column(name = "price")
    private int price;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(name = "max_user", nullable = false)
    private Integer maxUsers;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PartyStatus status;

    @JsonIgnore
    @OneToMany( fetch = FetchType.LAZY, mappedBy = "party", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<PartyUser> partyUsers;

    @Builder
    public Party(OttType ottType, String partyCreatorId, LocalDate startDate, LocalDate endDate) {
        this.ottType = ottType;
        this.startDate = startDate;
        this.partyCreatorId = partyCreatorId;
        this.endDate = endDate;
        this.price = ottType.getPrice();
        this.maxUsers = ottType.getMaxUsers();
        this.status = PartyStatus.NOT_STARTED;

    }

    @PrePersist
    @PreUpdate
    public void updateStatusIfEndDatePassed(){
        if(isBeforeStart()){
            status = PartyStatus.COMPLETED;
        }
    }

    public boolean isFull() {
        return this.partyUsers.size() >= this.maxUsers;
    }

    public boolean isBeforeStart() {
        return this.startDate.isBefore(LocalDate.now());
    }

    public boolean isAfterEnd() {
        return this.endDate.isAfter(LocalDate.now());
    }

    public boolean isOngoing() {
        return !isBeforeStart() && !isAfterEnd() && !isFull();
    }

    public void addUser(PartyUser partyUser) {
        if (isOngoing() && !isFull() && !userAlreadyJoined(partyUser.getUser())) {
            partyUsers.add(partyUser);
        }
    }

    public void updateStatus(PartyStatus status) {
        this.status = status;
    }

    public void removeUser(PartyUser partyUser) {
        this.partyUsers.remove(partyUser);
    }

    public boolean userAlreadyJoined(User user) {
        for (PartyUser partyUser : partyUsers) {
            if (partyUser.getUser().getUserId().equals(user.getUserId())) {
                return false;
            }
        }
        return true;
    }

}
