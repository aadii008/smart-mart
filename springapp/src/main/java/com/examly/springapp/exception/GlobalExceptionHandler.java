package com.examly.springapp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> entityNotFoundException(EntityNotFoundException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException e){
        return ResponseEntity.status(400).body(e.getMessage());
    }

    @ExceptionHandler(NoUserFoundException.class)
    public ResponseEntity<String> noUserFoundException(NoUserFoundException e){
        return ResponseEntity.status(404).body(e.getMessage());
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<String> duplicateUserException(DuplicateUserException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
     public ResponseEntity<String> badCredentialsException(BadCredentialsException e){
         return ResponseEntity.status(401).body(e.getMessage());
     }

    @ExceptionHandler(InvalidOrderException.class)
    public ResponseEntity<String> invalidOrderException(InvalidOrderException e){
        return ResponseEntity.status(400).body(e.getMessage());
    }

    @ExceptionHandler(InvalidProductException.class)
    public ResponseEntity<String> invalidProductException(InvalidProductException e){
        return ResponseEntity.status(400).body(e.getMessage());
    }

    @ExceptionHandler(AdminRequestPendingException.class)
    public ResponseEntity<String> adminRequestPendingException(AdminRequestPendingException e){
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
