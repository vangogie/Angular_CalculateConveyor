import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  public errorInfo = '';
  public email: string='';
  private id?: number;

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
        this.id = params["id"];
    });
  }

  deleteUser(){
    if (this.id) {
      this.authService.delete(this.id).subscribe(result => {
        if (result) {
          this.router.navigate([`work/delete_success/allusers`]);
        }
        else{
          this.errorInfo = "Что-то пошло не так...Возможно удаляемый пользователь - последний!";
        }
      },
    error => {
      this.errorInfo = "Ошибка удаления пользователя!";
    });
      
    }

    
  }

  redirectToAllUsers(){
    this.router.navigate([`work/allusers`]);
  }

}
