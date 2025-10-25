import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { API_BASE_URL } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl: string = API_BASE_URL;

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<User> {
    return this.http.post(`${this.apiUrl}/api/register`, user) as Observable<User>;
  }

  public login(login: Login, callback: any) {
    return this.http.post(this.apiUrl + "/api/login", login).subscribe((data: any) => {
      console.log("data", data)

      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("role", data.userRole);
      localStorage.setItem("username", data.username);
      localStorage.setItem("user_id", data.userId);
      this.router.navigate(['/home']);
    }, error => callback(error));
  }

  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    this.router.navigate(['/api/login'])
  }

  isAuthenticated(): boolean {
    let jwttoken = localStorage.getItem("jwtToken");
    if (jwttoken == undefined || jwttoken.trim().length == 0)
      return false;
    else {
      return true;
    }
  }

  isAdmin(): boolean {
    return localStorage.getItem("role") === "ADMIN";
  }

  isUser(): boolean {
    return localStorage.getItem("role") === "USER";
  }

  getAuthenticatedUserId(): number | null {
    const id = localStorage.getItem("user_id");
    return id ? Number(id) : null;
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/api/user/username/${username}`);
  }

  checkMobileNumberExists(mobileNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/api/user/mobileNumber/${mobileNumber}`);
  }

  sendOtp(mobileNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/otp/send/sms?phone=${ mobileNumber }`, null);
  }

  verifyOtp(mobileNumber: string, otp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/otp/verify?key=${mobileNumber}&otp=${otp}`, null);
  }

  sendOtpEmail(email : String) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user/send/email?email=${email}`, null);
  }

  verifyEmailOtp(email : string, otp : string) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user/verify/email?email=${email}&otp=${otp}`, null);
  }
  
  getOrderCategoryCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/api/orders/category-counts`);
  }
  setUpRazorpay(orderId : number) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/payment/create-order/${orderId}`, {});
  }
}