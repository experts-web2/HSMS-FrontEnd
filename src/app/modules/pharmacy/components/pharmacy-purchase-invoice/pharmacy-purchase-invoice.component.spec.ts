import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPurchaseInvoiceComponent } from './pharmacy-purchase-invoice.component';

describe('PharmacyPurchaseInvoiceComponent', () => {
  let component: PharmacyPurchaseInvoiceComponent;
  let fixture: ComponentFixture<PharmacyPurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPurchaseInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
