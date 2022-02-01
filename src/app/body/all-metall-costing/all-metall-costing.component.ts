import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetallCosting } from 'src/app/models/metall-costing';
import { MetallCostingContextService } from 'src/app/services/metall-costing-context.service';

@Component({
  selector: 'app-all-metall-costing',
  templateUrl: './all-metall-costing.component.html',
  styleUrls: ['./all-metall-costing.component.css']
})
export class AllMetallCostingComponent implements OnInit {

  public metallCostings: MetallCosting[] = [];

  constructor(
    public metallCostingContextService: MetallCostingContextService,
    private router: Router) { }

  ngOnInit(): void {
    this.metallCostingContextService.get().subscribe(metallCostings =>{
      this.metallCostings = metallCostings;
    });
  }

  editMetallCosting(id: any){
    this.router.navigate([`editmetallcosting/${id}`]);
  }

}
