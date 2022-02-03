import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConveyorCostAnswer } from '../models/conveyor-cost-answer';
import { ConveyorDataModel } from '../models/conveyor-data-model';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root'
})
export class ConveyorCalculateContextService {
  
  private connectionString?: string;

  constructor(private http: HttpClient, public context:ContextService) {
    this.connectionString = context.connectionString;
   }

   calculate(conveyor: ConveyorDataModel): Observable<ConveyorCostAnswer>{
    return this.http.post<ConveyorCostAnswer>(`${this.connectionString}/conveyorcalculate`, conveyor);
  }
}
