import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';
  private connectionString?: string;

  constructor(private http: HttpClient, public context:ContextService) {
    this.connectionString = context.connectionString;
   }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken('')
    localStorage.clear()
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.connectionString}/auth/login`, user).pipe(tap(({ token }) => {
      localStorage.setItem('auth-token', token)
      this.setToken(token)
    }))
  }

  get(): Observable<User[]>{
    return this.http.get<User[]>(`${this.connectionString}/auth`);
  }

  add(user: User): Observable<boolean>{
    return this.http.post<boolean>(`${this.connectionString}/auth/adduser`, user);
  }

  update(user: User): Observable<boolean>{
    return this.http.patch<boolean>(`${this.connectionString}/auth`, user);
  }

  delete(id: number): Observable<Boolean>{
    return this.http.get<Boolean>(`${this.connectionString}/auth/delete/${id}`);
  }

}
