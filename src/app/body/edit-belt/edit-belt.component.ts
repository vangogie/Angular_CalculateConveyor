import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Belt } from 'src/app/models/belt';
import { BeltType } from 'src/app/models/belt-type';
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


  constructor(
    public belttypescontext:BeltTypesContextService,
    public beltcontext: BeltContextService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.belttypescontext.get().subscribe(beltTypes => {
      this.beltTypes = beltTypes;
    });

    this.form = new FormGroup({
      belttype: new FormControl(),
      name: new FormControl(),
      cost: new FormControl()
    });
    
    this.route.params.subscribe((params: Params)=>
    {
      let id = params["id"];
      this.beltcontext.getOne(id).subscribe(onebelt => {
        this.belt = onebelt;
        this.form = new FormGroup({
          belttype: new FormControl(this.belt.beltType.id),
          name: new FormControl(this.belt.name, [Validators.minLength(3), Validators.maxLength(50)]),
          cost: new FormControl(this.belt.cost, [Validators.min(10), Validators.required])
        });

      });
    });
    
  }


  submit()
  {
    if(this.belt)
    {
      this.belt.name = this.form.value.name;
      this.belt.cost = Math.trunc(this.form.value.cost);
      this.beltcontext.update(this.belt).subscribe(()=>{this.router.navigate([`allbelts`]);});
    }   
  }

  redirectToAllBelts()
  {
    this.router.navigate([`allbelts`]);
  }

}
