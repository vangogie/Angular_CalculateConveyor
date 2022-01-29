import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) { 
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
    this.router.navigate([`allbelttypes`]);
  }

}
