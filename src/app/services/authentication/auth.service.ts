import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URLbase = environment.apiURL;
  private API_AUTH: string = "/api/auth/login";

  private tokenKey = 'authtoken';
  private usernameKey = 'username';

  private http = inject(HttpClient);

  private usernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  username$ = this.usernameSubject.asObservable();

  constructor() { }

  login$(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('login', username)
      .set('pass', password);

    return this.http.post<any>(this.URLbase + this.API_AUTH, {}, { params }).pipe(
      tap((response) => {
        const token = response.userToken;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem(this.usernameKey, username);
          this.usernameSubject.next(username); // Update the username
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    this.usernameSubject.next(null); 
  }
}
