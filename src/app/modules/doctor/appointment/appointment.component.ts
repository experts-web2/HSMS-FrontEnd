import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '@microsoft/signalr';
import { Observable, of, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { TokenService } from 'src/app/Services/token.service';
import { Genders } from 'src/app/constants/enums/Gender-enum';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IToken } from 'src/app/models/interfaces/Token';
import { IPatient } from 'src/app/models/interfaces/patient-model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  tokenId!: string;
  patient!: IPatient;
  token!: IToken;
  patients: Array<IDropDown> = [];
  historyToken!: IToken;
  patientsToShow: Array<IDropDown> = [];
  patientHistoryVisits!: Array<IDropDown>;
  $unsubscribe: Observable<any> = of(null);

  constructor(private alertService: AlertService, private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly patientService: PatientService) {
    this.route.params.subscribe({
      next: (x) => {
        this.tokenId = x["tokenId"];
      }
    })
  }

  ngOnInit(): void {
    if (this.tokenId) this.getToken();
    else {
      this.getPatientDropDown();
    }

  }

  getPatientDropDown() {
    this.patientService.getPatientDropDown().subscribe(
      {
        next: (x) => {
          this.patients = x;
        },
        error: (err) => {

        }
      }
    )
  }

  selectPatientHistoryVisit(visitId: any) {
    console.log({visitId});
    
  }

  getPatientHistorvisits(patientId: string) {
    this.tokenService.addPatientTest('').pipe(takeUntil(this.$unsubscribe)).subscribe({
      next: (x) => {

      },
      error: (err) => {

      }
    })
  }

  getToken() {
    this.tokenService.getTokenById(this.tokenId).subscribe({
      next: (x) => {
        this.token = x;
        this.getPatient(x.patientId);
        this.markTokenAsViewd(x.id);
      }
    })
  }

  markTokenAsViewd(tokenId: string) {
    this.tokenService.markTokenAsViewd(tokenId).subscribe({
      next: (x) => {
        console.log(x);

      }
    })
  }

  getPatient(patientId: string) {
    this.patientService.getPatientById(patientId).subscribe({
      next: (x) => {
        console.log(x);
        this.patient = x;
      }
    })
  }

  getGender(gender: Genders): string {
    return Genders[gender];
  }



  searchPatient(queryObj: any) {
    console.log(queryObj.inputValue);
    // let query = queryObj.query;
    // let text = query.toLowerCase();
    // this.patientsToShow = this.patients.filter(x => x.name.toLowerCase().includes(text));
  }

  patientSelect(patient: IDropDown) {
    console.log(patient);
    this.getPatient(patient.id);
    // this.addTokenForm.get('patientId')?.setValue(patient.id);
    // this.addTokenForm.get('patientName')?.setValue(patient.name);
  }

  getPatientVisits(visitId: string) {
    this.tokenService.getTokenById('').subscribe({
      next: (x) => {

      }
    })
  }

}