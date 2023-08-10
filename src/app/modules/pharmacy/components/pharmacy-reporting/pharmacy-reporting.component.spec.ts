import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyReportingComponent } from './pharmacy-reporting.component';

describe('PharmacyReportingComponent', () => {
  let component: PharmacyReportingComponent;
  let fixture: ComponentFixture<PharmacyReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyReportingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
