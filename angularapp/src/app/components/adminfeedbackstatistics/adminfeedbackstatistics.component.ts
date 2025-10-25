import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminfeedbackstatistics',
  templateUrl: './adminfeedbackstatistics.component.html',
  styleUrls: ['./adminfeedbackstatistics.component.css']
})
export class AdminfeedbackstatisticsComponent implements OnInit {

  overallData: any[] = [];
 overallLayout: any;
 perProductData: any[] = [];
 perProductLayout: any;
 constructor(private feedbackService: FeedbackService) {}
 ngOnInit(): void {
      this.loadCharts();
 }
 loadCharts() {
   this.feedbackService.getOverall().subscribe(overall => {
     this.overallData = [{
       values: [overall.positive, overall.negative],
       labels: ['Positive', 'Negative'],
       type: 'pie',
       textinfo: 'label+percent'
     }];
     this.overallLayout = { title: 'Overall Feedback Sentiment', height: 400, width: 500 };
   });
   this.feedbackService.getPerProduct().subscribe(data => {
     const productNames = data.map(d => d.productName);
     const positives = data.map(d => d.positive);
     const negatives = data.map(d => d.negative);
     this.perProductData = [
       { x: productNames, y: positives, name: 'Positive', type: 'bar', marker: {color:'#36A2EB'} },
       { x: productNames, y: negatives, name: 'Negative', type: 'bar', marker: {color:'#FF6384'} }
     ];
     this.perProductLayout = {
       title: 'Feedback per Product',
       barmode: 'group',
       height: 500,
       width: 800
     };
   });
 }
 reclassify() {
   this.feedbackService.classifyAll().subscribe(() =>{ this.loadCharts()
   window.location.reload()});
 }

}
