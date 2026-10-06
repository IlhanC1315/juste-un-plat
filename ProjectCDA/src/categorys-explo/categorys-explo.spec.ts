import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysExplo } from './categorys-explo';

describe('CategorysExplo', () => {
  let component: CategorysExplo;
  let fixture: ComponentFixture<CategorysExplo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorysExplo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorysExplo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
