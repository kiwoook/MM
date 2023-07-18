package com.example.MM.domain.user;

import com.example.MM.api.entity.user.User;
import com.example.MM.api.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @Test
    @WithMockUser(username="testuser", password = "password", roles = "ROLE_USER")
    public void testFindByUserId(){
        // given
        String userId = "321321";
        User user = new User();
        user.setUserId(userId);
        userRepository.save(user);

        // when
        User foundUser = userRepository.findByUserId(userId);

        // Then
        assertNotNull(foundUser);
        assertEquals(userId, foundUser.getUserId());
    }
}
