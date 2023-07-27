import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyRootComponent } from './pharmacy-root.component';

describe('PharmacyRootComponent', () => {
  let component: PharmacyRootComponent;
  let fixture: ComponentFixture<PharmacyRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
