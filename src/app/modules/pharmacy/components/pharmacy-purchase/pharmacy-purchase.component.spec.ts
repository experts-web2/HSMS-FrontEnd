import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPurchaseComponent } from './pharmacy-purchase.component';

describe('PharmacyPurchaseComponent', () => {
  let component: PharmacyPurchaseComponent;
  let fixture: ComponentFixture<PharmacyPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
