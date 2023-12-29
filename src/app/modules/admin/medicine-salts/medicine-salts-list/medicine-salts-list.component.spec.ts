import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineSaltsListComponent } from './medicine-salts-list.component';

describe('MedicineSaltsListComponent', () => {
  let component: MedicineSaltsListComponent;
  let fixture: ComponentFixture<MedicineSaltsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineSaltsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineSaltsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
