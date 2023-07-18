package com.example.MM.api.controller.party;

import com.example.MM.api.service.PartyService;
import com.example.MM.party.dto.OttTypeResponseDto;
import com.example.MM.party.dto.PartyRequestDto;
import com.example.MM.party.dto.PartyResponseDto;
import com.example.MM.party.entity.OttType;
import com.example.MM.party.exception.PartyNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/party")
@RequiredArgsConstructor
@Slf4j
public class PartyController {

    final static Logger logger = LogManager.getLogger(PartyController.class);
    private final PartyService partyService;

    @GetMapping()
    public ResponseEntity<List<PartyResponseDto>> getAllParties() {
        List<PartyResponseDto> parties = partyService.getAll();
        if (parties.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(parties);
        }
    }

    @PostMapping
    public ResponseEntity<PartyResponseDto> createParty(@RequestBody PartyRequestDto requestDto) {

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = principal.getUsername();
        logger.info("유저 아이디" + userId);
        try {
            PartyResponseDto party = partyService.createParty(requestDto, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(party);
        } catch (RuntimeException e) {
            logger.info(e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/ott")
    public List<OttTypeResponseDto> infoOtt() {
        List<OttTypeResponseDto> ottTypes = new ArrayList<>();
        for (OttType ottType : OttType.values()) {
            ottTypes.add(new OttTypeResponseDto(ottType.getName(), ottType.getKorean(), ottType.getMaxUsers(), ottType.getPrice()));
        }
        return ottTypes;
    }

    @GetMapping("/search")
    public ResponseEntity<List<PartyResponseDto>> searchParty(
            @RequestParam("ottType") OttType ottType,
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate endDate) {
        if ((startDate == null) != (endDate == null)) {
            return ResponseEntity.badRequest().build();
        }
        try {
            List<PartyResponseDto> parties = partyService.searchParty(ottType, startDate, endDate);
            return ResponseEntity.status(HttpStatus.OK).body(parties);
        } catch (PartyNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{partyId}")
    public ResponseEntity<PartyResponseDto> getParty(@PathVariable Long partyId) {
        try {
            PartyResponseDto party = partyService.getParty(partyId);
            return ResponseEntity.status(HttpStatus.OK).body(party);
        } catch (PartyNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{partyId}")
    public ResponseEntity<Void> deleteParty(@PathVariable Long partyId) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = principal.getUsername();

        boolean deleted = partyService.deleteParty(partyId, userId);

        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/join/{partyId}")
    public ResponseEntity<String> joinParty(@PathVariable Long partyId) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = principal.getUsername();

        try {
            partyService.joinParty(userId, partyId);

            return ResponseEntity.ok("Successfully joined the party");

        } catch (PartyNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("error");
        }
    }

    @PostMapping("/leave/{partyId}")
    public ResponseEntity<Void> leaveParty(@PathVariable Long partyId) {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = principal.getUsername();

        try {
            partyService.leaveParty(userId, partyId);
            return ResponseEntity.noContent().build();
        } catch (PartyNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    //유저가 가입한 파티들을 불러오는 컨트롤러 만들기
    @GetMapping("/myparty")
    public ResponseEntity<List<PartyResponseDto>> myParty() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = principal.getUsername();

        try {
            List<PartyResponseDto> partyResponseDtoList = partyService.myParty(userId);
            return ResponseEntity.ok().body(partyResponseDtoList);
        } catch (PartyNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }


    }
}
