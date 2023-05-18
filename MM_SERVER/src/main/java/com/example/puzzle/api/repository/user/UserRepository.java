package com.example.puzzle.api.repository.user;

import com.example.puzzle.api.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);

    // optional 클래스로 묶는 법 하기


}