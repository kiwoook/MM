package com.example.MM.party.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OttType {

    //1. WAVVE
    //2. TVING
    //3. 쿠팡플레이
    //4. 왓챠
    //5. 넷플릭스
    //6. 디즈니 플러스
    //7. 애플 티비
    //8. 라프텔

    WAVVE("WAVVE", 4, 9900),
    TVING("TVING", 4, 9900),
    COUPANG_PLAY("COUPANG_PLAY", 4, 7900),
    WATCHA("WATCHA", 4, 7900),
    NETFLIX("NETFLIX", 4, 13900),
    DISNEY_PLUS("DISNEY_PLUS", 4, 8900),
    APPLE_TV("APPLE_TV", 6, 4900),
    RAFTEL("RAFTEL", 4, 10900);

    private final String name;
    private final Integer maxUsers;
    private final Integer price;
}
