import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Belt } from 'src/app/models/belt';
import { BeltType } from 'src/app/models/belt-type';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { BeltContextService } from 'src/app/services/belt-context.service';
import { BeltTypesContextService } from 'src/app/services/belt-types-context.service';

@Component({
  selector: 'app-all-belts',
  templateUrl: './all-belts.component.html',
  styleUrls: ['./all-belts.component.css']
})
export class AllBeltsComponent implements OnInit {

  public belts: Belt[] = [];
  public beltTypes: BeltType[] = [];
  public selectedBeltTypeId?: number;
  public beltsShow: Belt[] = [];

  constructor(
    public beltcontext:BeltContextService,
    public belttypescontext:BeltTypesContextService,
    private authGuardService: AuthGuardService,
    public authService: AuthService,
    private router: Router) {
      beltcontext.context.validate().subscribe(()=>authGuardService.canActivate());
     }

  ngOnInit(): void {
    this.belttypescontext.get().subscribe(belttypes => {
      this.beltTypes = belttypes;

      this.beltcontext.get().subscribe(data => {
        this.beltsShow = this.belts = data;
        this.selectedBeltTypeId = 0;
      });

    });
  }


  addNewBelt(){
    this.router.navigate([`work/addbelt`]);
  }

  editBelt(id: any){
    this.router.navigate([`work/editbelt/${id}`]);
  }

  deleteBelt(id: any, name: string){
    this.router.navigate([`work/deletebelt/${id}/${name}`]);
  }

  onBeltSelected(event: any){
    this.selectedBeltTypeId = event.target.value;
    if (this.selectedBeltTypeId == 0) this.beltsShow = this.belts;
    else this.beltsShow = this.belts.filter(b=>b.beltType.id == this.selectedBeltTypeId);
  }

}
