package com.example.MM.user.exception;

public class DuplicateUsernameException extends RuntimeException{
    public DuplicateUsernameException(String message){
        super(message);

    }
}
