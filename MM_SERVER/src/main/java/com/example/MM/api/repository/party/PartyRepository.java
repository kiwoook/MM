package com.example.MM.api.repository.party;

import com.example.MM.api.entity.party.Party;
import com.example.MM.party.entity.OttType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

    List<Party> findByOttTypeAndStartDateBetweenAndEndDateBetween(OttType ottType, LocalDate startDate1, LocalDate startDate2, LocalDate endDate1, LocalDate endDate2);

    List<Party> findByOttTypeAndStartDateGreaterThanEqualAndEndDateLessThanEqual(OttType ottType, LocalDate startDate, LocalDate endDate);
//    List<Party> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(LocalDate startDate, LocalDate endDate);
//
//    List<Party> findByPartyUsersContains(PartyUser user);
//
//    List<Party> findByPartyUsersNotContains(PartyUser user);
//
//    List<Party> findByEndDateBefore(LocalDate currentDateTime);
//
//    List<Party> findByStartDateAfter(LocalDate currentDateTime);
//
//    List<Party> findByPartyUsersNotContaining(OttType ottType, LocalDate startDate, LocalDate endDate, User user);
//
//    boolean existsByPartyUsersNotContaining(OttType ottType, LocalDate startDate, LocalDate endDate, User user);


//    findByOttTypeAndPartyStartDateBetweenAndPartyEndDateBetween 메서드는 OttType과 두 개의 시간 정보를 입력받아 해당 기간에 생성된 OttType에 해당하는 파티 리스트를 반환합니다.
//
//    findByPartyStartDateGreaterThanEqualAndPartyEndDateLessThanEqual 메서드는 입력받은 두 개의 시간 정보를 이용하여 해당 기간 내에 시작한 파티 리스트를 반환합니다.
//
//    findByPartyUsersContains 메서드는 PartyUser 객체를 입력받아 해당 유저가 속한 파티 리스트를 반환합니다.
//
//    findByPartyUsersNotContains 메서드는 PartyUser 객체를 입력받아 해당 유저가 속해있지 않은 파티 리스트를 반환합니다.
//
//    findByPartyEndDateBefore 메서드는 현재 시간 이전에 종료된 파티 리스트를 반환합니다.
//
//    findByPartyStartDateAfter 메서드는 현재 시간 이후에 시작될 파티 리스트를 반환합니다.
//
//    findByPartyNameContainingIgnoreCase 메서드는 파티 이름을 입력받아 해당 문자열이 포함된 파티 리스트를 대소문자 구분 없이 반환합니다.
}
