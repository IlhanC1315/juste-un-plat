import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExplo } from './card-explo';

describe('CardExplo', () => {
  let component: CardExplo;
  let fixture: ComponentFixture<CardExplo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardExplo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExplo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
