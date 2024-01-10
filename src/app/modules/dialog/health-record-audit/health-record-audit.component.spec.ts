import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRecordAuditComponent } from './health-record-audit.component';

describe('HealthRecordAuditComponent', () => {
  let component: HealthRecordAuditComponent;
  let fixture: ComponentFixture<HealthRecordAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthRecordAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthRecordAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
