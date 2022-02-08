import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form!: FormGroup;
  message: string='';
  
  constructor(
    private authService: AuthService,
    private authGuardService: AuthGuardService,
    private router: Router
  ) {
    authService.context.validate().subscribe(()=>authGuardService.canActivate());
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('')
    });
  }

  submit() {

    let user : User = { 
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.authService.add(user).subscribe(data => {
      if (data) {
        this.redirectToAllUsers();
      }
      else{
        this.message = "Такой email уже зарегистрирован!";
      }
    }, err => {
      this.message = "Что-то пошло не так...";
    });
  }

  redirectToAllUsers(){
    this.router.navigate([`work/allusers`]);
  }

}
