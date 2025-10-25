package com.examly.springapp.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;

@Builder
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private long orderId;
    
    @ManyToOne
    private User user;

    @ManyToMany
    private List<Product> product;

    private String shippingAddress;
    private double totalAmount;
    private int quantity;
    public enum OrderStatus{
        PENDING, ACCEPTED, PACKED, SHIPPED, DELIVERED, OUTOFSTOCK, OUTFORDELIVERY ,CANCELED
    }
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    private Date createdAt;
    private Date updatedAt;

    public Order() {
    }
    public Order(long orderId, User user, List<Product> product, String shippingAddress, double totalAmount,
            int quantity, OrderStatus status, Date createdAt, Date updatedAt) {
        this.orderId = orderId;
        this.user = user;
        this.product = product;
        this.shippingAddress = shippingAddress;
        this.totalAmount = totalAmount;
        this.quantity = quantity;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    public long getOrderId() {
        return orderId;
    }


    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }

    public List<Product> getProduct() {
        return product;
    }

    public void setProduct(List<Product> product) {
        this.product = product;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }


    public Date getUpdatedAt() {
        return updatedAt;
    }


    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    @Override
    public String toString() {
        return "Order [orderId=" + orderId + ", user=" + user + ", product=" + product + ", shippingAddress="
                + shippingAddress + ", totalAmount=" + totalAmount + ", quantity=" + quantity + ", status=" + status
                + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}
