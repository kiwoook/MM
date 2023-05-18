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
public class PartyResponseDto {

    private Long id;
    private User partyCreator;
    private OttType ottType;
    private LocalDate startDate;
    private LocalDate endDate;
    private PartyStatus status;

    @Builder
    public PartyResponseDto(Party party){
        this.id = party.getId();
        this.partyCreator = party.getPartyCreator();
        this.ottType = party.getOttType();
        this.startDate = party.getStartDate();
        this.endDate = party.getEndDate();
        this.status = party.getStatus();
    }

}
