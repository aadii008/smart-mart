import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
 
@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,private productService:ProductService) { }
  userId: string = '';
  showDropdown = false;
  showLogoutPopup = false;
  isLoggedin = false;
  userRole = '';
  userName = '';
  cartItemCount = 0;

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id') || '';
    this.isLoggedin = this.authService.isAuthenticated();
    this.userRole = localStorage.getItem('role') || '';
    this.userName = localStorage.getItem('username') || '';
    console.log(this.userName,this.userRole)
    console.log("isloggedin: "+this.isLoggedin);
    console.log("username: "+this.userName);
    console.log("role: "+this.userRole);
    this.productService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });

  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
