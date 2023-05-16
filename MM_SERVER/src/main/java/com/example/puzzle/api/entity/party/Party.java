package com.example.puzzle.api.entity.party;

import com.example.puzzle.api.entity.user.User;
import com.example.puzzle.party.entity.OttType;
import com.example.puzzle.party.entity.PartyStatus;
import com.example.puzzle.party.entity.PartyUser;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Setter
@Getter
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "party")
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OttType ottType;

    // 파티 개설자
    @ManyToOne
    @JoinColumn(name = "party_creator_id")
    private User partyCreator;

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

    @OneToMany(mappedBy = "party", cascade = CascadeType.ALL)
    private List<PartyUser> partyUsers;

    @Builder
    public Party(OttType ottType, User partyCreator, LocalDate startDate, LocalDate endDate) {
        this.ottType = ottType;
        this.startDate = startDate;
        this.partyCreator = partyCreator;
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

    public void removeUser(User user) {
        if(partyUsers.contains(user)){
            partyUsers.remove(user);
            user.leaveParty(this);
        }
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
