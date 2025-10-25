package com.examly.springapp.service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class EmailOtpService {

    private final Map<String, String> otpStorage = new HashMap<>();
    private final Random random = new SecureRandom();
 
    public String generateOtp(String key) {
        String otp = String.format("%06d", random.nextInt(1000000));
        otpStorage.put(key, otp);
        return otp;
    }
 
    public boolean validateOtp(String key, String otp) {
        key = URLDecoder.decode(key, StandardCharsets.UTF_8);
        String storedOtp = otpStorage.getOrDefault(key, "");
        return otp.equals(storedOtp);
    }
}