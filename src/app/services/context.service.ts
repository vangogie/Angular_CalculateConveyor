import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engine } from '../models/engine';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  //private connectionString = `https://conveyor.user15860.realhost-free.net/api`;
  private connectionString = `https://localhost:44348/api`;
  constructor(private http: HttpClient) { }


  //Engine
  getPower(){
    return [ 0.06, 0.09, 0.12, 0.18, 0.25, 0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3.7, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250, 315, 400 ];
  }

  getEngines(engine: string): Observable<Engine[]>{
    return this.http.get<Engine[]>(`${this.connectionString}/${engine}`);
  }

  addEngine(sew: Engine, engine: string): Observable<Boolean>{
    return this.http.post<Boolean>(`${this.connectionString}/${engine}`, {Cost: sew.cost, Power: sew.power});
  }

  getOneEngine(id: number, engine: string): Observable<Engine>{
    return this.http.get<Engine>(`${this.connectionString}/${engine}/${id}`);
  }

  updateEngine(sew: Engine, engine: string): Observable<Boolean>{
    return this.http.patch<Boolean>(`${this.connectionString}/${engine}`, {Id: sew.id, Cost: sew.cost, Power: sew.power});
  }

  deleteEngine(id: number, engine: string): Observable<Boolean>{
    return this.http.get<Boolean>(`${this.connectionString}/${engine}/delete/${id}`);
  }
}
