package com.examly.springapp.exception;

public class InvalidOrderException extends RuntimeException{
    public InvalidOrderException(String error){
        super(error);
    }
}
