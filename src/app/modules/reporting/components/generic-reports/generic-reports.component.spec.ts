import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericReportsComponent } from './generic-reports.component';

describe('GenericReportsComponent', () => {
  let component: GenericReportsComponent;
  let fixture: ComponentFixture<GenericReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
