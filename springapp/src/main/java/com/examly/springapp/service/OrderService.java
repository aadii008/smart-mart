package com.examly.springapp.service;

import java.util.List;
import java.util.Map;

import com.examly.springapp.DTO.OrderDTO;
import com.examly.springapp.model.Order.OrderStatus;

public interface OrderService {

    public OrderDTO addOrder(OrderDTO order);

    public OrderDTO getOrderById(Long orderId);

    public void  deleteOrder(long orderId);

    public List<OrderDTO> getOrdersByUser(long userId);

    public List<OrderDTO> getOrdersByStatus(OrderStatus status);

    public List<OrderDTO> getAllOrders();

    public List<OrderDTO> getOrdersByUserId(long userId);

    public OrderDTO updateOrder(long orderId,OrderDTO order);
    
    public Map<String, Integer> getOrderCategoryCounts();
}
