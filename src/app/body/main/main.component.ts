import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public context: ContextService,
    private authGuardService: AuthGuardService,) { 
    context.validate().subscribe(()=>authGuardService.canActivate());
  }

  ngOnInit(): void {
  }

}
