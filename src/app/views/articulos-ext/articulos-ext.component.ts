import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService } from '../../services/data-base.service';
import { ArticuloExt, PaginatedList, Proveedor } from '../../models/model-Db';

@Component({
  selector: 'app-articulos-ext',
  imports: [],
  templateUrl: './articulos-ext.component.html',
  styleUrl: './articulos-ext.component.scss'
})
export class ArticulosExtComponent {

  private readonly router = inject(Router);
  private dataservice = inject(DataBaseService);

  currentPage: number = 1;
  pageSize: number = 3;

  TotalItems:number = 0;
  Items: ArticuloExt[] = [];

  pages: number[] = [];

  paginatedList: PaginatedList | undefined;

  ngOnInit() {
    this.onGetArticulosExt(this.currentPage);
  }

    constructor() { }

  onGetArticulosExt(pageIndex:number) {

    this.currentPage = pageIndex;

    this.dataservice.GetArticulosExt(this.currentPage, this.pageSize).subscribe((response) => {
      console.log('ArticlesEXTComponent', response);
      this.paginatedList = response;
      if(this.paginatedList != undefined) {
        this.Items = this.paginatedList.Items as ArticuloExt[]; ;

        if(this.Items != undefined) {
          this.TotalItems = this.paginatedList.TotalItemsCount;

          if (this.TotalItems % this.pageSize === 0) {
            this.pages = new Array(this.TotalItems / this.pageSize);
          } else {
            this.pages = new Array(Math.floor(this.TotalItems / this.pageSize) + 1);
          }

          for(let i = 0; i < this.pages.length; i++) {
            this.pages[i] = i + 1;
          }
          console.log('Pages', this.pages);
        }
      }

    }, (error) => {
      console.error('ArticulosAuth No', error);
      console.warn('Tienes el token ', localStorage.getItem("authtoken"));
    });
  }

  navigateToArticulos(indexArticuloExt?: number) {
    if(indexArticuloExt) this.router.navigate(['/mainpage/articulos/' + indexArticuloExt]);
    else this.router.navigate(['/mainpage/articulos']);
  }

  updatePageSize(pgSz: number){
    this.pageSize = pgSz;
    this.onGetArticulosExt(1);
  }
}
