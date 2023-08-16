import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySaleInvoiceComponent } from './pharmacy-sale-invoice.component';

describe('PharmacySaleInvoiceComponent', () => {
  let component: PharmacySaleInvoiceComponent;
  let fixture: ComponentFixture<PharmacySaleInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacySaleInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacySaleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
