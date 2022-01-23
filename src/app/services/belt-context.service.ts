import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Belt } from '../models/belt';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root'
})
export class BeltContextService {

  private connectionString?: string;

  constructor(private http: HttpClient, public context:ContextService) {
    this.connectionString = context.connectionString;
   }

  get(): Observable<Belt[]>{
    return this.http.get<Belt[]>(`${this.connectionString}/ConveyorBelts`);
  }

  getOne(id: number): Observable<Belt>{
    return this.http.get<Belt>(`${this.connectionString}/ConveyorBelts/${id}`);
  }

  add(belt: any): Observable<Boolean>{
    return this.http.post<Boolean>(`${this.connectionString}/ConveyorBelts`, belt);
  }

  update(belt: Belt): Observable<Boolean>{
    return this.http.patch<Boolean>(`${this.connectionString}/ConveyorBelts`, belt);
  }

  delete(id: number): Observable<Boolean>{
    return this.http.get<Boolean>(`${this.connectionString}/ConveyorBelts/delete/${id}`);
  }
}
