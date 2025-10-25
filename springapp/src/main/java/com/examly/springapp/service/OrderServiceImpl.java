package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.DTO.OrderDTO;
import com.examly.springapp.exception.InvalidOrderException;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.Order.OrderStatus;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.*;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl implements OrderService {

    private  OrderRepo orderRepo;
    private  UserRepo userRepo;
    @Autowired
    public OrderServiceImpl(OrderRepo orderRepo, UserRepo userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    @Override
    public OrderDTO addOrder(OrderDTO orderDTO) {
        if (orderDTO == null) {
            throw new InvalidOrderException("Order cannot be null");
        }
        Order savedOrder = orderRepo.save(OrderDTO.toEntity(orderDTO,userRepo));
        return OrderDTO.fromEntity(savedOrder);
    }

    @Override
    public void deleteOrder(long orderId) {
        if (orderRepo.existsById(orderId)) {
            orderRepo.deleteById(orderId);
        } else {
            throw new EntityNotFoundException("Order not found with ID: " + orderId);
        }
    }
    @Override
    public OrderDTO getOrderById(Long orderId) {
        Optional<Order> isOrderIdPresent = orderRepo.findById(orderId);
        if (isOrderIdPresent.isPresent()) {
            return OrderDTO.fromEntity(isOrderIdPresent.get());
        } else {
            throw new EntityNotFoundException("Order not found with ID: " + orderId);
        }
    }

    @Override
    public List<OrderDTO> getOrdersByUser(long userId) {
        List<Order> orderList = orderRepo.findByUserId(userId);
        if (orderList.isEmpty()) {
            throw new EntityNotFoundException("No orders found for user ID: " + userId);
        }
        List<OrderDTO> dtoList = new ArrayList<>();
        for (Order order : orderList) {
            dtoList.add(OrderDTO.fromEntity(order));
        }
        return dtoList;
    }

    @Override
    public List<OrderDTO> getOrdersByStatus(OrderStatus status) {
        List<Order> orderList = orderRepo.findByStatus(status);
        if (orderList.isEmpty()) {
            throw new EntityNotFoundException("No orders found with status: " + status);
        }
        List<OrderDTO> dtoList = new ArrayList<>();
        for (Order order : orderList) {
            dtoList.add(OrderDTO.fromEntity(order));
        }
        return dtoList;
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<Order> orderList = orderRepo.findAll();
        if (orderList.isEmpty()) {
            throw new EntityNotFoundException("No orders found");
        }
        List<OrderDTO> dtoList = new ArrayList<>();
        for (Order order : orderList) {
            dtoList.add(OrderDTO.fromEntity(order));
        }
        return dtoList;
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(long userId) {
        return getOrdersByUser(userId); 
    }

    @Override
    public OrderDTO updateOrder(long orderId, OrderDTO order) {
        if(orderRepo.existsById(orderId)){
            return  OrderDTO.fromEntity(orderRepo.save(OrderDTO.toEntity(order, userRepo))); 
        }
        else{
            throw new EntityNotFoundException("No order Found");
        }
    }
    

  

  

    @Override
    public Map<String, Integer> getOrderCategoryCounts() {
        List<Order> orders = orderRepo.findAll();
        Map<String, Integer> categoryCounts = new HashMap<>();

        for (Order order : orders) {
            for (Product product : order.getProduct()) { // assuming getProducts() returns a list
                String category = product.getCategory();   // assuming Product has getCategory()
                categoryCounts.put(category, categoryCounts.getOrDefault(category, 0) + 1);
            }
        }

        return categoryCounts;
    }


    
}