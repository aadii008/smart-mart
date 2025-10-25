package com.examly.springapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.service.RazorpayService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private RazorpayService razorpayService;

    @Autowired
    public PaymentController(RazorpayService razorpayService) {
        this.razorpayService = razorpayService;
    }

    // @PreAuthorize("hasRole('USER')")
    @PostMapping("/create-order/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> createOrder(@PathVariable Long orderId) throws RazorpayException {
        return razorpayService.createOrder(orderId);
    }

}