import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeltType } from 'src/app/models/belt-type';
import { Course } from 'src/app/models/course';
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
  public courses: Course[] = [];

  constructor(
    public belttypescontext:BeltTypesContextService,
    public beltcontext: BeltContextService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      belttype: new FormControl(),
      cost: new FormControl(),
      name: new FormControl(),
      course: new FormControl()
    });


    let USD: number;
    this.beltcontext.context.getCourse().subscribe(data => {
      this.courses = data;
      let uah: Course = {ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1 };
      this.courses.push(uah);

      let indexUSD = this.courses.findIndex(c => c.ccy == 'USD');
      USD = this.courses[indexUSD].sale;
  });


    this.belttypescontext.get().subscribe(beltTypes => {
      this.beltTypes = beltTypes;

      this.form = new FormGroup({
        belttype: new FormControl(beltTypes[0].id),
        cost: new FormControl('', [Validators.min(10), Validators.required]),
        name: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
        course: new FormControl(USD, [Validators.required])
      });
    });
  }

  submit(){
    let index = this.beltTypes.findIndex(b => b.id == this.form.value.belttype);
    let Type = this.beltTypes[index].type;
    let belt = {
      cost: this.calculateToUSD(),
      name: this.form.value.name,
      beltType: Type
    }
    this.beltcontext.add(belt).subscribe(()=>{this.router.navigate([`allbelts`]);});
  }

  redirectToAllBelts(){
    this.router.navigate([`allbelts`]);
  }

  private calculateToUSD(){
    let indexUSD = this.courses.findIndex(c => c.ccy == 'USD');
    let courseUSD = Number(this.courses[indexUSD].sale);
    let courseSelected = Number(this.form.value.course);
    return Math.trunc((this.form.value.cost * courseSelected) / courseUSD);
  }

  getIsSelected(name: string) {
    if (name == 'USD') {
      return true;
    }
    return false;
  }

}
