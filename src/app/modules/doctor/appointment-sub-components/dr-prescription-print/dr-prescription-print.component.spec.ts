import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrPrescriptionPrintComponent } from './dr-prescription-print.component';

describe('DrPrescriptionPrintComponent', () => {
  let component: DrPrescriptionPrintComponent;
  let fixture: ComponentFixture<DrPrescriptionPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrPrescriptionPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrPrescriptionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
