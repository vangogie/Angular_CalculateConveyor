import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Belt } from 'src/app/models/belt';
import { BeltType } from 'src/app/models/belt-type';
import { Course } from 'src/app/models/course';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BeltContextService } from 'src/app/services/belt-context.service';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';

@Component({
  selector: 'app-edit-belt',
  templateUrl: './edit-belt.component.html',
  styleUrls: ['./edit-belt.component.css']
})
export class EditBeltComponent implements OnInit {

  public beltTypes: BeltType[] = [];
  private belt?: Belt;
  form!: FormGroup;
  public courses: Course[] = [];


  constructor(
    public belttypescontext:BeltTypesContextService,
    public beltcontext: BeltContextService,
    public route: ActivatedRoute,
    private authGuardService: AuthGuardService,
    private router: Router) {
      beltcontext.context.validate().subscribe(()=>authGuardService.canActivate());
     }

  ngOnInit(): void {
    this.belttypescontext.get().subscribe(beltTypes => {
      this.beltTypes = beltTypes;
    });

    let USD: number;
    this.beltcontext.context.getCourse().subscribe(data => {
      this.courses = data;
      let uah: Course = {ccy: 'UAH', base_ccy: 'UAH', buy: 1, sale: 1 };
      this.courses.push(uah);

      let indexUSD = this.courses.findIndex(c => c.ccy == 'USD');
      USD = this.courses[indexUSD].sale;
  });

    this.form = new FormGroup({
      belttype: new FormControl(),
      name: new FormControl(),
      cost: new FormControl(),
      course: new FormControl()
    });
    
    this.route.params.subscribe((params: Params)=>
    {
      let id = params["id"];
      this.beltcontext.getOne(id).subscribe(onebelt => {
        this.belt = onebelt;
        this.form = new FormGroup({
          belttype: new FormControl(this.belt.beltType.id),
          name: new FormControl(this.belt.name, [Validators.minLength(3), Validators.maxLength(50)]),
          cost: new FormControl(this.belt.cost, [Validators.min(10), Validators.required]),
          course: new FormControl(USD, [Validators.required])
        });
      });
    });
    
  }


  submit()
  {
    if(this.belt)
    {
      this.belt.name = this.form.value.name;
      this.belt.cost = this.calculateToUSD()
      this.beltcontext.update(this.belt).subscribe(()=>{this.router.navigate([`work/allbelts`]);});
    }   
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

  redirectToAllBelts()
  {
    this.router.navigate([`work/allbelts`]);
  }

}
