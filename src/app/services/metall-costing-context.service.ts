import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetallCosting } from '../models/metall-costing';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root'
})
export class MetallCostingContextService {

  private connectionString?: string;
  constructor(private http: HttpClient, public context:ContextService) {
    this.connectionString = context.connectionString;
   }

  get(): Observable<MetallCosting[]>{
    return this.http.get<MetallCosting[]>(`${this.connectionString}/metallcostings`);
  }

  getOne(id: number): Observable<MetallCosting>{
    return this.http.get<MetallCosting>(`${this.connectionString}/metallcostings/${id}`);
  }

  update(metallCosting: MetallCosting): Observable<Boolean>{
    return this.http.patch<Boolean>(`${this.connectionString}/metallcostings`, metallCosting);
  }
}
