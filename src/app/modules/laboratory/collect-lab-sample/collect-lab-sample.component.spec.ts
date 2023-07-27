import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectLabSampleComponent } from './collect-lab-sample.component';

describe('CollectLabSampleComponent', () => {
  let component: CollectLabSampleComponent;
  let fixture: ComponentFixture<CollectLabSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectLabSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectLabSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
