package com.example.MM.domain.party;

import com.example.MM.api.entity.user.User;
import com.example.MM.api.repository.user.UserRefreshTokenRepository;
import com.example.MM.api.repository.user.UserRepository;
import com.example.MM.api.service.PartyService;
import com.example.MM.api.service.UserService;
import com.example.MM.oauth.entity.ProviderType;
import com.example.MM.oauth.entity.RoleType;
import com.example.MM.oauth.handler.TokenAccessDeniedHandler;
import com.example.MM.oauth.service.CustomOAuth2UserService;
import com.example.MM.oauth.service.CustomUserDetailsService;
import com.example.MM.oauth.token.AuthTokenProvider;
import com.example.MM.party.dto.PartyRequestDto;
import com.example.MM.party.entity.OttType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class PartyControllerTest {

    ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private PartyService partyService;

    @MockBean
    private AuthTokenProvider authTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private CustomOAuth2UserService CustomOAuth2UserService;

    @MockBean
    private TokenAccessDeniedHandler tokenAccessDeniedHandler;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRefreshTokenRepository userRefreshTokenRepository;

    @MockBean
    private UserRepository userRepository;

    private String user_id;
    private User user1;
    private User user2;
    private PartyRequestDto partyRequestDto;

    @BeforeEach
    void setup() {
        user_id = "132131321321321";
        partyRequestDto = PartyRequestDto.builder()
                .ottType(OttType.APPLE_TV)
                .startDate(LocalDate.now())
                .endDate(LocalDate.of(2023, 6, 25))
                .build();
        user1 = new User(user_id, "기욱", "tizmfns1218@naver.com", "Y", "", ProviderType.KAKAO, RoleType.USER, LocalDateTime.now(), LocalDateTime.now());
        user2 = new User(user_id + 1, "시연", "dsadsad@naver.com", "Y", "", ProviderType.KAKAO, RoleType.USER, LocalDateTime.now(), LocalDateTime.now());

        userRepository.save(user1);


    }

    @DisplayName("create_party")
    @Test
    void 파티_만들기() throws Exception {

        mockMvc.perform(get("/api/party")
                        .with(oauth2Login()
                                .authorities(new SimpleGrantedAuthority("ROLE_USER"))
                                .attributes(attribute -> {
                                    attribute.put("username", "username");
                                    attribute.put("user_id", "12312");
                                    attribute.put("email", "tizmfns1218@naver.com");
                                })

                        ).contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(partyRequestDto)))
                .andExpect(status().isOk());

    }

    @DisplayName("파티 참가")
    @Test
    void 파티_참가() throws Exception {

    }

    @DisplayName("파티 조회")
    @Test
    void 파티_조회() throws Exception {

    }

    @DisplayName("파티 구간 조회")
    @Test
    void 파티_구간_조회() throws Exception {

    }

    @DisplayName("파티 탈퇴")
    @Test
    void 파티_탈퇴() throws Exception {

    }
}
