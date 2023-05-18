package com.example.puzzle.party.dto;

import com.example.puzzle.api.entity.party.Party;
import com.example.puzzle.api.entity.user.User;
import com.example.puzzle.party.entity.OttType;
import com.example.puzzle.party.entity.PartyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
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
