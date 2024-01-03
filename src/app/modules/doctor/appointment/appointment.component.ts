import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { DrPrescriptionPrintComponent } from '../appointment-sub-components/dr-prescription-print/dr-prescription-print.component';
import { IVitalRequest } from '../../../models/interfaces/vitalsRequest';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { IMedicationRequest } from '../../../models/interfaces/MedicationRequest';
import { ILabOrderRequest } from 'src/app/models/interfaces/LabOrder-Request';
import { AddFilesDialogComponent } from '../appointment-sub-components/add-files-dialog/add-files-dialog.component';
import { PatientVisitService } from 'src/app/services/patient visit/patient-visit.service';
import { HealtRecordService } from 'src/app/services/health-record/healt-record.service';
import { IPatientVisitRequest } from 'src/app/models/interfaces/patientVisitRequest';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';
import {Dictionary, isEqual, isEqualWith} from 'lodash';
import { AutomapperService } from '../../../services/mapper/automapper.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit, OnChanges {
  tokenId!: string;
  patient!: IPatient;
  previousTabIndex: number = 0;
  token!: IToken;
  patients: Array<IDropDown> = [];
  historyToken!: IToken;
  patientsToShow: Array<IPatient> = [];
  patientHistoryVisits!: Array<IToken>;
  $unsubscribe: Observable<any> = of(null);
  logedInUser!: ILogedInUser;
  historyTokenId!: string;
  tokenVitals!: IVital;
  vitals!: IVitalRequest;
  prescription!: IPrescriptionRequest;
  medication!: IMedicationRequest;
  labOrder!: ILabOrderRequest;
  currentDate: Date = new Date();
  healthRecordId!: string;
  healthRecord!: IHealthRecord;
  saved: boolean = true;
  constructor(
    private alertService: AlertService, 
    private readonly route: ActivatedRoute, 
    private readonly tokenService: TokenService, 
    private readonly patientService: PatientService, 
    private readonly userStateService: UserStateService, 
    private readonly vitalsService: VitalService, 
    private readonly medicationService: MedicationService, 
    private readonly prescriptionService: PrescriptionService, 
    private readonly LabOrderService: LabOrderService, 
    private readonly dialogService: DialogService,
    private readonly patientVisitService: PatientVisitService,
    private readonly healthRecordService: HealtRecordService,
    private readonly automapperService: AutomapperService
  ) {
    this.route.params.subscribe({
      next: (x) => {
        this.tokenId = x["tokenId"];
        this.healthRecordId = x["healthRecordId"] ?? '';
        console.log({healthRecordId: x["healthRecordId"], params: x});
        
      }
    });

    this.userStateService.getUserState().subscribe({
      next: (x) => {
        this.logedInUser = x; 
        
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['vitals']);
    
  }

  ngOnInit(): void {
    if (this.tokenId){

      this.getToken();
      this.getHealthRecordByTokenId(this.tokenId);
    } else if(this.healthRecordId){
      console.log(this.healthRecordId);
      
      this.getHealthRecordById(this.healthRecordId)
    }
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

  getHealthRecordByTokenId(tokenId: string){
    this.healthRecordService.getHealthRecordByTokenId(tokenId).subscribe({
      next: (x) => {
        console.log(x);
        this.healthRecord = x;
        this.healthRecordId = x.id;
        if(x.patient) this.patient = x.patient;
        if(x.vital) this.tokenVitals = x.vital;
      },
      error: (err) => {

      }
    })
  }

  getHealthRecordById(healthRecordId: string){
    this.healthRecordService.getHealthRecordById(healthRecordId).subscribe({
      next: (x) => {
        this.healthRecord = x;
        this.healthRecordId = x.id;
        if(x.patient) this.patient = x.patient;
        if(x.vital) this.tokenVitals = x.vital;
      },
      error: (err) => {

      }
    })
  }

  selectPatientHistoryVisit(visitId: any) {
    let selectedVisit = this.patientHistoryVisits.find(x => x.id === visitId);
    if(selectedVisit) {
      this.token = selectedVisit
      this.historyTokenId = this.token.id;
      this.getVitalsByTokenId(this.token.id); 
    }
  }

  openPrescriptionPrintDialogue(){
    this.dialogService.open(DrPrescriptionPrintComponent,{
      width: '85%',
      height: '100%',
      data: {
        healthRecord: this.healthRecord,
      }
    })
  }

  savePatientVisitDetails(){
    console.log(this.labOrder);
    
    if(this.prescription && !this.healthRecord.prescription) this.addPrescription();
    if(this.vitals && !this.healthRecord.vital) this.addVitals();
    if(this.medication && !this.healthRecord.medication) this.addMedication();
    if(this.labOrder && !this.healthRecord.labOrder) this.addLabOrder();
  
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
        // this.openPatientHistoryDialog();
      },
      error: (err) => {

      }
    })
  }

  getHistoryVitals(tokenId: string){
    
  }

  getHistoryPrescription(tokenId: string){

  }

  changeTab(tabindex: number){
    console.log(tabindex);

    switch(this.previousTabIndex){
      case 0:
        if (this.healthRecord.prescription && !isEqual(this.prescription, this.automapperService.map<IPrescriptionRequest>(this.healthRecord.prescription, this.prescription))) {
          console.log('update prescription');
          
        } else if (!this.healthRecord.prescription) {
          console.log('add prescription');
          this.addPrescription()
        }else{
          console.log('do nothing');

        }
        
      break;
      case 1:
        console.log({vitalReq: this.vitals, healthRecordVital: this.automapperService.map<IVitalRequest>(this.healthRecord.vital, this.vitals)});
        
        if (this.healthRecord.vital && !isEqual(this.vitals, this.automapperService.map<IVitalRequest>(this.healthRecord.vital, this.vitals))) {
          console.log('update vitals');
        } else if (!this.healthRecord.vital) {
          console.log('add vitals');
          this.addVitals()
        } else {
          console.log('do nothing');
          
        }

      break;
      case 2:
        if (this.healthRecord.medication && !isEqual(this.medication, this.automapperService.map<IMedicationRequest>(this.healthRecord.medication, this.medication))) {
          console.log('update medication');
          
        } else if (!this.healthRecord.medication){
          console.log('add medication');
          this.addMedication()

        }else {
          console.log('do nothing');

        }

      break;
      case 3:
        let healthRecordLabTests = this.healthRecord.labOrder?.labOrderDetails.map(x => x.labTestId) ?? [];
        if(this.healthRecord.labOrder && !(this.labOrder.labTestIds?.length === healthRecordLabTests?.length) && !this.labOrder.labTestIds?.every(x => healthRecordLabTests.includes(x))){
          console.log('update laborder');
          
        } else if (!this.healthRecord.labOrder) {
          console.log('add laborder');
          this.addLabOrder();
        }

      break;
      default:
      break;
    }

    this.previousTabIndex = tabindex;    
  }

  getHistoryMedications(tokenId: string){

  }

  activeChange(event: any){
    console.log(event);
    
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

  getPatientsBySearch(searchQuery: string){
    let query: IFetchRequest = {
      pagedListRequest: {
        pageNo: 1,
        pageSize: 100
      },
      queryOptionsRequest:{
        filtersRequest:[
          {
            field: 'Name',
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.Or,
            value: searchQuery,
            ignoreCase: true
          },
          {
            field: 'MRNo',
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.Or,
            value: searchQuery,
            ignoreCase: true
          },
          {
            field: 'PhoneNumber',
            matchMode: FiltersMatchModes.Contains,
            operator: FiltersOperators.Or,
            value: searchQuery,
            ignoreCase: true
          },
        ]
      }
    }

    this.patientService.getPatients(query).subscribe({
      next: (x)=>{
        this.patientsToShow = x.data;
      },
      error: (err) => {

      }
    })
  }

  getGender(gender: Genders): string {
    return Genders[gender];
  }

  searchPatient(queryObj: any) {
    let query = queryObj.query;
    this.getPatientsBySearch(query);
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

  addPrescription(){
    this.prescriptionService.addPrescription(this.prescription).subscribe({
      next: (x) => {
        this.alertService.success('Presctiption Saved Successfully.')
        this.healthRecord.prescription = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Prescription.')

      }
    })
  }

  addVitals(){
    this.vitalsService.addVitals(this.vitals).subscribe({
      next: (x) => {
        this.alertService.success('Vitals Saved Successfully.')
        this.healthRecord.vital = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Vitals.')

      }
    })
  }

  addMedication(){
    this.medicationService.addMedication(this.medication).subscribe({
      next: (x) => {
        this.alertService.success('Medication Saved Successfully.')
        this.healthRecord.medication = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Medication.')

      }
    })
  }

  addLabOrder(){
    this.LabOrderService.addMedication(this.labOrder).subscribe({
      next: (x) => {
        this.alertService.success('Lab Order Saved Successfully.')
        this.healthRecord.labOrder = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Lab Order.')

      }
    })
  }

  updatePrescription(prescriptionId: string){
    this.prescriptionService.updatePrescriptionById(prescriptionId, this.prescription).subscribe({
      next: (x) => {
        this.alertService.success('Presctiption Saved Successfully.')
        this.healthRecord.prescription = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Prescription.')

      }
    })
  }

  updateVitals(vitalsId: string){
    this.vitalsService.updateVitals(vitalsId, this.vitals).subscribe({
      next: (x) => {
        this.alertService.success('Vitals Saved Successfully.')
        this.healthRecord.vital = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Vitals.')

      }
    })
  }

  updateMedication(medicationId: string){
    this.medicationService.updateMedication(medicationId, this.medication).subscribe({
      next: (x) => {
        this.alertService.success('Medication Saved Successfully.')
        this.healthRecord.medication = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Medication.')

      }
    })
  }

  updateLabOrder(labOrderId: string){
    this.LabOrderService.updateLabOrder(labOrderId, this.labOrder).subscribe({
      next: (x) => {
        this.alertService.success('Lab Order Saved Successfully.')
        this.healthRecord.labOrder = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Lab Order.')

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
        historyVisits: this.patientHistoryVisits,
        patient: this.patient
      }
    })
  }

  openUploadFileDialog(){
    this.dialogService.open(AddFilesDialogComponent,{
      width: '40%',
      height: '50%',
      data: {patient: this.patient}
    })
  }
}
