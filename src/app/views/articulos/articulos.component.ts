import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Articulo, ArticuloExt, PaginatedList, Proveedor} from '../../models/model-Db';
import { DataBaseService } from '../../services/data-base.service';
import { CommonModule } from '@angular/common';

export interface proveedoresFilter{
  proveedor : Proveedor,
  selected: boolean
}

@Component({
  selector: 'app-articulos',
  imports: [CommonModule],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent
{
  private readonly route = inject(ActivatedRoute);
  private dataService = inject(DataBaseService);

  paginatedList: PaginatedList | undefined;

  currentPage: number = 1;
  pageSize: number = 100;
  pages: number[] = [];

  TotalItems:number = 0;
  Items: Articulo[] = [];

  articleExt: ArticuloExt | undefined;

  currentProveedoresForArticles: number[] = []; 
  proveedoresSelected: proveedoresFilter[] = []

  ngOnInit() {
    this.initializeVariables();

    this.route.paramMap.subscribe(params => {
      const IdArticleExt = params.get('id');
      if (IdArticleExt) {
        this.getArticuloExtById(IdArticleExt);

        this.onGetArticulos(this.currentPage, "x => x.articuloExt_Id == " + IdArticleExt);
      }
      else{
        this.onGetArticulos(this.currentPage);
      }
    });
  }

  private initializeVariables(): void{
    this.articleExt = undefined;
    this.currentProveedoresForArticles = [];
    this.proveedoresSelected = []
    this.pages = [];
    this.TotalItems = 0;
    this.Items = [];
  }

  constructor() { }

  getArticuloExtById(id: string): void {
    this.dataService.GetArticuloExtById(id).subscribe(response => {
      this.articleExt = response;
    });
  }

  onGetArticulos(pageIndex:number, filter?: string) {

    this.currentPage = pageIndex;

    if(filter){
      this.dataService.GetArticulos(this.currentPage, this.pageSize, filter).subscribe((response) => {
        console.log('ArticlesComponent', response);
        this.paginatedList = response;
        if(this.paginatedList != undefined) {
          this.Items = this.paginatedList.Items as Articulo[];

          if(this.Items != undefined) {
            this.TotalItems = this.paginatedList.TotalItemsCount;
            this.pages = new Array(Math.round(this.TotalItems / this.pageSize));
            for(let i = 0; i < this.pages.length; i++) {
              this.pages[i] = i + 1;
            }
            console.log('Pages', this.pages);
          }
        }

        if(this.proveedoresSelected.length == 0 ) this.getProveedoresForArticles();

      }, (error) => {
        console.error('ArticulosAuth No', error);
      });
    }
    else{
      this.dataService.GetArticulos(this.currentPage, this.pageSize).subscribe((response) => {
        console.log('ArticlesComponent', response);
        this.paginatedList = response;
        if(this.paginatedList != undefined) {
          this.Items = this.paginatedList.Items as Articulo[];

          if(this.Items != undefined) {
            this.TotalItems = this.paginatedList.TotalItemsCount;
            this.pages = new Array(Math.round(this.TotalItems / this.pageSize));
            for(let i = 0; i < this.pages.length; i++) {
              this.pages[i] = i + 1;
            }
            console.log('Pages', this.pages);
          }
        }

        if(this.proveedoresSelected.length == 0 ) this.getProveedoresForArticles();

      }, (error) => {
        console.error('ArticulosAuth No', error);
        console.warn('Tienes el token ', localStorage.getItem("authtoken"));
      });
    }


  }

  onGetProveedores(){
    if(this.proveedoresSelected.length > 0) return

    let filterExpProveedores = "x => ";

    for(let i = 0; i < this.currentProveedoresForArticles.length; i++){
      if( i != this.currentProveedoresForArticles.length - 1){
        filterExpProveedores += "x.Id == " + this.currentProveedoresForArticles[i] + " || "
      }else{
        filterExpProveedores += "x.Id == " + this.currentProveedoresForArticles[i];
      }
    }
    
    this.dataService.GetProveedores(1, 100, filterExpProveedores).subscribe((response) => {
      this.paginatedList = response;
      if(this.paginatedList != undefined) {
        this.paginatedList.Items.forEach(proveedorItem => {
            this.proveedoresSelected.push({
            proveedor: proveedorItem as Proveedor,
            selected: false
            });
        });

        console.log('Proveedores', this.proveedoresSelected);
      }

    }, (error) => {
      console.error('Get Proveedores Failed', error);
    });
  
  }

  getProveedoresForArticles(){
    this.currentProveedoresForArticles = [];

    this.Items.forEach(item => {
      if(item && item.proveedor_Id){
        if (!this.currentProveedoresForArticles.includes(item.proveedor_Id)) {
        this.currentProveedoresForArticles.push(item.proveedor_Id);
        }
      }
    });

    console.log("ProveedoresIDs", this.currentProveedoresForArticles);
  }

  onProveedorFiltered(proveedorId: number, inFilter: boolean) {
     
    for(let i = 0; i < this.proveedoresSelected.length; i++){
      if(this.proveedoresSelected[i].proveedor.id === proveedorId){
        this.proveedoresSelected[i].selected = inFilter;
      }
    }
    const selectedFilter = this.proveedoresSelected.filter(proveedor => proveedor.selected);

    let filterExpArticles = this.articleExt || selectedFilter.length > 0?  "x => " : "";
    
    if(this.articleExt){
      filterExpArticles += "x.articuloExt_Id == " + this.articleExt.id;
      if(selectedFilter.length > 0){
        filterExpArticles += " && ";
      }
    }

    for(let i = 0; i < selectedFilter.length; i++){
      if( i != selectedFilter.length - 1){
        filterExpArticles += "x.proveedor_Id == " + selectedFilter[i].proveedor.id + " || "
      }else{
        filterExpArticles += "x.proveedor_Id == " + selectedFilter[i].proveedor.id;
      }
    }

    if(filterExpArticles == "") this.onGetArticulos(this.currentPage);
    else this.onGetArticulos(this.currentPage, filterExpArticles);
  }
}
