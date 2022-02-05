import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeltType } from 'src/app/models/belt-type';
import { ConveyorCostAnswer } from 'src/app/models/conveyor-cost-answer';
import { ConveyorDataModel } from 'src/app/models/conveyor-data-model';
import { MetallCosting } from 'src/app/models/metall-costing';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';
import { ConveyorCalculateContextService } from 'src/app/services/conveyor-calculate-context.service';
import { MetallCostingContextService } from 'src/app/services/metall-costing-context.service';

@Component({
  selector: 'app-calculale-straight-conveyor',
  templateUrl: './calculale-straight-conveyor.component.html',
  styleUrls: ['./calculale-straight-conveyor.component.css']
})
export class CalculateStraightConveyorComponent implements OnInit {

  public beltTypes: BeltType[] = [];
  public metallCostings: MetallCosting[] = [];
  public form!: FormGroup;
  public currentAngle = 0;
  public conveyorCostAnswer?: ConveyorCostAnswer;

  constructor(
    public belttypescontext:BeltTypesContextService,
    public metallCostingContextService: MetallCostingContextService,
    private authGuardService: AuthGuardService,
    public conveyorCalculateContextService: ConveyorCalculateContextService,
    private router: Router
  ) {
    belttypescontext.context.validate().subscribe(()=>authGuardService.canActivate());
    this.form = new FormGroup({
      clength: new FormControl([Validators.required]),
      width: new FormControl([Validators.required]),
      speed: new FormControl([Validators.required]),
      speedUnits: new FormControl([Validators.required]),
      mass: new FormControl([Validators.required]),
      angle: new FormControl([Validators.required]),
      enginetype: new FormControl([Validators.required]),
      beltType: new FormControl([Validators.required]),
      conveyorMaterial: new FormControl([Validators.required]),
      hasFrame: new FormControl(false, [Validators.required]),
      frameMaterial: new FormControl([Validators.required]),
      frameHeight: new FormControl([Validators.required]),
    });
   }

  ngOnInit(): void {
    
    this.metallCostingContextService.get().subscribe(metall => {
      this.metallCostings = metall;
    
    this.belttypescontext.get().subscribe(beltTypes => {
      this.beltTypes = beltTypes;

      this.form = new FormGroup({
        clength: new FormControl(4500, [Validators.min(300), Validators.required]),
        width: new FormControl(1200, [Validators.min(50), Validators.required]),
        speed: new FormControl(0.8, [Validators.min(0.01), Validators.required]),
        speedUnits: new FormControl(1),
        mass: new FormControl(8.5, [Validators.min(0.01), Validators.required]),
        angle: new FormControl(0, [Validators.required]),
        enginetype: new FormControl("Sew", [Validators.required]),
        beltType: new FormControl(this.beltTypes[0].type, [Validators.required]),
        conveyorMaterial: new FormControl(this.metallCostings[0].name, [Validators.required]),
        hasFrame: new FormControl(false),
        frameMaterial: new FormControl(this.metallCostings[0].name, [Validators.required]),
        frameHeight: new FormControl(750, [Validators.min(100), Validators.required]),
      });
    });
  });
  }

  submit()
  {
    let conveyorDataModel: ConveyorDataModel = {
      length: Math.trunc(this.form.value.clength),
      width: Math.trunc(this.form.value.width),
      speed: this.form.value.speed*this.form.value.speedUnits,
      mass: this.form.value.mass,
      angle: this.form.value.angle,
      beltType: this.form.value.beltType,
      enginetype: this.form.value.enginetype, 
      conveyorMaterial: this.form.value.conveyorMaterial, 
      hasFrame: this.form.value.hasFrame,
      frameMaterial: this.form.value.frameMaterial,
      frameHeight: this.form.value.frameHeight
    }

    this.conveyorCalculateContextService.calculate(conveyorDataModel).subscribe(data => {
      this.conveyorCostAnswer = data;
    });
  }

  toCalculate(){
    this.conveyorCostAnswer = undefined;
  }
}
