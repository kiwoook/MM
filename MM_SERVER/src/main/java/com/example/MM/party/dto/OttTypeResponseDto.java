package com.example.MM.party.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OttTypeResponseDto {
    private String name;
    private String korean;
    private Integer maxUsers;
    private Integer price;

    @Builder
    public OttTypeResponseDto(String name, String korean, Integer maxUsers, Integer price){
        this.name = name;
        this.korean = korean;
        this.maxUsers = maxUsers;
        this.price = price;
    }
}
