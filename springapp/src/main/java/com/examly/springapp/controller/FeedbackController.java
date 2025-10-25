package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.DTO.FeedbackDTO;
import com.examly.springapp.service.FeedbackService;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FeedbackDTO createFeedback(@RequestBody FeedbackDTO feedback) {
        return feedbackService.createFeedback(feedback);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{feedbackId}")
    @ResponseStatus(HttpStatus.OK)
    public FeedbackDTO getFeedbackById(@PathVariable Long feedbackId) {
        return feedbackService.getFeedbackById(feedbackId);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FeedbackDTO> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{feedbackId}")
    @ResponseStatus(HttpStatus.OK)
    public FeedbackDTO deleteFeedback(@PathVariable Long feedbackId) {
        return feedbackService.deleteFeedback(feedbackId);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<FeedbackDTO> getFeedbackByUserId(@PathVariable Long userId) {
        return feedbackService.getFeedbackByUserId(userId);
    }
}
