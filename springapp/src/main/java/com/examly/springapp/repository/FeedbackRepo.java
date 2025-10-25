package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Feedback;

public interface FeedbackRepo extends JpaRepository<Feedback,Long>{

    @Query("SELECT f FROM Feedback f WHERE f.user.userId = :userId")
    public List<Feedback> findFeedbackById(long userId);

    public List<Feedback> findBySentiment(String sentiment);
    
}
