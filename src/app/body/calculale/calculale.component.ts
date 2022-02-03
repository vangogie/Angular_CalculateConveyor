import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculale',
  templateUrl: './calculale.component.html',
  styleUrls: ['./calculale.component.css']
})
export class CalculaleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  calcStraight(){
    this.router.navigate([`calculatestraightconveyor`]);
  }

}
