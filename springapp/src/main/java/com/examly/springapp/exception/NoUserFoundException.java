package com.examly.springapp.exception;

public class NoUserFoundException extends RuntimeException{
    public NoUserFoundException(String error){
        super(error);
    }
}
