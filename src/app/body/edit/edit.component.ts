import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin, Observable, tap } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Engine } from 'src/app/models/engine';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EngineContextService } from 'src/app/services/engine-context.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  engine?: Engine;
  form!: FormGroup;
  public vendor: string = 'sews';
  public style: string = 'danger';
  public powers: number[] = [];
  public courses: Course[] = [];
  private USD?: number;

  constructor(
    public context:EngineContextService, 
    public route:ActivatedRoute, 
    private authGuardService: AuthGuardService,
    private router: Router) { 
      context.context.validate().subscribe(()=>authGuardService.canActivate());    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      cost: new FormControl(),
      power: new FormControl(),
      course: new FormControl()
    });

    let USD: number;
    this.context.context.getCourse().subscribe(data => {
      this.courses = data;
      let uah: Course = {ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1 };
      this.courses.push(uah);

      let indexUSD = this.courses.findIndex(c => c.ccy == 'USD');
      USD = this.courses[indexUSD].sale;
  });

    this.route.params.subscribe((params: Params)=>
    {
      this.vendor = params["vendor"];
      
      if (this.vendor == 'sews') this.style = 'danger';
      else this.style = 'primary';

      this.context.getOneEngine(params["id"], params["vendor"]).subscribe(engine => {
        this.engine = engine;
        this.powers = this.context.getPower();

        this.form = new FormGroup({
          cost: new FormControl(this.engine?.cost, [Validators.min(10), Validators.required]),
          power: new FormControl(this.engine.power),
          course: new FormControl(USD, [Validators.required])
        });
      });
    }); 
  }

  submit()
  {
    if(this.engine)
    {
      this.engine.power = this.form.value.power;
      this.engine.cost = this.calculateToUSD();
      this.context.updateEngine(this.engine, this.vendor).subscribe(()=>{this.router.navigate([`work/allengines`]);});
    }   
  }

  private calculateToUSD(){
    let indexUSD = this.courses.findIndex(c => c.ccy == 'USD');
    let courseUSD = Number(this.courses[indexUSD].sale);
    let courseSelected = Number(this.form.value.course);
    return Math.trunc((this.form.value.cost * courseSelected) / courseUSD);
  }

  redirectToAllEngines()
  {
    this.router.navigate([`work/allengines`]);
  }

  getIsSelected(name: string) {
    if (name == 'USD') {
      return true;
    }
    return false;
  }


}
