import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engine } from '../models/engine';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private http: HttpClient) { }
  
  public get connectionString() : string {
    return `https://localhost:44348/api`;
    //return `https://conveyor.user15860.realhost-free.net/api`
  }

  public get privatBankAPI() : string {
    return 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  }

  getCourse(): Observable<Course[]>{
    let headers = new HttpHeaders();
    return this.http.get<Course[]>(this.privatBankAPI, {headers: headers});
  }

  validate():Observable<boolean>{
    return this.http.post<boolean>(`${this.connectionString}/auth/validate`, null);
  }


}
