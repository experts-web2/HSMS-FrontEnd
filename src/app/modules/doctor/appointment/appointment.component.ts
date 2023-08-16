import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, takeUntil } from 'rxjs';
import { UserStateService } from 'src/app/State/user/user.service';
import { FiltersMatchModes } from 'src/app/constants/enums/FilterMatchModes';
import { FiltersOperators } from 'src/app/constants/enums/FilterOperators';
import { Genders } from 'src/app/constants/enums/Gender-enum';
import { SortOrder } from 'src/app/constants/enums/SortOrder';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IToken } from 'src/app/models/interfaces/Token';
import { IFetchRequest } from 'src/app/models/interfaces/fetchTableRequest';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { IVital } from 'src/app/models/vitals';
import { AlertService, TokenService, PatientService, VitalService, MedicationService, PrescriptionService } from 'src/app/services';
import { LabOrderService } from '../../../services/lab-order/lab-order.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PatientHistoryPageComponent } from '../appointment-sub-components/patient-history-page/patient-history-page.component';

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
  historyTokenId!: string;
  tokenVitals!: IVital;

  constructor(private alertService: AlertService, private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly patientService: PatientService, private readonly userStateService: UserStateService, private readonly vitalsService: VitalService, private readonly medicationService: MedicationService, private readonly prescriptionService: PrescriptionService, private readonly LabOrderService: LabOrderService, private readonly dialogService: DialogService) {
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
    this.patientService.getPatientDropDown().subscribe({
      next: (x) => {
        this.patients = x;
      },
      error: (err) => {},
    });
  }

  selectPatientHistoryVisit(visitId: any) {
    let selectedVisit = this.patientHistoryVisits.find(x => x.id === visitId);
    if(selectedVisit) {
      this.token = selectedVisit
      this.historyTokenId = this.token.id;
      this.getVitalsByTokenId(this.token.id); 
    }
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

  getHistoryVitals(tokenId: string){
    
  }

  getHistoryPrescription(tokenId: string){

  }

  getHistoryMedications(tokenId: string){

  }

  getToken() {
    this.tokenService.getTokenById(this.tokenId).subscribe({
      next: (x) => {
        this.token = x;
        this.getPatient(x.patientId);
        this.markTokenAsViewd(x.id);
      },
    });
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
      },
    });
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
      next: (x) => {},
    });
  }
  
  getVitalsByTokenId(tokenId: string){
    this.vitalsService.getVitalsByTokenId(tokenId).subscribe({
      next: (x) => {
        console.log(x);
        if (x){

          this.token.tokenDetail = {
            tokenId: this.token.id,
            pulseHeartRate: x.pulseHeartRate,
            bloodPressure: x.bloodPressure,
            height: x.height,
            tokenTypes: 1,
            respiratoryRate: x.respiratoryRate,
            weight: x.weight,
            bloodSugar: x.bloodSugar,
            bodyMassIndex: x.bodyMassIndex,
            oxygenSaturation: x.oxygenSaturation,
            temperature: x.temperature,
            bodySurfaceArea: x.bodySurfaceArea,
            id: '',
            createdAt: new Date(),
            createdBy: '',
            diastolicBloodPressure: x.diastolicBloodPressure
          }
        }
        else {
          this.token.tokenDetail = undefined;
        }
        
      }
    })
  }

  openHistoryView(){
    this.openPatientHistoryDialog();
  }

  openPatientHistoryDialog(){
    this.dialogService.open(PatientHistoryPageComponent, {
      width: '90%',
      height: '100%',
      data: {
        token: this.token,
        patient: this.patient
      }
    })
  }
}
