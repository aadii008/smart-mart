package com.examly.springapp.DTO;

import java.time.LocalDateTime;


import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;


public record ProductDTO(
    long productId,
    String name,
    String description,
    double price,
    int stock,
    String category,
    String photoImage,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    User user
){

    public static Product toEntity(ProductDTO productDTO, UserRepo userRepo){
    Product.ProductBuilder builder = Product.builder()
        .productId(productDTO.productId())
        .name(productDTO.name())
        .description(productDTO.description())
        .price(productDTO.price())
        .stock(productDTO.stock())
        .category(productDTO.category())
        .photoImage(productDTO.photoImage())
        .createdAt(productDTO.createdAt())
        .updatedAt(productDTO.updatedAt());

    if(productDTO.user.getUserId() != 0){
        User user = userRepo.findById(productDTO.user.getUserId())
                            .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + productDTO.user.getUserId()));
        System.out.println("*****");
        builder.user(user);
        System.out.println(builder);

    }

    return builder.build();
}
    public static ProductDTO fromEntity(Product entity){
        if(entity == null) return null;
        return new ProductDTO(
            entity.getProductId(),
            entity.getName(),
            entity.getDescription(),
            entity.getPrice(),
            entity.getStock(),
            entity.getCategory(),
            entity.getPhotoImage(),
            entity.getCreatedAt(),
            entity.getUpdatedAt(),
            entity.getUser()
            );
    }
}