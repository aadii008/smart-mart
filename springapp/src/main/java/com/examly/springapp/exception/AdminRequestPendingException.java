package com.examly.springapp.exception;

public class AdminRequestPendingException extends RuntimeException{
    public AdminRequestPendingException(String error){
        super(error);
    }
}
