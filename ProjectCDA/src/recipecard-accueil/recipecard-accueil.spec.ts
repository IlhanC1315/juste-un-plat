import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipecardAccueil } from './recipecard-accueil';

describe('RecipecardAccueil', () => {
  let component: RecipecardAccueil;
  let fixture: ComponentFixture<RecipecardAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipecardAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipecardAccueil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
