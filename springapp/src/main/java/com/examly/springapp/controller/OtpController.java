package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.service.OtpService;
import com.examly.springapp.service.SmsService;

@RestController
@RequestMapping("/otp")
public class OtpController {

    private OtpService otpService;

    private SmsService smsService;

    @Autowired
    public OtpController(OtpService otpService, SmsService smsService) {
        this.otpService = otpService;
        this.smsService = smsService;
    }

    @PostMapping("/send/sms")
    public String sendOtpSms(@RequestParam String phone) {
        String otp = otpService.generateOtp(phone);
        smsService.sendOtp(phone, otp);
        return "OTP sent to your phone. Please check your phone." + otp;
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestParam String key, @RequestParam String otp) {
        boolean isValid = otpService.validateOtp(key, otp);
        Map<String, String> response = new HashMap<>();
        response.put("message", isValid ? "OTP Verified Successfully" : "Invalid OTP");
        return ResponseEntity.ok(response);
    }

}
