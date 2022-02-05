import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-calculale',
  templateUrl: './calculale.component.html',
  styleUrls: ['./calculale.component.css']
})
export class CalculaleComponent implements OnInit {

  constructor(
    private router: Router,
    private authGuardService: AuthGuardService,
    private context: ContextService) {
      context.validate().subscribe(()=>authGuardService.canActivate());
     }

  ngOnInit(): void {
  }

  calcStraight(){
    this.router.navigate([`work/calculatestraightconveyor`]);
  }

}
