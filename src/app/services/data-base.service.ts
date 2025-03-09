import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ArticuloExt, PaginatedList } from '../models/model-Db';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private URLbase = environment.apiURL;
  private API_ARTICULOSEXT: string = "/api/siglasauth/articulosext";
  private API_ARTICULOS: string = "/api/siglasauth/articulos";

  constructor() { }

  private http = inject(HttpClient);

  private defaultPage: number = 1;
  private defaultPageSize: number = 4;

  GetArticulosExt(page?: number, pageSize?: number): Observable<PaginatedList> {
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

    return this.http.post<any>(this.URLbase + this.API_ARTICULOSEXT, requestBody, { headers });
  }

  GetArticulos(page?: number, pageSize?: number, filter?: string): Observable<PaginatedList> {
    const token = localStorage.getItem("authtoken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let requestBody = {};

    if(filter){
      requestBody = {
        filterExpression: filter,
        pagingArgs: {
          page: page ? page : this.defaultPage,
          pageSize: pageSize ? pageSize : this.defaultPageSize
        }
      };
    }
    else{
      requestBody = {
        pagingArgs: {
          page: page ? page : this.defaultPage,
          pageSize: pageSize ? pageSize : this.defaultPageSize
        }
      };
    }


    return this.http.post<any>(this.URLbase + this.API_ARTICULOS, requestBody, { headers });
  }

  GetArticleExtById(id: string): Observable<PaginatedList> {
    const token = localStorage.getItem("authtoken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestBody = {
      filterExpression: "x => x.Id == " + id,
      pagingArgs: {
        page: this.defaultPage,
        pageSize: this.defaultPageSize
      }
    };

    return this.http.post<any>(this.URLbase + this.API_ARTICULOSEXT, requestBody, { headers });
  }
}
