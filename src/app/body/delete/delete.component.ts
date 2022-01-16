import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Engine } from 'src/app/models/engine';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public engine?: Engine;
  public vendor: string='';
  public style: string = 'danger';

  constructor(public context:ContextService, public route:ActivatedRoute, private router: Router) { }

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
    this.context.deleteEngine(this.engine.id, this.vendor).subscribe(()=>{this.router.navigate([`delete_success`]);});
  }

  redirectToAllEngines()
  {
    this.router.navigate([`allengines`]);
  }
}
