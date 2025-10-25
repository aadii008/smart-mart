package com.examly.springapp.service;

import com.examly.springapp.DTO.OrderDTO;
import com.examly.springapp.repository.UserRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RazorpayService {

    private final RazorpayClient razorpayClient;
    private OrderService orderService;
    private UserRepo userRepo;

    public RazorpayService(@Value("${razorpay.key_id}") String keyId,
                           @Value("${razorpay.key_secret}") String keySecret,
                           OrderService orderService,
                           UserRepo userRepo) throws RazorpayException {
        this.razorpayClient = new RazorpayClient(keyId, keySecret);
        this.orderService = orderService;
        this.userRepo = userRepo;
    }

    public Map<String, Object> createOrder(Long orderId) throws RazorpayException {
        // You can fetch amount from DB using requestId if needed
        double amountInRupees = OrderDTO.toEntity(orderService.getOrderById(orderId), userRepo).getTotalAmount();
        double amountInPaise = amountInRupees * 100;

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "Payment Gateway - Request #" + orderId);
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);

        // Convert Razorpay Order to Map<String, Object>
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("receipt", order.get("receipt"));
        response.put("status", order.get("status"));

        return response;
    }
}