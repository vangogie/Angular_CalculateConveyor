import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engine } from '../models/engine';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private http: HttpClient) { }
  
  public get connectionString() : string {
    return `https://localhost:44348/api`;
    //return `https://conveyor.user15860.realhost-free.net/api`
  }

}
