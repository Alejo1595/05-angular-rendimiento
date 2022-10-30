import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSlideComponent } from './product-details-slide.component';

describe('ProductDetailsSlideComponent', () => {
  let component: ProductDetailsSlideComponent;
  let fixture: ComponentFixture<ProductDetailsSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
