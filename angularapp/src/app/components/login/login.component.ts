import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string;
  userPassword: string;
  errorMessage: boolean = false;
  error: string = '';
  showPassword: boolean = false;
  capsLockOn: boolean = false;
  
 
  constructor(private authService: AuthService,private router:Router) {}

 
 
  public login() {
    if (this.userName && this.userPassword ) {
      let user = { username: this.userName, password: this.userPassword };
      this.authService.login(user, (response: any) => {
        this.errorMessage = true;
        this.error = response.error;
        
      });
    } else {
      this.errorMessage = true;
    }
  }
  

checkCapsLock(event: KeyboardEvent) {
  this.capsLockOn = event.getModifierState && event.getModifierState('CapsLock');
}
 
}
 
 