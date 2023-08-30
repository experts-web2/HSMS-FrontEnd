import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilesDialogComponent } from './add-files-dialog.component';

describe('AddFilesDialogComponent', () => {
  let component: AddFilesDialogComponent;
  let fixture: ComponentFixture<AddFilesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
