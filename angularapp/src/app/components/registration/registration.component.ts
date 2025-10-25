import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    role: 'USER'
  };

  passwordMismatch = false;
  registrationSuccess = false;
  usernameExists: boolean = false;
  phoneNumberExists: boolean = false;
  otpStatusMessage: string = '';
  enteredOtp: string = '';
  otpVerification : boolean = false;
  emailOtpVerification : boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.passwordMismatch = this.user.password !== this.user.confirmPassword;

    if (form.valid && !this.passwordMismatch) {
      const user: User = {
        email: this.user.email,
        password: this.user.password,
        username: this.user.username,
        mobileNumber: this.user.mobileNumber,
        userRole: this.user.role
      };
      this.authService.register(user).subscribe(() => {
        this.registrationSuccess = true;
        form.reset();
      });
    }
  }

  onConfirmSuccess() {
    this.registrationSuccess = false;
    this.router.navigate(['/login']);
  }

  checkUsernameAvailability() {
    if (this.user.username) {
      this.authService.checkUsernameExists(this.user.username).subscribe(
        (exists) => this.usernameExists = exists,
        () => this.usernameExists = false
      );
    }
  }

  checkPhonenumberAvailability() {
    if (this.user.mobileNumber) {
      this.authService.checkMobileNumberExists(this.user.mobileNumber).subscribe(
        (exists) => this.phoneNumberExists = exists,
        () => this.phoneNumberExists = false
      );
    }
  }

  openPhoneOtpModal() {
    if (this.user.mobileNumber.match(/^[6-9][0-9]{9}$/)) {
      this.sendPhoneOtp();
      const modal = new bootstrap.Modal(document.getElementById('phoneOtpModal'));
      modal.show();
    } else {
      alert('Please enter a valid mobile number first.');
    }
  }

  sendPhoneOtp() {
    this.authService.sendOtp(this.user.mobileNumber).subscribe(() => {
      console.log("OTP sent to phone");
    });
  }

  verifyPhoneOtp() {
    this.authService.verifyOtp(this.user.mobileNumber, this.enteredOtp).subscribe(
      response => {
        this.otpStatusMessage = response.message;
        this.otpVerification = this.otpStatusMessage === "OTP Verified Successfully";
        this.enteredOtp = '';
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
      },
      error => {
        console.error('Phone OTP verification failed:', error);
      }
    );
  }

  resendPhoneOtp() {
    this.sendPhoneOtp();
  }

  openEmailOtpModal() {
    if (this.user.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.sendEmailOtp();
      const modal = new bootstrap.Modal(document.getElementById('emailOtpModal'));
      modal.show();
    } else {
      alert("Enter valid email");
    }
  }

  sendEmailOtp() {
    this.authService.sendOtpEmail(this.user.email).subscribe(() => {
      console.log("OTP sent to email");
    });
  }

  verifyEmailOtp() {
    this.authService.verifyEmailOtp(this.user.email, this.enteredOtp).subscribe(
      response => {
        this.otpStatusMessage = response.message;
        this.emailOtpVerification = this.otpStatusMessage === "OTP Verified Successfully";
        this.enteredOtp = '';
        const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();
      },
      error => {
        console.error('Email OTP verification failed:', error);
      }
    );
  }

  resendEmailOtp() {
    this.sendEmailOtp();
  }

  closeAllModals() {
    bootstrap.Modal.getInstance(document.getElementById('emailOtpModal'))?.hide();
    bootstrap.Modal.getInstance(document.getElementById('phoneOtpModal'))?.hide();
    bootstrap.Modal.getInstance(document.getElementById('resultModal'))?.hide();
  }
  
  successModal(){
    this.registrationSuccess=true;
  }
}
