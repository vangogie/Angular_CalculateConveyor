import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Engine } from 'src/app/models/engine';
import { EngineContextService } from 'src/app/services/engine-context.service';

@Component({
  selector: 'app-add-engine',
  templateUrl: './add-engine.component.html',
  styleUrls: ['./add-engine.component.css']
})
export class AddEngineComponent implements OnInit {
  form!: FormGroup;
  public style: string = 'danger';
  public powers: number[] = [];
  public courses: Course[] = [];

  constructor(public context:EngineContextService, private router: Router) {
    this.powers = context.getPower();
   }

  ngOnInit(): void {
    this.context.context.getCourse().subscribe(data => {
      this.courses = data;
      let uah: Course = {ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1 };
      this.courses.push(uah);

      let indexUSD = this.courses.findIndex(c => c.ccy == 'USD');
      let USD = this.courses[indexUSD].sale;

      this.form = new FormGroup({
        vendor: new FormControl('sews'),
        cost: new FormControl('', [Validators.min(10), Validators.required]),
        power: new FormControl('0.37'),
        course: new FormControl(USD, [Validators.required])
      });
    });
  }

  submit()
  {
    let sew: Engine = {
      cost: this.calculateToUSD(),
      power: this.form.value.power,
    }
    this.context.addEngine(sew, this.form.value.vendor).subscribe(()=>{this.router.navigate([`allengines`]);});
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

  redirectToAllEngines()
  {
    this.router.navigate([`allengines`]);
  }

  onChangeEngine(event: any){
    if(event.target.value == 'sews'){
      this.style = 'danger';
    }
    else{
      this.style = 'primary'
    }
  }

}
