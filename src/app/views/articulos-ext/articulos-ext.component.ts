import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../services/authentication/auth.service';
import { ArticulosExtService } from '../../services/articulos-ext.service';
import { ArticuloExt, PaginatedList, Proveedor } from '../../models/model-Db';

@Component({
  selector: 'app-articulos-ext',
  imports: [],
  templateUrl: './articulos-ext.component.html',
  styleUrl: './articulos-ext.component.scss'
})
export class ArticulosExtComponent {

  private readonly route = inject(ActivatedRoute);
  private getDataservice = inject(ArticulosExtService);

  page: number = 0;
  pageSize: number = 0;

  TotalItems:number = 0;
  Items: ArticuloExt[] = [];

  paginatedList: PaginatedList | undefined;

  ngOnInit() {
    this. onGetArticulosExt();
  }

    constructor() { }
  
    onGetArticulosExt() {
      this.getDataservice.GetArticulos(this.page, this.pageSize).subscribe((response) => {
        console.log('ArticlesEXTComponent', response);
        this.paginatedList = response;
        if(this.paginatedList != undefined) { 
          this.Items = this.paginatedList.Items as ArticuloExt[]; ;
        }

        if(this.Items != undefined) {
          this.TotalItems = this.Items.length;
        }

  
      }, (error) => {
        console.error('ArticulosAuth No', error);
        console.warn('Tienes el token ', localStorage.getItem("authtoken"));
      });
    }
}
