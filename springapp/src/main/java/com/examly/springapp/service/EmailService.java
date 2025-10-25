package com.examly.springapp.service;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
 
@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
 
    public void sendOtp(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP Code");
        message.setText("Your verification code is: " + otp);
        mailSender.send(message);
    }
 
    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Your Email Verification OTP");
            message.setText("Your verification code is: " + otp +
                    "\n\nPlease do not share this code with anyone.");
 
            mailSender.send(message);
           
            logger.info("OTP email sent successfully to: {}", toEmail);
 
        } catch (MailAuthenticationException e) {
            logger.error("Authentication failed! Check your email credentials or app password.");
 
        } catch (MailSendException e) {
            logger.error("Mail sending failed! The recipient address might be invalid or your network may be blocking SMTP.");
 
        } catch (org.springframework.mail.MailException e) {
            logger.error("Messaging exception occurred while constructing or sending the email.");
 
        } catch (Exception e) {
            logger.error("Unexpected error occurred while sending email to: {}", toEmail);
        }
    }
}
 
 