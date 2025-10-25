import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient) {

  }
  public apiUrl:string=API_BASE_URL;
  
  public createFeedback(feedback:Feedback):Observable<Feedback>{
    return this.http.post(this.apiUrl+"/api/feedback",feedback) as Observable<Feedback>;
  }

  public getAllFeedback():Observable<Feedback[]>{
    return this.http.get(this.apiUrl+"/api/feedback") as Observable<Feedback[]>;
  }

  public updateFeedback(id:number,feedback:Feedback):Observable<Feedback>{
    return this.http.put(this.apiUrl+"/api/feedback/"+id,feedback) as Observable<Feedback>;
  }

  public deleteFeedback(id:number):Observable<void>{
    return this.http.delete(this.apiUrl+"/api/feedback/"+id) as unknown as Observable<void>;
  }

  public getFeedbackByUserId(userId:number):Observable<Feedback[]>{
    return this.http.get(this.apiUrl+"/api/feedback/user/"+userId) as Observable<Feedback[]>;
  }
  
  classifyAll(): Observable<string> {
    return this.http.post(`${this.apiUrl}/api/feedback-ai/classify-all`, {}, { responseType: 'text' });
  }
  getOverall(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/feedback-ai/overall`);
  }
  getPerProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/feedback-ai/per-product`);
  }
}
