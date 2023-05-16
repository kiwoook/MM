package com.example.puzzle.party.dto;

import com.example.puzzle.api.entity.party.Party;
import com.example.puzzle.api.entity.user.User;
import com.example.puzzle.party.entity.OttType;
import com.example.puzzle.party.entity.PartyStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class PartyDTO {

    private Long id;
    private User partyCreator;
    private LocalDate startDate;
    private LocalDate endDate;
    private OttType ottType;
    private PartyStatus status;
    private int maxUsers;

    @Builder
    public PartyDTO(Party party) {
        this.id = party.getId();
        this.partyCreator = party.getPartyCreator();
        this.startDate = party.getStartDate();
        this.endDate = party.getEndDate();
        this.ottType = party.getOttType();
        this.status = party.getStatus();
        this.maxUsers = party.getMaxUsers();
    }

    public Party toEntity() {
        return Party.builder()
                .ottType(ottType)
                .startDate(startDate)
                .endDate(endDate)
                .partyCreator(partyCreator)
                .build();
    }


}
