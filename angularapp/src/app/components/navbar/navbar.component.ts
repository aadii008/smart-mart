
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin = false;
  userRole = '';
  userName = '';
  showDropdown = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.isLoggedin = this.authService.isAuthenticated();
    this.userRole = localStorage.getItem('role') || '';
    this.userName = localStorage.getItem('username') || '';
    console.log(this.userName, this.userRole)
    console.log("isloggedin: " + this.isLoggedin);
    console.log("username: " + this.userName);
    console.log("role: " + this.userRole);
  }


  toggle() {
    this.showDropdown = !this.showDropdown;
  }

  showCartModal = false;

  openCartModal() {
    this.showCartModal = true;
  }

  closeCartModal() {
    this.showCartModal = false;
  }



}



