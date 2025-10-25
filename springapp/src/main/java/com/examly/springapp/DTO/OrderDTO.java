package com.examly.springapp.DTO;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.Order.OrderStatus;
import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.*;

import jakarta.persistence.EntityNotFoundException;

import java.util.Date;
import java.util.List;

public record OrderDTO(
        long orderId,
        User user,
        List<Product> product,
        String shippingAddress,
        double totalAmount,
        int quantity,
        OrderStatus status,
        Date createdAt,
        Date updatedAt) {

    public static Order toEntity(OrderDTO dto, UserRepo userRepo) {
        Order.OrderBuilder builder = Order.builder()
                .orderId(dto.orderId())
                .shippingAddress(dto.shippingAddress())
                .totalAmount(dto.totalAmount())
                .quantity(dto.quantity())
                .status(dto.status())
                .createdAt(dto.createdAt())
                .updatedAt(dto.updatedAt());

        if (dto.user.getUserId() != 0) {
            User user = userRepo.findById(dto.user.getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + dto.user.getUserId()));
            builder.user(user);
        }

        if (!dto.product.isEmpty()) {
            builder.product(dto.product);
        }

        return builder.build();
    }

    public static OrderDTO fromEntity(Order order) {
        return new OrderDTO(
                order.getOrderId(),
                order.getUser(),
                order.getProduct(),
                order.getShippingAddress(),
                order.getTotalAmount(),
                order.getQuantity(),
                order.getStatus(),
                order.getCreatedAt(),
                order.getUpdatedAt());
    }

}