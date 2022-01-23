import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeltType } from 'src/app/models/belt-type';
import { BeltContextService } from 'src/app/services/belt-context.service';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';

@Component({
  selector: 'app-add-belt',
  templateUrl: './add-belt.component.html',
  styleUrls: ['./add-belt.component.css']
})
export class AddBeltComponent implements OnInit {

  public beltTypes: BeltType[] = [];
  form!: FormGroup;

  constructor(
    public belttypescontext:BeltTypesContextService,
    public beltcontext: BeltContextService,
    private router: Router) { }

  ngOnInit(): void {
    this.belttypescontext.get().subscribe(beltTypes => {
      this.beltTypes = beltTypes;

      this.form = new FormGroup({
        belttype: new FormControl(beltTypes[0].id),
        cost: new FormControl('', [Validators.min(10), Validators.required]),
        name: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)]),
      });

    });
  }

  submit(){
    let index = this.beltTypes.findIndex(b => b.id == this.form.value.belttype);
    let Type = this.beltTypes[index].type;
    let belt = {
      cost: Math.trunc(this.form.value.cost),
      name: this.form.value.name,
      beltType: Type
    }
    this.beltcontext.add(belt).subscribe(()=>{this.router.navigate([`allbelts`]);});
  }

  redirectToAllBelts(){
    this.router.navigate([`allbelts`]);
  }

}
