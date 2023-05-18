package com.example.puzzle.party.exception;

public class UnauthorizedPartyAccessException extends RuntimeException {
    public UnauthorizedPartyAccessException(String message) {
        super(message);
    }
}