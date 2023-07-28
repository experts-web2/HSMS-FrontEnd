import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '@microsoft/signalr';
import { Observable, of, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { TokenService } from 'src/app/Services/token.service';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { Genders } from 'src/app/constants/enums/Gender-enum';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { IToken } from 'src/app/models/interfaces/Token';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { SortOrder } from '../../../constants/enums/SortOrder';
import { UserStateService } from '../../../State/user/user.service';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';

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
  patientHistoryVisits!: Array<IToken>;
  $unsubscribe: Observable<any> = of(null);
  logedInUser!: ILogedInUser;

  constructor(private alertService: AlertService, private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly patientService: PatientService, private readonly userStateService: UserStateService) {
    this.route.params.subscribe({
      next: (x) => {
        this.tokenId = x["tokenId"];
      }
    });

    this.userStateService.getUserState().subscribe({
      next: (x) => {
        this.logedInUser = x;
        
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
    let selectedVisit = this.patientHistoryVisits.find(x => x.id === visitId);
    if(selectedVisit) this.token = selectedVisit;
  }

  getPatientHistorvisits(patientId: string) {
    let tokensPayload: IFetchRequest = {
      pagedListRequest:{
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest:[
          {
            field: 'DoctorId',
            matchMode: FiltersMatchModes.Equal,
            operator: FiltersOperators.And,
            value: this.logedInUser.entityIds ? this.logedInUser.entityIds['DoctorId'] : ''
          },
          {
            field: 'PatientId',
            matchMode: FiltersMatchModes.Equal,
            operator: FiltersOperators.And,
            value: patientId
          },
        ],
        sortRequest:[
          {
            field: 'CreatedAt',
            direction: SortOrder.Descending,
            priority: 1
          }
        ]
      }
    }

    this.tokenService.getAllTokens(tokensPayload).subscribe({
      next: (x) => {
        this.patientHistoryVisits = x.data;
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

      }
    })
  }

  getPatient(patientId: string) {
    this.patientService.getPatientById(patientId).subscribe({
      next: (x) => {
        this.patient = x;
      }
    })
  }

  getGender(gender: Genders): string {
    return Genders[gender];
  }



  searchPatient(queryObj: any) {
    let query = queryObj.inputValue;
    let text = query.toLowerCase();
    this.patientsToShow = this.patients.filter(x => x.name.toLowerCase().includes(text));
  }

  patientSelect(patientId: string) {
    this.getPatientHistorvisits(patientId);
    this.getPatient(patientId);
  }

  getPatientVisits(visitId: string) {
    this.tokenService.getTokenById('').subscribe({
      next: (x) => {

      }
    })
  }

}