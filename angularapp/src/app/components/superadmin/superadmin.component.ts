import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  constructor(private userService: UserService) { }
  admins: any[] = []

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.admins = data;
      this.admins = this.admins.filter(a => a.userRole == 'ADMIN' || a.userRole == 'PENDING_ADMIN'||a.userRole=='REJECTED_ADMIN')
    })
  }

  approveAdmin(admin: User){
    this.userService.approveAdmin(admin.userId,admin).subscribe(param =>{
      this.ngOnInit();
    })
  }

  rejectAdmin(admin: User){
    this.userService.rejectAdmin(admin.userId,admin).subscribe(param =>{
      this.ngOnInit();
    })
  }

}
