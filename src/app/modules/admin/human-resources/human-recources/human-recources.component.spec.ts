import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanRecourcesComponent } from './human-recources.component';

describe('HumanRecourcesComponent', () => {
  let component: HumanRecourcesComponent;
  let fixture: ComponentFixture<HumanRecourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanRecourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumanRecourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
