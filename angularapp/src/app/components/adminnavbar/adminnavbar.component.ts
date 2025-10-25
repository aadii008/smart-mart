import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {


  userId: string = '';
  showDropdown = false;
  showLogoutPopup = false;
  isLoggedin = false;
  userRole = '';
  userName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id') || '';
    this.isLoggedin = this.authService.isAuthenticated();
    this.userRole = localStorage.getItem('role') || '';
    this.userName = localStorage.getItem('username') || '';
    console.log(this.userName,this.userRole)
    console.log("isloggedin: "+this.isLoggedin);
    console.log("username: "+this.userName);
    console.log("role: "+this.userRole);
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
