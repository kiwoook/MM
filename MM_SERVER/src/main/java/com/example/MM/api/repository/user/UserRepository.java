package com.example.MM.api.repository.user;

import com.example.MM.api.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);

    // 유저_SEQ 로 유저 정보를 파악
    User findByUserSeq(Long userSeq);

    boolean existsByUsername(String username);

}