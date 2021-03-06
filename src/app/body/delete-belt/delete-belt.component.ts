import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BeltContextService } from 'src/app/services/belt-context.service';

@Component({
  selector: 'app-delete-belt',
  templateUrl: './delete-belt.component.html',
  styleUrls: ['./delete-belt.component.css']
})
export class DeleteBeltComponent implements OnInit {

  private id: number = -1;
  public beltName: string = '';

  constructor(
    public beltcontext: BeltContextService, 
    public route:ActivatedRoute,
    private authGuardService: AuthGuardService, 
    private router: Router) {
      beltcontext.context.validate().subscribe(()=>authGuardService.canActivate());
     }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>
    {
      this.id = params["id"];
      this.beltName = params["name"];
    });
  }

  deleteBelt(){
    this.beltcontext.delete(this.id).subscribe(() => this.router.navigate([`work/delete_success/allbelts`]));
  }

  redirectToAllBelts(){
    this.router.navigate([`work/allbelts`]);
  }

}
