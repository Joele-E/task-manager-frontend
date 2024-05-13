import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/User';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:8080/api';
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject(
    sessionStorage.getItem('id_token') ? true : false
  );
  constructor(private http: HttpClient) {}

  authenticate(body: Partial<User>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body).pipe(
      map((res) => {
        this.setSession(res);
        return res;
      })
    );
  }
  setSession(res: AuthResponse) {
    sessionStorage.setItem('id_token', res.token);
    this.isLogged.next(true);
  }
  isLoggedIn(): boolean {
    //TODO validate token
    return sessionStorage.getItem('id_token') ? true : false;
  }
  logout() {
    sessionStorage.removeItem('id_token');
    this.isLogged.next(false);
  }
}
