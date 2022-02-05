import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';

@Component({
  selector: 'app-delete-belt-type',
  templateUrl: './delete-belt-type.component.html',
  styleUrls: ['./delete-belt-type.component.css']
})
export class DeleteBeltTypeComponent implements OnInit {

  private id: number = -1;
  public type: string = '';
  public errorInfo = "";

  constructor(
    public belttypescontext:BeltTypesContextService,
    public route:ActivatedRoute, 
    private authGuardService: AuthGuardService,
    private router: Router
  ) {
    belttypescontext.context.validate().subscribe(()=>authGuardService.canActivate());
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>
    {
      this.id = params["id"];
      this.type = params["type"];
    });
  }

  deleteBeltType(){
    this.belttypescontext.delete(this.id).subscribe(data => {
      this.router.navigate([`work/delete_success/allbelttypes`])
    }, 
    error => {
      this.errorInfo = "Удаление невозможно, так как на объект ссылаются ленты!";
    }
    )
  }

  redirectToAllBeltTypes(){
    this.router.navigate([`work/allbelttypes`]);
  }

}
