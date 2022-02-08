import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  
  public users: User[] = [];
  
  constructor(
    private authService: AuthService,
    private authGuardService: AuthGuardService,
    private router: Router) { 
      authService.context.validate().subscribe(()=>authGuardService.canActivate());
    }

  ngOnInit(): void {
    this.authService.get().subscribe(users => {
      this.users = users;
    });
  }

  addNewUser(){
    this.router.navigate([`work/adduser`]);
  }

  editPassword(email: any){
    this.router.navigate([`work/edituser/${email}`]);
  }

  deleteUser(email: any, id: any){
    this.router.navigate([`work/deleteuser/${email}/${id}`]);
  }

}
