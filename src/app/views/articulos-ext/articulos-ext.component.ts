import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-articulos-ext',
  imports: [],
  templateUrl: './articulos-ext.component.html',
  styleUrl: './articulos-ext.component.scss'
})
export class ArticulosExtComponent {

  private readonly route = inject(ActivatedRoute);
  selectedId: string = "";

  ngOnInit() {
    this.selectedId = this.route.snapshot.paramMap.get('token') || 'undefined';
  }
}
