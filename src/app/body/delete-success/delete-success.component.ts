import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-delete-success',
  templateUrl: './delete-success.component.html',
  styleUrls: ['./delete-success.component.css']
})
export class DeleteSuccessComponent implements OnInit {

  private nextroute = '';


  constructor(public route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>
    {
      this.nextroute = params["nextroute"];
    });
  }

  redirectToAllEngines()
  {
    this.router.navigate([this.nextroute]);
  }
}
