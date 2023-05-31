package com.example.MM.api.entity.party;

import com.example.MM.api.entity.user.User;
import com.example.MM.party.entity.OttType;
import com.example.MM.party.entity.PartyStatus;
import com.example.MM.party.entity.PartyUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.servlet.http.Part;
import java.time.LocalDate;
import java.util.Set;


@Getter
@NoArgsConstructor
@Entity
@AllArgsConstructor
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

    @OneToMany(mappedBy = "party", orphanRemoval = true, cascade = CascadeType.ALL)
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

    public boolean isFull() {
        return this.partyUsers.size() >= this.maxUsers;
    }

    public boolean isBeforeStart() {
        return this.startDate.isAfter(LocalDate.now());
    }

    public boolean isAfterEnd() {
        return this.endDate.isBefore(LocalDate.now());
    }

    public boolean isOngoing() {
        return !isBeforeStart() && !isAfterEnd() && !isFull();
    }

    public boolean addUser(User user) {
        if (isOngoing() && !isFull() && !userAlreadyJoined(user)) {
            PartyUser partyUser = new PartyUser(this, user);
            partyUsers.add(partyUser);
            return true;
        }
        return false;
    }

    public void updateStatus(PartyStatus status) {
        this.status = status;
    }

    public void removeUser(PartyUser partyUser) {
        partyUsers.remove(partyUser);
    }

    public boolean userAlreadyJoined(User user) {
        for (PartyUser partyUser : partyUsers) {
            if (partyUser.getUser().getUserId().equals(user.getUserId())) {
                return true;
            }
        }
        return false;
    }

    public int getNumOfUsers() {
        return this.partyUsers.size();
    }
}
