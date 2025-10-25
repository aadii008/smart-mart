package com.examly.springapp.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    // Inject from environment variables or application.properties
    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.messaging.service.sid}")
    private String messagingServiceSid;

    public void sendOtp(String phoneNumber, String otp) {
        // Initialize Twilio with secure credentials
        Twilio.init(accountSid, authToken);

        // Format phone number
        String toPhoneNumber = "+91" + phoneNumber;

        // Send OTP
        Message message = Message.creator(
                new PhoneNumber(toPhoneNumber),
                messagingServiceSid,  // Use injected service SID
                "Your OTP is " + otp
        ).create();

        // Optional: log or return SID securely
        String sid = message.getSid();
        System.out.println("Sent OTP, message SID: " + sid);
    }
}
