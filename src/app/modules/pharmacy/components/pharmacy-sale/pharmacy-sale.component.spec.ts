import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySaleComponent } from './pharmacy-sale.component';

describe('PharmacySaleComponent', () => {
  let component: PharmacySaleComponent;
  let fixture: ComponentFixture<PharmacySaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacySaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
