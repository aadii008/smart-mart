package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.DTO.FeedbackDTO;

public interface FeedbackService {

    public FeedbackDTO createFeedback(FeedbackDTO feedback);
    public FeedbackDTO getFeedbackById(Long feedbackId);
    public List<FeedbackDTO> getAllFeedback();
    public FeedbackDTO deleteFeedback(Long feedbackId);
    public List<FeedbackDTO> getFeedbackByUserId(Long userId);
}
