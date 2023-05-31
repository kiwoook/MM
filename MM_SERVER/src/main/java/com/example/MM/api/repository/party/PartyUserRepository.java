package com.example.MM.api.repository.party;

import com.example.MM.api.entity.party.Party;
import com.example.MM.api.entity.user.User;
import com.example.MM.party.entity.PartyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyUserRepository extends JpaRepository<PartyUser, Long> {
    PartyUser findByPartyAndUser(Party party, User user);

}
