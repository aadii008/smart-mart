import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbacks: any = [];
  constructor(private feedBackService: FeedbackService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  userId: number = 0;
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.feedBackService.getFeedbackByUserId(this.userId).subscribe(params => {
      this.feedbacks = params;
    })
  }


  showDeleteConfirmModal: boolean = false;
  selectedFeedbackId: number | null = null;

  openDeleteConfirmModal(feedbackId: number) {
    this.selectedFeedbackId = feedbackId;
    this.showDeleteConfirmModal = true;
  }

  closeDeleteConfirmModal() {
    this.showDeleteConfirmModal = false;
    this.selectedFeedbackId = null;
  }

  confirmDelete() {
    if (this.selectedFeedbackId !== null) {

      this.feedBackService.deleteFeedback(this.selectedFeedbackId).subscribe((params) => {

        this.feedBackService.getFeedbackByUserId(this.userId).subscribe(p => {
          this.feedbacks = p;
        })
        window.location.reload();
        this.closeDeleteConfirmModal();
      });
    }
  }
}