import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  aSub!: Subscription;


  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

    /*this.route.queryParams.subscribe((params: Params) => {

      if (params['registered']) {
        MaterialService.toast('Теперь Вы можете зайти в систему, используя свои данные регистрации!!')
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе')
      }

      else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заного')
      }

    });*/
  }

  submit() {
    console.log(this.form.value)


    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/work/'])
      },
      (error) => {
        //MaterialService.toast(error.message);
      }
    )
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
