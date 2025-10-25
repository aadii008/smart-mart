import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl = API_BASE_URL;

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/api/user");
  }

  getProfileById(userId : number) : Observable<User> {
    return this.http.get<User>(this.apiUrl + "/api/user/" + userId);
  }

  deleteUserById(userId : number) : Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/api/user/" + userId);
  }

  public getAdmins(){
    return this.http.get<User[]>(this.apiUrl + "/api/superadmin");
  }

  public approveAdmin(userId: number,user: User){
    return this.http.put<User>(this.apiUrl + "/api/superadmin/approve/" +userId,user);
  }

  public rejectAdmin(userId: number,user: User){
    return this.http.put<User>(this.apiUrl + "/api/superadmin/reject/" +userId,user);
  }
}
