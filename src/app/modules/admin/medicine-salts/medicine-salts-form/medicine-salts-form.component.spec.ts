import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineSaltsFormComponent } from './medicine-salts-form.component';

describe('MedicineSaltsFormComponent', () => {
  let component: MedicineSaltsFormComponent;
  let fixture: ComponentFixture<MedicineSaltsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineSaltsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineSaltsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
