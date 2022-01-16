import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Engine } from 'src/app/models/engine';
import { ContextService } from 'src/app/services/context.service';

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
  

  constructor(public context:ContextService, public route:ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit(): void {
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
          power: new FormControl(this.engine.power)
        });
      });
      
    });
  }

  submit()
  {
    if(this.engine)
    {
      this.engine.power = this.form.value.power;
      this.engine.cost = Math.trunc(this.form.value.cost);
      this.context.updateEngine(this.engine, this.vendor).subscribe(()=>{this.router.navigate([`allengines`]);});
    }   
  }

  redirectToAllEngines()
  {
    this.router.navigate([`allengines`]);
  }


}
