package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.Order.OrderStatus;

public interface OrderRepo extends JpaRepository<Order,Long> {

    @Query("SELECT o FROM Order o WHERE o.user.userId = :userId")
    public List<Order> findByUserId(long userId);

    @Query("Select o FROM Order o WHERE o.status = :status")
    public List<Order> findByStatus(OrderStatus status);

}
