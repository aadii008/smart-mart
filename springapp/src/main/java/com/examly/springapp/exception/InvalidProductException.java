package com.examly.springapp.exception;

public class InvalidProductException extends RuntimeException{
    public InvalidProductException(String error){
        super(error);
    }
}
