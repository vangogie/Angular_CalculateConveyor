import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public form!: FormGroup;
  public email: string='';
  public message = '';
  
  constructor(
    private authService: AuthService,
    private authGuardService: AuthGuardService,
    private router: Router,
    public route: ActivatedRoute
  ) {
    authService.context.validate().subscribe(()=>authGuardService.canActivate());
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>
    {
        this.email = params["email"];
        this.form = new FormGroup({
          password: new FormControl('', [Validators.required, Validators.minLength(8)]),
          confirmPassword: new FormControl('')
        });
      });
  }

  submit(){
    let user = {
      email: this.email,
      password: this.form.value.password
    }
    this.authService.update(user).subscribe(result=>{
      if(result)
      {
        this.router.navigate([`work/allusers`]);
      }
      else{
        this.message = 'Такого пользователя не существует!'
      }
  }, ()=>{this.message = 'Ошибка! Что-то пошло не так.'});
  }

  redirectToAllUsers(){
    this.router.navigate([`work/allusers`]);
  }
}
