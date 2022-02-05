import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Engine } from 'src/app/models/engine';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EngineContextService } from 'src/app/services/engine-context.service';

@Component({
  selector: 'app-all-engines',
  templateUrl: './all-engines.component.html',
  styleUrls: ['./all-engines.component.css']
})
export class AllEnginesComponent implements OnInit {

  public engines: Engine[] = [];
  public vendor: string = 'sews';
  public style: string = 'danger';
  public powers: number[] = [];
  public selectedPower?: number;
  private sews: Engine[] = [];
  private motovarios: Engine[] = [];

  constructor(
    public context:EngineContextService,
    private authGuardService: AuthGuardService, 
    private router: Router) {
    this.powers = context.getPower();
    this.selectedPower = 0;
    context.context.validate().subscribe(()=>authGuardService.canActivate());
   }

  ngOnInit(): void {
    this.context.getEngines('sews').subscribe(data => {
      this.engines = data;
      this.sews = data;
    });

    this.context.getEngines('motovarios').subscribe(data => {
      this.motovarios = data;
    });
  }

  editEngine(id: any): void
  {
    this.router.navigate([`work/edit/${this.vendor}/${id}`]);
  }

  deleteEngine(id: any, cost: any, power: any): void
  {
    this.router.navigate([`work/delete/${this.vendor}/${id}/${cost}/${power}`]);
  }

  onEngineSelected(event: any){
    if(event.target.value == 'sews'){
      if (this.selectedPower == 0) this.engines = this.sews;
      else this.engines = this.sews.filter(e => e.power == this.selectedPower);
      this.style = 'danger';
    }
    else{
      if (this.selectedPower == 0) this.engines = this.motovarios;
      else this.engines = this.motovarios.filter(e => e.power == this.selectedPower);
      this.style = 'primary'
    }
    this.vendor = event.target.value;
  }

  onPowerSelected(event: any){
    this.selectedPower = event.target.value;
    if (this.vendor == 'sews') {
      if (event.target.value == 0) this.engines = this.sews;
      else this.engines = this.sews.filter(e=>e.power == this.selectedPower);
    }
    else {
      if (event.target.value == 0) this.engines = this.motovarios;
      else this.engines = this.motovarios.filter(e=>e.power == this.selectedPower);
    }   
  }

  addNewEngine(){
    this.router.navigate([`work/addengine`]);
  }

}
