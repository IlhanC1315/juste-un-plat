import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardApi } from './recipe-card-api';

describe('RecipeCardApi', () => {
  let component: RecipeCardApi;
  let fixture: ComponentFixture<RecipeCardApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCardApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
