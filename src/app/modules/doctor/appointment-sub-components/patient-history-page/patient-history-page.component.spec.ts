import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryPageComponent } from './patient-history-page.component';

describe('PatientHistoryPageComponent', () => {
  let component: PatientHistoryPageComponent;
  let fixture: ComponentFixture<PatientHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHistoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
