package com.examly.springapp.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Product;

public interface ProductRepo extends JpaRepository<Product,Long> {
    
    @Query("select p from Product p where p.user.userId= :userId")
    List<Product> findByUser(Long userId);
    
    @Query("select p from Product p where p.category= :category")
    List<Product> findByCategory(String category);

    
    @Query("SELECT p.category, COUNT(p) FROM Product p GROUP BY p.category")
    List<Product> countProductsByCategory();



}
