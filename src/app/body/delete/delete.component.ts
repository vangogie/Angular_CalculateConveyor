import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Engine } from 'src/app/models/engine';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EngineContextService } from 'src/app/services/engine-context.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public engine?: Engine;
  public vendor: string='';
  public style: string = 'danger';

  constructor(
    public context:EngineContextService, 
    public route:ActivatedRoute, 
    private authGuardService: AuthGuardService,
    private router: Router) {
      context.context.validate().subscribe(()=>authGuardService.canActivate());
     }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>
    {
      this.engine = {
        id: params["id"],
        power: params["power"],
        cost: params["cost"]
      }
      this.vendor = params["vendor"];
      if(this.vendor == 'sews'){
        this.style = 'danger';
      }
      else{
        this.style = 'primary'
      }
    });
  }

  deleteEngine(){
    if(this.engine)
    if(this.engine.id)
    this.context.deleteEngine(this.engine.id, this.vendor).subscribe(()=>{this.router.navigate([`work/delete_success/allengines`]);});
  }

  redirectToAllEngines()
  {
    this.router.navigate([`work/allengines`]);
  }
}
