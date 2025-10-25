package com.examly.springapp.controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.service.EmailOtpService;
import com.examly.springapp.service.EmailService;

@RestController
@RequestMapping("/api/user")
public class EmailController {

    private EmailService emailService;

    private EmailOtpService emailOtpService;

    @Autowired
    public EmailController(EmailOtpService emailOtpService, EmailService emailService) {
        this.emailService = emailService;
        this.emailOtpService = emailOtpService;
    }

    @PostMapping("/send/email")
    public ResponseEntity<String> sendOtpEmail(@RequestParam("email") String email) {
        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);
        String otp = emailOtpService.generateOtp(decodedEmail);
        emailService.sendOtpEmail(decodedEmail, otp);
        return ResponseEntity.ok("OTP sent successfully to your email: " + decodedEmail);
    }
    
    @PostMapping("/verify/email")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestParam("email") String email,
            @RequestParam("otp") String otp) {
        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);
        boolean isValid = emailOtpService.validateOtp(decodedEmail.toLowerCase(), otp);

        Map<String, String> response = new HashMap<>();
        response.put("message", isValid ? "OTP Verified Successfully" : "Invalid OTP");

        return ResponseEntity.ok(response);
    }

}
