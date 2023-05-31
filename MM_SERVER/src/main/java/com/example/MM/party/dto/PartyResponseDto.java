package com.example.MM.party.dto;

import com.example.MM.api.entity.party.Party;
import com.example.MM.api.entity.user.User;
import com.example.MM.party.entity.OttType;
import com.example.MM.party.entity.PartyStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class PartyResponseDto {

    private Long id;
    private String creatorUserId;
    private OttType ottType;
    private LocalDate startDate;
    private LocalDate endDate;
    private PartyStatus status;

    @Builder
    public PartyResponseDto(Party party){
        this.id = party.getId();
        this.creatorUserId = party.getPartyCreatorId();
        this.ottType = party.getOttType();
        this.startDate = party.getStartDate();
        this.endDate = party.getEndDate();
        this.status = party.getStatus();
    }

}
