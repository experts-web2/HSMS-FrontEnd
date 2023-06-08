import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrescriptionDialogueComponent } from './add-prescription-dialogue.component';

describe('AddPrescriptionDialogueComponent', () => {
  let component: AddPrescriptionDialogueComponent;
  let fixture: ComponentFixture<AddPrescriptionDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrescriptionDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrescriptionDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
