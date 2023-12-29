import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCollectionPrintComponent } from './sample-collection-print.component';

describe('SampleCollectionPrintComponent', () => {
  let component: SampleCollectionPrintComponent;
  let fixture: ComponentFixture<SampleCollectionPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleCollectionPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleCollectionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
