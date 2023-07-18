package com.example.MM.party.dto;

import com.example.MM.api.entity.party.Party;
import com.example.MM.party.entity.OttType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class PartyRequestDto {
    private LocalDate startDate;
    private LocalDate endDate;
    private OttType ottType;

    @Builder
    public PartyRequestDto(OttType ottType, LocalDate startDate, LocalDate endDate){
        this.ottType = ottType;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Party toEntity(){
        return Party.builder()
                .ottType(ottType)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

    }
