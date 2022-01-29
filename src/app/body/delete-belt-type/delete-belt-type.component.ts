import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>
    {
      this.id = params["id"];
      this.type = params["type"];
    });
  }

  deleteBeltType(){
    this.belttypescontext.delete(this.id).subscribe(data => {
      this.router.navigate([`delete_success/allbelttypes`])
    }, 
    error => {
      this.errorInfo = "Удаление невозможно, так как на объект ссылаются ленты!";
    }
    )
  }

  redirectToAllBeltTypes(){
    this.router.navigate([`allbelttypes`]);
  }

}
