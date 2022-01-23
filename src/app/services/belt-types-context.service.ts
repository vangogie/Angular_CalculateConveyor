import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Belt } from '../models/belt';
import { BeltType } from '../models/belt-type';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root'
})
export class BeltTypesContextService {

  private connectionString?: string;

  constructor(private http: HttpClient, public context:ContextService) {
    this.connectionString = context.connectionString;
   }

  get(): Observable<BeltType[]>{
    return this.http.get<BeltType[]>(`${this.connectionString}/belttypes`);
  }

  

  
}
