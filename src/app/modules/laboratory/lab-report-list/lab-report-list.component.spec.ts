import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabReportListComponent } from './lab-report-list.component';

describe('LabReportListComponent', () => {
  let component: LabReportListComponent;
  let fixture: ComponentFixture<LabReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
