import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeltType } from 'src/app/models/belt-type';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';

@Component({
  selector: 'app-all-belt-types',
  templateUrl: './all-belt-types.component.html',
  styleUrls: ['./all-belt-types.component.css']
})
export class AllBeltTypesComponent implements OnInit {

  public beltTypes: BeltType[] = [];

  constructor(
    public belttypescontext:BeltTypesContextService,
    private router: Router) { }

  ngOnInit(): void {
    this.belttypescontext.get().subscribe(beltTypes => {
      this.beltTypes = beltTypes;
    });
  }

  addNewBeltType(){
    this.router.navigate([`addbelttype`]);
  }

  editBeltType(id: any){
    this.router.navigate([`editbelttype/${id}`]);
  }

  deleteBeltType(id: any, type: string){
    this.router.navigate([`deletebelttype/${id}/${type}`]);
  }

}
