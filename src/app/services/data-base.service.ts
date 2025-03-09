import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ArticuloExt, PaginatedList } from '../models/model-Db';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  //Esto se podría dividir en varios servicios, pero por comodidad y rapidez se ha hecho de esta forma.
  private URLbase = environment.apiURL;
  private API_ARTICULOSEXT: string = "/api/siglasauth/articulosext";
  private API_ARTICULOS: string = "/api/siglasauth/articulos";
  private API_PROVEEDORES: string = "/api/siglasauth/proveedores";

  constructor() { }

  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private defaultPage: number = 1;
  private defaultPageSize: number = 40;

  GetArticulosExt(page?: number, pageSize?: number): Observable<PaginatedList> {
    const token = this.auth.getToken();
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
    const token = this.auth.getToken();
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

  GetArticuloExtById(id: string): Observable<ArticuloExt> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const requestBody = {
      filterExpression: "x => x.Id == " + id,
      pagingArgs: {
        page: 1,
        pageSize: 1
      }
    };

    //I can do this because there is an unique identifier for each
    return this.http.post<any>(this.URLbase + this.API_ARTICULOSEXT, requestBody, { headers }).pipe(
      map(response => response.Items[0] as ArticuloExt)
    );
  }

  GetProveedores(page?: number, pageSize?: number, filter?: string): Observable<PaginatedList> {
    const token = this.auth.getToken();
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


    return this.http.post<any>(this.URLbase + this.API_PROVEEDORES, requestBody, { headers });
  }
}
