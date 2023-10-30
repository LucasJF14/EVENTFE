import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Auth} from "../model/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/token'

  constructor(private http: HttpClient) {}

  login(user: Auth): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic' + btoa(user.username + ':' + user.password)
    });

    return this.http.post<any>(this.url, null, {headers, observe: 'response'}).pipe(
      tap((response: any) => this.setToken(response.headers.get("Authorization")))
    )
  }

  logout(): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    this.http.delete(this.url, { headers: headers })
      .subscribe(
        response => console.log('Logout successful'),
        error => console.error('Logout failed', error)
      );

    return this.http.delete(this.url, {});
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }
}
