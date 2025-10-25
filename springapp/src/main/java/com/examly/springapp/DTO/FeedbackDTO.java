package com.examly.springapp.DTO;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.Product;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;

public record FeedbackDTO(
    long feedbackId,
    String message,
    int rating,
    User user,
    Product product
){

    public static Feedback toEntity(FeedbackDTO feedbackDTO,UserRepo userRepo,ProductRepo productRepo) {
        Feedback.FeedbackBuilder builder = Feedback.builder()
        .feedbackId(feedbackDTO.feedbackId())
        .message(feedbackDTO.message())
        .rating(feedbackDTO.rating());

        if(feedbackDTO.user.getUserId() != 0){
            User user = userRepo.findById(feedbackDTO.user.getUserId())
                                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + feedbackDTO.user.getUserId()));
            builder.user(user);
        }
        if(feedbackDTO.product.getProductId() != 0){
            Product product = productRepo.findById(feedbackDTO.product.getProductId())
                                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + feedbackDTO.product.getProductId()));
            builder.product(product);
        }
    
        return builder.build();
    }

    public static FeedbackDTO fromEntity(Feedback entity) {
        return new FeedbackDTO(
                entity.getFeedbackId(),
                entity.getMessage(),
                entity.getRating(),
                entity.getUser(),
                entity.getProduct()
        );
    }
}
