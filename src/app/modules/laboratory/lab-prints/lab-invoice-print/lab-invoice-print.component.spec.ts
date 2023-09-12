import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabInvoicePrintComponent } from './lab-invoice-print.component';

describe('LabInvoicePrintComponent', () => {
  let component: LabInvoicePrintComponent;
  let fixture: ComponentFixture<LabInvoicePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabInvoicePrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
