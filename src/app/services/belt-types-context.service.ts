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

  getOne(id: number): Observable<BeltType>{
    return this.http.get<BeltType>(`${this.connectionString}/belttypes/${id}`);
  }

  add(beltType: any): Observable<Boolean>{
    return this.http.post<Boolean>(`${this.connectionString}/belttypes`, beltType);
  }

  update(beltType: BeltType): Observable<Boolean>{
    return this.http.patch<Boolean>(`${this.connectionString}/belttypes`, beltType);
  }

  delete(id: number): Observable<Boolean>{
    return this.http.get<Boolean>(`${this.connectionString}/belttypes/delete/${id}`);
  }
}
