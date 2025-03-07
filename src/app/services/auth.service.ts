import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URLbase = environment.apiURL
  private API_AUTH: string = "/api/auth/login";

  private http = inject(HttpClient);

  //create a login function
  constructor() { }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('login', username)
      .set('pass', password);

    return this.http.post<any>(this.URLbase + this.API_AUTH,{}, { params });
  }
 

  logout():Observable<any> {
    throw new Error('Method not implemented.');
  }

 /* 
  logout() {
    // call the logout function from the auth service
    this.auth.logout().subscribe((response) => {
      console.log('Logout succesful', response);
      // handle the response  (remove the token, redirect to another page, etc)
      //redirect to authnticate page
      
      localStorage.removeItem('token');
    }, (error) => {
      console.error('Logout failed', error);
      // handle the error
    });
  }
    */
}
