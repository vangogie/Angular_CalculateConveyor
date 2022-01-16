import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Engine } from 'src/app/models/engine';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-add-engine',
  templateUrl: './add-engine.component.html',
  styleUrls: ['./add-engine.component.css']
})
export class AddEngineComponent implements OnInit {
  form!: FormGroup;
  public style: string = 'danger';
  public powers: number[] = [];

  constructor(public context:ContextService, private router: Router) {
    this.powers = context.getPower();
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      vendor: new FormControl('sews'),
      cost: new FormControl('', [Validators.min(10), Validators.required]),
      power: new FormControl('0.37')
    });
  }

  submit()
  {
    let sew: Engine = {
      cost: Math.trunc(this.form.value.cost),
      power: this.form.value.power,
    }
    this.context.addEngine(sew, this.form.value.vendor).subscribe(()=>{this.router.navigate([`allengines`]);});
    
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
