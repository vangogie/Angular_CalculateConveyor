import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';

@Component({
  selector: 'app-add-belt-type',
  templateUrl: './add-belt-type.component.html',
  styleUrls: ['./add-belt-type.component.css']
})
export class AddBeltTypeComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    public belttypescontext:BeltTypesContextService,
    private authGuardService: AuthGuardService,
    private router: Router
  ) { 
    belttypescontext.context.validate().subscribe(()=>authGuardService.canActivate());
    this.form = new FormGroup({
      type: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
    });
  }

  ngOnInit(): void {
  }

  submit(){
    let beltType = {
      type: this.form.value.type
    }
    this.belttypescontext.add(beltType).subscribe(data => {
      this.redirectToAllBeltTypes();
    });
  }

  redirectToAllBeltTypes(){
    this.router.navigate([`work/allbelttypes`]);
  }

}
