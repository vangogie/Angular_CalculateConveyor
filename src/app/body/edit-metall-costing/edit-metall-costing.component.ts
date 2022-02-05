import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { MetallCosting } from 'src/app/models/metall-costing';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MetallCostingContextService } from 'src/app/services/metall-costing-context.service';

@Component({
  selector: 'app-edit-metall-costing',
  templateUrl: './edit-metall-costing.component.html',
  styleUrls: ['./edit-metall-costing.component.css']
})
export class EditMetallCostingComponent implements OnInit {

  public metallCosting?: MetallCosting;
  public form!: FormGroup;
  public courses: Course[] = [];

  constructor(
    private context: MetallCostingContextService,  
    public route: ActivatedRoute,
    private authGuardService: AuthGuardService,
    private router: Router) {
      context.context.validate().subscribe(()=>authGuardService.canActivate());
     }

  ngOnInit(): void {
    this.form = new FormGroup({
      cost: new FormControl([Validators.required]),
      course: new FormControl([Validators.required])
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
      let id = params["id"];

      this.context.getOne(id).subscribe(data => {
        this.metallCosting = data;
        this.form = new FormGroup({
          cost: new FormControl(this.metallCosting.cost, [Validators.min(0.1), Validators.required]),
          course: new FormControl(USD, [Validators.required])
        });
      })
    });
  }

  submit()
  {
    if(this.metallCosting)
    {
      this.metallCosting.cost = this.calculateToUSD()
      this.context.update(this.metallCosting).subscribe(()=>{this.router.navigate([`work/allmetallcosting`]);});
    }   
  }

  redirectToAllMetallCosting(){
    this.router.navigate([`work/allmetallcosting`]);
  }

  private calculateToUSD(){
    let indexUSD = this.courses.findIndex(c => c.ccy == 'USD');
    let courseUSD = Number(this.courses[indexUSD].sale);
    let courseSelected = Number(this.form.value.course);
    return Number(((this.form.value.cost * courseSelected) / courseUSD).toFixed(2));
  }

  getIsSelected(name: string) {
    if (name == 'USD') {
      return true;
    }
    return false;
  }

}
