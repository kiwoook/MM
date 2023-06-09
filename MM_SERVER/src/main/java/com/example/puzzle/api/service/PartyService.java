package com.example.puzzle.api.service;

import com.example.puzzle.api.entity.party.Party;
import com.example.puzzle.api.entity.user.User;
import com.example.puzzle.api.repository.party.PartyRepository;
import com.example.puzzle.api.repository.user.UserRepository;
import com.example.puzzle.party.entity.OttType;
import com.example.puzzle.party.entity.PartyStatus;
import com.example.puzzle.party.entity.PartyUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PartyService {

    private final PartyRepository partyRepository;
    private final UserRepository userRepository;

    // OTT 파티 검색
    public List<Party> searchParty(OttType ottType, LocalDate startDate, LocalDate endDate) {
        List<Party> parties = partyRepository.findByOttTypeAndStartDateGreaterThanEqualAndEndDateLessThanEqual(ottType, startDate, endDate);

        parties.addAll(partyRepository.findByOttTypeAndStartDateBetweenAndEndDateBetween(
                ottType, startDate.minusMonths(1), startDate.plusMonths(1), endDate.minusMonths(1), endDate.plusMonths(1)));
        // 적절한 파티를 찾지 못한다면 비슷한 구간의 파티를 찾음.

        return parties.stream().filter(party -> party.getStatus() == PartyStatus.NOT_STARTED && !party.isFull())
                .collect(Collectors.toList());

    }

    @Transactional
    //OTT 파티 생성
    public Party createParty(OttType ottType, User creator, LocalDate startDate, LocalDate endDate) {
        Party party = Party.builder()
                .ottType(ottType)
                .partyCreator(creator)
                .startDate(startDate)
                .endDate(endDate)
                .build();
        partyRepository.save(party);
        return party;
    }

    @Transactional
    // OTT 파티 상태 변경
    public Party updatePartyStatus(Long partyId, PartyStatus status) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new RuntimeException("Party not found with id " + partyId));
        if (status == PartyStatus.IN_PROGRESS) {
            if (!party.isFull()) {
                throw new RuntimeException("Party is Not full. Can't Progress");
            }
            party.setStatus(status);
        } else if (status == PartyStatus.COMPLETED) {
            party.setStatus(status);
        }
        partyRepository.save(party);
        return party;
    }

    @Transactional
    public Party joinParty(String userId, Long partyId) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new RuntimeException("Party not found with id " + partyId));
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new RuntimeException("User not found with id " + userId);
        }
        if (party.getStatus() == PartyStatus.COMPLETED) {
            throw new RuntimeException("This party is already completed.");
        }
        if (party.getPartyUsers().stream().anyMatch(partyUser -> partyUser.getUser().getUserId().equals(userId))) {
            throw new RuntimeException("This user already joined the party.");
        }
        if (party.isFull()) {
            throw new RuntimeException("This party is already full.");
        }
        if (user.getParties().stream().anyMatch(partyUser -> partyUser.getParty().getOttType() == party.getOttType()
                && partyUser.getParty().getEndDate().isAfter(party.getStartDate())
                && partyUser.getParty().getStartDate().isBefore(party.getEndDate()))) {
            throw new RuntimeException("User already joined the party with same OTT and overlapping party period.");
        }
        PartyUser partyUser = new PartyUser();
        partyUser.setUser(user);
        partyUser.setParty(party);
        party.getPartyUsers().add(partyUser);
        partyRepository.save(party);
        return party;
    }

    @Transactional
    public void leaveParty(String userId, Long partyId) {
        User user = userRepository.findByUserId(userId);
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new EntityNotFoundException("Party not found with id: " + partyId));
        if (user == null) {
            throw new RuntimeException("User not found with id " + userId);
        }

        if (party.getStatus() == PartyStatus.IN_PROGRESS) {
            throw new IllegalStateException("Cannot leave a party that has not started");
        }

        if (!party.getPartyUsers().contains(user)) {
            throw new IllegalStateException("User is not a member of this party");
        }

        party.removeUser(user);

        partyRepository.save(party);
    }
}