package com.examly.springapp.service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FeedbackAIService {
   
   private final FeedbackRepo feedbackRepository;
   private final RestTemplate restTemplate;
   @Value("${ai.api.key}")
   private String apiKey;

   @Autowired
   public FeedbackAIService(FeedbackRepo feedbackRepository, RestTemplate restTemplate) {
       this.feedbackRepository = feedbackRepository;
       this.restTemplate = restTemplate;
   }

   public String classifySentiment(String feedbackText) {
       try {
           String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;
           Map<String, Object> requestBody = new HashMap<>();
           List<Map<String, Object>> contents = new ArrayList<>();
           Map<String, Object> content = new HashMap<>();
           List<Map<String, String>> parts = new ArrayList<>();
           Map<String, String> textPart = new HashMap<>();
           textPart.put("text", "Classify this feedback strictly as 'positive' or 'negative': " + feedbackText);
           parts.add(textPart);
           content.put("parts", parts);
           contents.add(content);
           requestBody.put("contents", contents);
           HttpHeaders headers = new HttpHeaders();
           headers.setContentType(MediaType.APPLICATION_JSON);
           HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
           ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
           return parseSentiment(response.getBody());
       } catch (Exception e) {

           return "neutral";
       }
   }

   private String parseSentiment(Map response) {
       try {
           List candidates = (List) response.get("candidates");
           if (candidates == null || candidates.isEmpty()) return "neutral";
           Map firstCandidate = (Map) candidates.get(0);
           Map content = (Map) firstCandidate.get("content");
           List parts = (List) content.get("parts");
           if (parts == null || parts.isEmpty()) return "neutral";
           Map part = (Map) parts.get(0);
           String text = ((String) part.get("text")).toLowerCase();
           if (text.contains("positive")) return "positive";
           if (text.contains("negative")) return "negative";
           return "neutral";
       } catch (Exception e) {

           return "neutral";
       }
   }

   public void classifyAllFeedbacks() {
       List<Feedback> feedbacks = feedbackRepository.findAll();

       for (Feedback f : feedbacks) {
           String sentiment = classifySentiment(f.getMessage());
           f.setSentiment(sentiment);
           feedbackRepository.save(f);
       }
   }

   public Map<String, Long> getOverallStats() {
       List<Feedback> feedbacks = feedbackRepository.findAll();
       long positive = feedbacks.stream().filter(f -> "positive".equalsIgnoreCase(f.getSentiment())).count();
       long negative = feedbacks.stream().filter(f -> "negative".equalsIgnoreCase(f.getSentiment())).count();
       return Map.of("positive", positive, "negative", negative);
   }

   public List<Map<String, Object>> getPerProductStats() {
       List<Feedback> feedbacks = feedbackRepository.findAll();
       List<Map<String, Object>> result = feedbacks.stream()
       .collect(Collectors.groupingBy(
           f -> f.getProduct().getName(),
           Collectors.groupingBy(
               f -> f.getSentiment(),
               Collectors.counting()
           )
       ))
       .entrySet()
       .stream()
       .map(e -> {
           Map<String, Object> map = new HashMap<>();
           map.put("productName", e.getKey());
           map.put("positive", e.getValue().getOrDefault("positive", 0L));
           map.put("negative", e.getValue().getOrDefault("negative", 0L));
           return map;
       })
       .collect(Collectors.toList());
       return result;

}
}