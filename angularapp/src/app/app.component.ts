import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart-Mart';

  role: string | null = null;
  
  showNavbar = true;
   
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes = ['/login', '/register'];
        this.showNavbar = !hiddenRoutes.includes(event.url);
      }
    });
  }
 
  ngOnInit(): void {
    this.updateAuthState();
 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.role);
        this.updateAuthState();
      }
    });
  }
 
  updateAuthState(): void {
    this.role = localStorage.getItem('role');
  }

  




}
