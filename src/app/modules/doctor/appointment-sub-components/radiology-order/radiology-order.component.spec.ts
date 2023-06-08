import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyOrderComponent } from './radiology-order.component';

describe('RadiologyOrderComponent', () => {
  let component: RadiologyOrderComponent;
  let fixture: ComponentFixture<RadiologyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
