import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { UserService } from 'src/app/services/user.service';

 
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedUser : any = {username:"",mobileNumber:"",email:""};
 
  constructor(private userService:UserService,private feedbackService: FeedbackService) {}
 
  ngOnInit(): void {
    this.loadFeedbacks();
  }
 
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe(params => {
      this.feedbacks = params;
      console.log(params)
    });
  }
 
  showProfile(userId:number): void {
    console.log("userId",userId)
    this.userService.getProfileById(userId).subscribe(params=>{
      this.selectedUser=params;
      
    })
  }
 
  closeModal(): void {
    this.selectedUser = null;
  }
}
