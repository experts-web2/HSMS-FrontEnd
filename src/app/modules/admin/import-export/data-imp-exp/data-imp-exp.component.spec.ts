import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImpExpComponent } from './data-imp-exp.component';

describe('DataImpExpComponent', () => {
  let component: DataImpExpComponent;
  let fixture: ComponentFixture<DataImpExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataImpExpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataImpExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
