package com.example.MM.user.dto;

import com.example.MM.api.entity.user.User;
import com.example.MM.oauth.entity.ProviderType;
import com.example.MM.oauth.entity.RoleType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class UserDto {
    private Long userSeq;
    private String userId;
    private String username;
    private String password;
    private String email;
    private String emailVerifiedYn;
    private String profileImageUrl;
    private ProviderType providerType;
    private RoleType roleType;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private User user;

    @Builder
    public UserDto(Long userSeq, String userId, String username, String password, String email, String emailVerifiedYn, String profileImageUrl, ProviderType providerType, RoleType roleType, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.userSeq = userSeq;
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl;
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
