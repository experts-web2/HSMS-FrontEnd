import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  isCameraExist = true;
  picture: any;

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<CameraComponent>) {
    this.dialogRef.backdropClick().subscribe((backdrop) => {
      this.dialogRef.close();
    });
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.isCameraExist = mediaDevices && mediaDevices.length > 0;
    });
  }

  takeSnapshot(): void {
    this.trigger.next();
    this.dialogRef.close(this.picture);
  }

  close() {
    this.dialogRef.close();
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  handleImage(webcamImage: WebcamImage) {
    this.picture = webcamImage;
    this.dialogRef.close(webcamImage);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
