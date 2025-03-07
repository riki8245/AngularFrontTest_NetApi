import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosExtComponent } from './articulos-ext.component';

describe('ArticulosExtComponent', () => {
  let component: ArticulosExtComponent;
  let fixture: ComponentFixture<ArticulosExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticulosExtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
