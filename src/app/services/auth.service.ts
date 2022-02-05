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
/*
  register(user: User) {
    return this.http.post<User>('/api/auth/register', user)
  }*/
}
