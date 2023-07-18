import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryRootComponent } from './laboratory-root.component';

describe('LaboratoryRootComponent', () => {
  let component: LaboratoryRootComponent;
  let fixture: ComponentFixture<LaboratoryRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
