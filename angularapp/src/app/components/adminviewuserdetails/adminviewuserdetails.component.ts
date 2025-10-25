import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-adminviewuserdetails',
  templateUrl: './adminviewuserdetails.component.html',
  styleUrls: ['./adminviewuserdetails.component.css']
})
export class AdminviewuserdetailsComponent implements OnInit {
  users: any[] = [];
  userIdToDelete: number = null;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    
  }

  getUsers() {
    this.service.getAllUsers().subscribe(params => {
      this.users = params;
      this.users = this.users.filter(u => u.userRole == 'USER');
    })
  }

  openDeleteModal(userId: number): void {
    this.userIdToDelete = userId;
    console.log(userId);
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  confirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.service.deleteUserById(this.userIdToDelete).subscribe({
        next: () => {
          
          this.users = this.users.filter(user => user.id !== this.userIdToDelete);
          this.userIdToDelete = null;

          const modalElement = document.getElementById('deleteModal');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          }
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user.');
        }
      });
    }
  }

}
