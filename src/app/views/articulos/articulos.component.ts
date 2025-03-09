import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo, ArticuloExt, PaginatedList } from '../../models/model-Db';
import { DataBaseService } from '../../services/data-base.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articulos',
  imports: [CommonModule],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent {
  private readonly route = inject(ActivatedRoute);
  private dataService = inject(DataBaseService);
  private cdr = inject(ChangeDetectorRef);

  articleExt: ArticuloExt | undefined;

  currentPage: number = 1;
  pageSize: number = 3;

  TotalItems:number = 0;
  Items: Articulo[] = [];

  pages: number[] = [];

  paginatedList: PaginatedList | undefined;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const IdArticleExt = params.get('id');
      console.log('IdArticleExt', IdArticleExt);
      if (IdArticleExt) {
        this.getArticuloExtById(IdArticleExt);

        this.onGetArticulos(this.currentPage, "x => x.articuloExt_Id == " + IdArticleExt);
      }
      else{
        this.onGetArticulos(this.currentPage);
      }
    });
  }

    constructor() { }

    getArticuloExtById(id: string): void {
      this.dataService.GetArticleExtById(id).subscribe(response => {
        this.articleExt = response.Items[0] as ArticuloExt;
        console.log('ArticleEXTComponent decomposed', this.articleExt);
        this.cdr.detectChanges();
      });
    }

    onGetArticulos(pageIndex:number, filter?: string) {

      this.currentPage = pageIndex;

      if(filter){
        this.dataService.GetArticulos(this.currentPage, this.pageSize, filter).subscribe((response) => {
          console.log('ArticlesComponent', response);
          this.paginatedList = response;
          if(this.paginatedList != undefined) {
            this.Items = this.paginatedList.Items as Articulo[]; ;
  
            if(this.Items != undefined) {
              this.TotalItems = this.paginatedList.TotalItemsCount;
              this.pages = new Array(Math.round(this.TotalItems / this.pageSize));
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
      else{
        this.dataService.GetArticulos(this.currentPage, this.pageSize).subscribe((response) => {
          console.log('ArticlesComponent', response);
          this.paginatedList = response;
          if(this.paginatedList != undefined) {
            this.Items = this.paginatedList.Items as Articulo[]; ;
  
            if(this.Items != undefined) {
              this.TotalItems = this.paginatedList.TotalItemsCount;
              this.pages = new Array(Math.round(this.TotalItems / this.pageSize));
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


    }
}
