package com.examly.springapp.exception;

public class DuplicateUserException extends RuntimeException{
    public DuplicateUserException(String error){
        super(error);
    }
}
