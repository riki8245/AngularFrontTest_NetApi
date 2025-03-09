import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosExtService {
  private URLbase = environment.apiURL;
  private API_ARTICULOSEXT: string = "/api/siglasauth/articulosext";

  constructor() { }

  private http = inject(HttpClient);

  private defaultPage: number = 1;
  private defaultPageSize: number = 5;

  articulosext: any;

  GetArticulos(page?: number, pageSize?: number): Observable<any> {
    const token = localStorage.getItem("authtoken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestBody = {
      pagingArgs: {
        page: page ? page : this.defaultPage,
        pageSize: pageSize ? pageSize : this.defaultPageSize
      }
    };

    return this.http.post<any>(this.URLbase + this.API_ARTICULOSEXT, requestBody, { headers }).pipe(
      tap((response) => {
        if (response) this.articulosext = response;
        console.log('ArticulosExtService: ', response);
      })
    );
  }
}
