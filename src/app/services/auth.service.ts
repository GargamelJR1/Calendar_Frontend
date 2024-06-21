import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post('/api/auth/login', {
      email: email,
      password: password
    }).pipe(tap((response: any) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
    }));
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpClient.get('/api/auth/logout', { headers }).pipe(tap(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }));
  }

  register(email: string, password: string, lastName: string, firstName: string): Observable<any> {
    return this.httpClient.post('/api/auth/register', {
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password
    }).pipe(tap((response: any) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
    }));
  }

  getTokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }

  getEmailFromStorage(): string | null {
    return localStorage.getItem('email');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
