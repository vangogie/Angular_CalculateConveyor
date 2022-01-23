import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BeltType } from '../models/belt-type';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root'
})
export class BaseContextService {

  private connectionString?: string;

  constructor(private http: HttpClient, public context:ContextService) {
    this.connectionString = context.connectionString;
   }

  getBelts(): Observable<BeltType[]>{
    return this.http.get<BeltType[]>(`${this.connectionString}/belttypes`);
  }

  
}
