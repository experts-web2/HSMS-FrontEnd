import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRootComponent } from './users-root.component';

describe('UsersRootComponent', () => {
  let component: UsersRootComponent;
  let fixture: ComponentFixture<UsersRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
