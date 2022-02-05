import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BeltType } from 'src/app/models/belt-type';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';

@Component({
  selector: 'app-edit-belt-type',
  templateUrl: './edit-belt-type.component.html',
  styleUrls: ['./edit-belt-type.component.css']
})
export class EditBeltTypeComponent implements OnInit {

  public beltType?: BeltType;
  public form!: FormGroup;
  
  constructor(
    public belttypescontext:BeltTypesContextService,
    public route: ActivatedRoute,
    private authGuardService: AuthGuardService,
    private router: Router) {
      belttypescontext.context.validate().subscribe(()=>authGuardService.canActivate());
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl('', [Validators.minLength(3), Validators.maxLength(15)]),
    });

    this.route.params.subscribe((params: Params)=>
    {
      let id = params["id"];
      this.belttypescontext.getOne(id).subscribe(beltType => {
        this.beltType = beltType;
        this.form = new FormGroup({
          type: new FormControl(this.beltType.type, [Validators.minLength(3), Validators.maxLength(15)])
        });
      });
    });
  }

  submit(){
    let beltType = {
      id: this.beltType?.id,
      type: this.form.value.type
    }
    this.belttypescontext.update(beltType).subscribe(data => {
      this.redirectToAllBeltTypes();
    });
  }

  redirectToAllBeltTypes(){
    this.router.navigate([`work/allbelttypes`]);
  }

}
