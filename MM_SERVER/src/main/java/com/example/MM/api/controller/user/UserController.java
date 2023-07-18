package com.example.MM.api.controller.user;

import com.example.MM.api.entity.user.User;
import com.example.MM.api.service.UserService;
import com.example.MM.common.ApiResponse;
import com.example.MM.user.dto.UserDto;
import com.example.MM.user.exception.DuplicateUsernameException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        UserDto userDto = UserDto.builder()
                .userSeq(user.getUserSeq())
                .userId(user.getUserId())
                .username(user.getUsername())
                .password(user.getPassword())
                .email(user.getEmail())
                .emailVerifiedYn(user.getEmailVerifiedYn())
                .profileImageUrl(user.getProfileImageUrl())
                .providerType(user.getProviderType())
                .roleType(user.getRoleType())
                .createdAt(user.getCreatedAt())
                .modifiedAt(user.getModifiedAt())
                .build();

        return ApiResponse.success("user", userDto);
    }
    @PutMapping("/username")
    public ResponseEntity<Void> changeUsername(@RequestBody String username){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        try{
            userService.changeUsername(principal.getUsername(), username);
            return ResponseEntity.ok().build();
        }catch (DuplicateUsernameException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
