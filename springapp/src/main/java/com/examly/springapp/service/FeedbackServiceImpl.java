package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.DTO.FeedbackDTO;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.ProductRepo;
import com.examly.springapp.repository.UserRepo;

import jakarta.persistence.EntityNotFoundException;


@Service
public class FeedbackServiceImpl implements FeedbackService{

    private FeedbackRepo feedbackRepo;
    private UserRepo userRepo;
    private ProductRepo productRepo;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepo feedbackRepo,UserRepo userRepo,ProductRepo productRepo){
        this.feedbackRepo = feedbackRepo;
        this.userRepo = userRepo;
        this.productRepo=productRepo;
    }

    @Override
    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {

        if(feedbackDTO != null){
            return FeedbackDTO.fromEntity(feedbackRepo.save(FeedbackDTO.toEntity(feedbackDTO,userRepo,productRepo)));
        }

        else throw new EntityNotFoundException();
            
    }

    @Override
    public FeedbackDTO getFeedbackById(Long feedbackId){
        Optional<Feedback> isIDPresent = feedbackRepo.findById(feedbackId);
        if(isIDPresent.isPresent()){
            return FeedbackDTO.fromEntity(isIDPresent.get());
        }
        else{
            throw new EntityNotFoundException("Feedback is not found for the ID "+ feedbackId);
        }
    }

    @Override
    public List<FeedbackDTO> getAllFeedback(){
        List<Feedback> feedbackList = feedbackRepo.findAll();
        List<FeedbackDTO> feedbackDTOs = new ArrayList<>();
        for(Feedback feedback : feedbackList)
        {
            feedbackDTOs.add(FeedbackDTO.fromEntity(feedback));
        }
        return feedbackDTOs;
    }

    @Override
    public FeedbackDTO deleteFeedback(Long feedbackId) {
        if(feedbackRepo.existsById(feedbackId)){
           Optional<Feedback> feedbackOptional = feedbackRepo.findById(feedbackId);
           if(feedbackOptional.isPresent()) {
            feedbackRepo.deleteById(feedbackId);
            return FeedbackDTO.fromEntity(feedbackOptional.get());
           } else {
            throw new EntityNotFoundException("Feedback with ID " + feedbackId + " not found!");
           }
        }
        else{
            throw new EntityNotFoundException("Feedback with ID " + feedbackId + " not found!");
        }
    }

    @Override
    public List<FeedbackDTO> getFeedbackByUserId(Long userId) {
        if(userRepo.existsById(userId)){
            List<Feedback> userFeedbacks = feedbackRepo.findFeedbackById(userId);
            if(userFeedbacks.isEmpty()){
                throw new EntityNotFoundException("No Feedbacks found with User ID "+userId);
            }
            List<FeedbackDTO> feedbackDTOs = new ArrayList<>();
            for(Feedback feedback : userFeedbacks)
            {
                feedbackDTOs.add(FeedbackDTO.fromEntity(feedback));
            }
            return feedbackDTOs;
        }
        else{
            throw new EntityNotFoundException("User with ID "+ userId+ " not found");
        }
    }

}
