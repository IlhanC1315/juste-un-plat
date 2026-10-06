import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalisePays } from './balise-pays';

describe('BalisePays', () => {
  let component: BalisePays;
  let fixture: ComponentFixture<BalisePays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalisePays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalisePays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
