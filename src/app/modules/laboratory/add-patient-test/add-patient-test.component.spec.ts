import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPatientTestComponent } from './add-patient-test.component';


describe('AddLabTestComponent', () => {
  let component: AddPatientTestComponent;
  let fixture: ComponentFixture<AddPatientTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatientTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
