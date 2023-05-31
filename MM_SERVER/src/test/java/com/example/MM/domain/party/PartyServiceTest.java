package com.example.MM.domain.party;

import com.example.MM.api.entity.party.Party;
import com.example.MM.api.entity.user.User;
import com.example.MM.api.repository.party.PartyRepository;
import com.example.MM.api.repository.user.UserRepository;
import com.example.MM.api.service.PartyService;
import com.example.MM.oauth.entity.ProviderType;
import com.example.MM.oauth.entity.RoleType;
import com.example.MM.party.dto.PartyRequestDto;
import com.example.MM.party.dto.PartyResponseDto;
import com.example.MM.party.entity.OttType;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@SpringBootTest
public class PartyServiceTest {
    @Mock
    PartyRepository partyRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    private PartyService partyService;

    private User user1;
    private User user2;

    private Party testParty;

    private PartyRequestDto partyRequestDto;

    private final String user_id = "gBY9VSvJsW3QWbgkMGiHJrqiiMwq4-KoRVe5Twco8Hk";

    @BeforeEach
    public void setup(){

        user1 = new User(user_id,"기욱","23132@naver.com","Y","", ProviderType.KAKAO, RoleType.USER, LocalDateTime.now(),LocalDateTime.now());
        user2 = new User(user_id+1,"시연","dsadsad@naver.com","Y","", ProviderType.KAKAO, RoleType.USER, LocalDateTime.now(),LocalDateTime.now());

        testParty = Party.builder()
                .partyCreator(user1)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(1))
                .ottType(OttType.APPLE_TV)
                .build();

        partyRequestDto = PartyRequestDto.builder()
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(1))
                .ottType(OttType.APPLE_TV)
                .build();
        userRepository.save(user1);
    }

    @Test
    @DisplayName("새로운 파티 생성")
    void 파티_생성() {
        //given
        when(userRepository.save(any(User.class))).thenReturn(user1);
        when(partyRepository.save(any(Party.class))).thenReturn(testParty);

        PartyResponseDto createdParty = partyService.createParty(partyRequestDto, user_id);

        //then
        Assertions.assertNotNull(createdParty.getId());
    }

    @Test
    @Disabled
    @DisplayName("파티 조회")
    void 파티_조회() {

    }

    @Test
    @Disabled
    @DisplayName("파티 참가")
    void 파티_참가() {

    }

    @Test
    @Disabled
    @DisplayName("파티 삭제")
    void 파티_삭제() {

    }


}
