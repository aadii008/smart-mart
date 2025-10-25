package com.examly.springapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.service.FeedbackAIService;

@RestController
@RequestMapping(value = "/api/feedback-ai", produces = "application/json")

public class FeedbackAIController {
   @Autowired
   private FeedbackAIService feedbackAIService;

   @PostMapping(value = "/classify", consumes = "application/json")
   @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
   public Map<String, String> classifyFeedback(@RequestBody Map<String, String> body) {
       String feedbackText = body.get("feedback");
       String sentiment = feedbackAIService.classifySentiment(feedbackText);
       return Map.of("sentiment", sentiment);
   }

   @PostMapping("/classify-all")
   @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
   public Map<String, String> classifyAll() {
       feedbackAIService.classifyAllFeedbacks();
       return Map.of("message", "All feedbacks classified successfully");
   }

   @GetMapping("/overall")
   @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
   public Map<String, Long> getOverallStats() {
       return feedbackAIService.getOverallStats();
   }

   @GetMapping("/per-product")
   @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
   public List<Map<String, Object>> getPerProductStats() {
       return feedbackAIService.getPerProductStats();
   }


}
