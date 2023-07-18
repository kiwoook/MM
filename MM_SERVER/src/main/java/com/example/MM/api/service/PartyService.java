package com.example.MM.api.service;

import com.example.MM.api.entity.party.Party;
import com.example.MM.api.entity.user.User;
import com.example.MM.api.repository.party.PartyRepository;
import com.example.MM.api.repository.party.PartyUserRepository;
import com.example.MM.api.repository.user.UserRepository;
import com.example.MM.party.dto.PartyRequestDto;
import com.example.MM.party.dto.PartyResponseDto;
import com.example.MM.party.entity.OttType;
import com.example.MM.party.entity.PartyStatus;
import com.example.MM.party.entity.PartyUser;
import com.example.MM.party.exception.PartyNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional
public class PartyService {
    final static Logger logger = LogManager.getLogger(PartyService.class);

    private final PartyRepository partyRepository;
    private final UserRepository userRepository;
    private final PartyUserRepository partyUserRepository;

    public List<PartyResponseDto> getAll() {
        List<Party> parties = partyRepository.findAll();
        return parties.stream().map(this::mapPartyToResponseDto).collect(Collectors.toList());
    }

    public PartyResponseDto getParty(Long partyId) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new PartyNotFoundException("Party not found with id " + partyId));

        return PartyResponseDto.builder().party(party).build();
    }

    // OTT 파티 검색
    public List<PartyResponseDto> searchParty(OttType ottType, LocalDate startDate, LocalDate endDate) {
        List<Party> parties;
        if (startDate == null && endDate == null) {
            parties = partyRepository.findByOttType(ottType);
        } else {
            parties = partyRepository.findByOttTypeAndStartDateGreaterThanEqualAndEndDateLessThanEqual(ottType, startDate, endDate);
            parties.addAll(partyRepository.findByOttTypeAndStartDateBetweenAndEndDateBetween(ottType, Objects.requireNonNull(startDate).minusMonths(1), startDate.plusMonths(1), Objects.requireNonNull(endDate).minusMonths(1), endDate.plusMonths(1)));
        }

        // 비슷한 구간의 파티도 찾음.
        if (parties.isEmpty()) {
            logger.info("party not found");
            throw new PartyNotFoundException("party not found");
        }
        return parties.stream().filter(party -> party.getStatus() == PartyStatus.NOT_STARTED && !party.isFull()).map(this::mapPartyToResponseDto).collect(Collectors.toList());

    }

    @Transactional
    //OTT 파티 생성
    public PartyResponseDto createParty(PartyRequestDto requestDto, String userId) {
        User partyCreator = userRepository.findByUserId(userId);

        if (partyCreator == null) {
            logger.info("user not found");
            throw new RuntimeException("user not found");
        }
        Party party = Party.builder()
                .ottType(requestDto.getOttType())
                .partyCreatorId(partyCreator.getUserId())
                .startDate(requestDto.getStartDate())
                .endDate(requestDto.getEndDate())
                .build();
        PartyResponseDto responseDto = PartyResponseDto.builder().party(party).build();

        logger.info("파티 정보 : " + party.getPartyCreatorId());
        logger.info("파티 개설자 :" + partyCreator.getUserId());
        logger.info("파티 응답 DTO : " + responseDto.getCreatorUserId());

        PartyUser partyUser = PartyUser.builder()
                .party(party)
                .user(partyCreator)
                .build();

        userRepository.save(partyCreator);
        partyRepository.save(party);
        partyUserRepository.save(partyUser);

        return responseDto;
    }

    @Transactional
    // OTT 파티 상태 변경
    public Party updatePartyStatus(Long partyId, PartyStatus status) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new RuntimeException("Party not found with id " + partyId));
        if (status == PartyStatus.IN_PROGRESS) {
            if (!party.isFull()) {
                throw new RuntimeException("Party is Not full. Can't Progress");
            }
            party.updateStatus(status);
        } else if (status == PartyStatus.COMPLETED) {
            party.updateStatus(status);
        }
        partyRepository.save(party);
        return party;
    }

    @Transactional
    public void joinParty(String userId, Long partyId) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new PartyNotFoundException("Party not found with id " + partyId));
        User user = userRepository.findByUserId(userId);

        PartyUser partyUser = PartyUser.builder()
                .party(party)
                .user(user)
                .build();

        if (party.isBeforeStart() && party.isAfterEnd()) {
            party.updateStatus(PartyStatus.COMPLETED);
            logger.info("This party is already completed.");
            throw new RuntimeException("This party is already completed.");
        }
        if (user == null) {
            logger.info("User not found with id " + userId);
            throw new RuntimeException("User not found with id " + userId);
        }
        if (party.getStatus() == PartyStatus.COMPLETED) {
            logger.info("This party is already completed.");
            throw new RuntimeException("This party is already completed.");
        }
        if (party.getPartyUsers().stream().anyMatch(partyUsers -> partyUsers.getUser().getUserId().equals(userId))) {
            logger.info("This user already joined the party.");
            throw new RuntimeException("This user already joined the party.");
        }
        if (party.isFull()) {
            logger.info("This party is already full.");
            throw new RuntimeException("This party is already full.");
        }
        if (user.getParties().stream().anyMatch(partyUsers -> partyUsers.getParty().getOttType() == party.getOttType() && partyUsers.getParty().getEndDate().isAfter(party.getStartDate()) && partyUser.getParty().getStartDate().isBefore(party.getEndDate()))) {
            logger.info("User already joined the party with same OTT and overlapping party period.");
            throw new RuntimeException("User already joined the party with same OTT and overlapping party period.");
        }


        party.addUser(partyUser);
        user.addParty(partyUser);

        // 파티가 꽉 찼는지 확인
        if (getNumOfUsersInParty(partyId) == party.getMaxUsers()) {
            party.updateStatus(PartyStatus.IN_PROGRESS);
        }

        partyUserRepository.save(partyUser);
    }

    @Transactional
    public void leaveParty(String userId, Long partyId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new RuntimeException("User not found with id " + userId);
        }

        Party party = partyRepository.findById(partyId).orElseThrow(() -> new PartyNotFoundException("Party not found with id: " + partyId));
        if (party.getStatus() == PartyStatus.IN_PROGRESS) {
            throw new RuntimeException("Cannot leave a party that has not started");
        }
        PartyUser partyUser = partyUserRepository.findByPartyAndUser(party, user);

        if (partyUser == null) {
            throw new NullPointerException("PartyUser is NULL");
        }

        user.leaveParty(partyUser);
        party.removeUser(partyUser);

        partyUserRepository.delete(partyUser);
    }

    @Transactional
    public boolean deleteParty(Long partyId, String userId) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new PartyNotFoundException("Party not found with ID : " + partyId));

        String partyCreator = party.getPartyCreatorId();
        if (partyCreator.equals(userId)) {
            partyRepository.delete(party);
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public List<PartyResponseDto> myParty(String userId) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new RuntimeException("User not found with id " + userId);
        }

        List<PartyUser> partyUsers = partyUserRepository.findAllByUser(user);
        if (partyUsers.isEmpty()) {
            throw new PartyNotFoundException("Party not found");
        }

        return partyUsers.stream()
                .map(PartyUser::getParty)
                .map(this::mapPartyToResponseDto)
                .collect(Collectors.toList());
    }

    private PartyResponseDto mapPartyToResponseDto(Party party) {
        return PartyResponseDto.builder().party(party).build();
    }

    public void addUserToParty(Long partyId, User user) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found"));

        if (party.isOngoing() && !party.isFull() && party.userAlreadyJoined(user)) {
            PartyUser partyUser = new PartyUser(party, user);
            party.getPartyUsers().add(partyUser);
            partyRepository.save(party);
        }
    }

    public void removeUserFromParty(Long partyId, User user) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new IllegalArgumentException("Party not found"));

        party.getPartyUsers().stream()
                .filter(partyUser -> partyUser.getUser().equals(user))
                .findFirst().ifPresent(partyUserToRemove -> party.getPartyUsers().remove(partyUserToRemove));

    }

    public int getNumOfUsersInParty(Long partyId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new IllegalArgumentException("Party not found"));

        return party.getPartyUsers().size();
    }


}