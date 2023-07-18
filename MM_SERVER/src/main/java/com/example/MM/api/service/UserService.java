package com.example.MM.api.service;

import com.example.MM.api.entity.user.User;
import com.example.MM.api.repository.user.UserRepository;
import com.example.MM.user.exception.DuplicateUsernameException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    @Transactional
    public void changeUsername(String userId, String newUsername) {
        // 중복 확인
        if(userRepository.existsByUsername(newUsername)){
            throw new DuplicateUsernameException("Username is already taken");
        }

        User user = userRepository.findByUserId(userId);

        user.updateUsername(newUsername);

        userRepository.save(user);
    }
}
