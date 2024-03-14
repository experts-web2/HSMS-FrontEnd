import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
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
import { DrPrescriptionPrintComponent } from '../appointment-sub-components/dr-prescription-print/dr-prescription-print.component';
import { IVitalRequest } from '../../../models/interfaces/vitalsRequest';
import { IPrescriptionRequest } from 'src/app/models/interfaces/PrescriptionRequest';
import { IMedicationRequest } from '../../../models/interfaces/MedicationRequest';
import { ILabOrderRequest } from 'src/app/models/interfaces/LabOrder-Request';
import { AddFilesDialogComponent } from '../appointment-sub-components/add-files-dialog/add-files-dialog.component';
import { HealtRecordService } from 'src/app/services/health-record/healt-record.service';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';
import { cloneDeep, isEqual} from 'lodash';
import { AutomapperService } from '../../../services/mapper/automapper.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('Prescription') prescriptionSection!: ElementRef;
  @ViewChild('Vitals') vitalsSection!: ElementRef;
  @ViewChild('Medication') medicationSection!: ElementRef;
  @ViewChild('LabOrder') labOrderSection!: ElementRef;
  @ViewChild('Documents') documentsSection!: ElementRef;
  @ViewChild('sectionContainer') sectionContainer!: ElementRef;

  tokenId!: string;
  patient!: IPatient;
  previousTabId: string = 'Prescription';
  currentTabId: string = 'Prescription';
  token!: IToken;
  patients: Array<IDropDown> = [];
  historyToken!: IToken;
  patientsToShow: Array<IPatient> = [];
  patientHistoryVisits!: Array<IToken>;
  patientHistoryHealthRecords!: Array<IHealthRecord>;
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
  userProfile = false;
  userSideSection = false;

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
    private readonly healthRecordService: HealtRecordService,
    private readonly automapperService: AutomapperService,
  ) {

    this.route.params.subscribe({
      next: (x) => {
        this.tokenId = x["tokenId"];
        this.healthRecordId = x["healthRecordId"] ?? '';        
      }
    });

    this.userStateService.getUserState().subscribe({
      next: (x) => {
        this.logedInUser = x;         
      }
    });

  }

  ngAfterViewInit(): void {
    const container = this.sectionContainer?.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {

    if (this.tokenId) {
      this.getToken();
      this.getHealthRecordByTokenId(this.tokenId);
    } 
    else if (this.healthRecordId) {      
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
        this.healthRecord = x;
        this.healthRecordId = x.id;
        if(x.patient) this.patient = x.patient;
        if(x.vital) this.tokenVitals = x.vital;
      },
      error: (err) => {}
    })
  }

  getHealthRecordById(healthRecordId: string){
    this.healthRecordService.getHealthRecordById(healthRecordId).subscribe({
      next: (x) => {
        this.healthRecord = x;
        this.healthRecordId = x.id;
        if(x.patient) this.patient = x.patient;
        if(x.vital) this.tokenVitals = x.vital;
         this.getHistoryHealthRecords();
      },
      error: (err) => {}
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

  getHistoryHealthRecords(){
    let healthRecordQuery: IFetchRequest = {
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
            value: this.healthRecord.doctorId
          },
          {
            field: 'PatientId',
            matchMode: FiltersMatchModes.Equal,
            operator: FiltersOperators.And,
            value: this.healthRecord.patientId
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

    this.healthRecordService.getAllHealthRecords(healthRecordQuery).subscribe({
      next: (x) => {
        this.patientHistoryHealthRecords = x.data;        
      },
      error: (err) => {
      }
    })

  }

  changeTab(){
    switch(this.previousTabId){
      case 'Prescription':        
        if (this.prescription && this.healthRecord.prescription && !isEqual(this.prescription, this.automapperService.map<IPrescriptionRequest>(this.healthRecord.prescription, this.prescription))) {
          this.updatePrescription(this.healthRecord.prescription.id);          
        } else if (!this.healthRecord.prescription && this.prescription) {          
          this.addPrescription()
        }        
      break;
      case 'Vitals':      
        if (this.vitals && this.healthRecord.vital && !isEqual(this.vitals, this.automapperService.map<IVitalRequest>(this.healthRecord.vital, this.vitals))) {
          this.updateVitals(this.healthRecord.vital.id)
        } else if (!this.healthRecord.vital && this.vitals) {
          this.addVitals()
        }
      break;
      case 'Medication':
        if (this.medication && this.healthRecord.medication && !isEqual(this.medication, this.automapperService.map<IMedicationRequest>(this.healthRecord.medication, this.medication))) {
          this.updateMedication(this.healthRecord.medication.id);
        } else if (!this.healthRecord.medication && this.medication){
          this.addMedication()
        }
      break;
      case 'LabOrder':
        let healthRecordLabTests = this.healthRecord.labOrder?.labTestIds ?? [];
        if(this.labOrder && this.healthRecord.labOrder && this.labOrder.labTestIds && !isEqual(this.labOrder.labTestIds.sort(), healthRecordLabTests.sort())){
          this.updateLabOrder(this.healthRecord.labOrder.id)
        } else if (!this.healthRecord.labOrder && this.labOrder && this.labOrder.labTestIds.length) {
          this.addLabOrder()
        }
      break;
      default:
      break;
    }
  }

  getToken() {
    this.tokenService.getTokenById(this.tokenId).subscribe({
      next: (x) => {
        this.token = x;
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

  getGender(gender: Genders): string {
    return Genders[gender];
  }

  
  getVitalsByTokenId(tokenId: string){
    this.vitalsService.getVitalsByTokenId(tokenId).subscribe({
      next: (x) => {
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
        this.alertService.success('Presctiption Saved Successfully.');
        this.healthRecord.prescription = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Prescription.');
      }
    })
  }

  addVitals(){
    this.vitalsService.addVitals(this.vitals).subscribe({
      next: (x) => {
        this.alertService.success('Vitals Saved Successfully.');
        this.healthRecord.vital = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Vitals.');
      }
    })
  }

  addMedication(){
    this.medicationService.addMedication(this.medication).subscribe({
      next: (x) => {
        this.alertService.success('Medication Saved Successfully.');
        this.healthRecord.medication = x;
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Medication.');
      }
    })
  }

  addLabOrder(){
    this.LabOrderService.addMedication(this.labOrder).subscribe({
      next: (x) => {
        this.alertService.success('Lab Order Saved Successfully.')
        this.healthRecord.labOrder = x;
        this.healthRecord = cloneDeep(this.healthRecord);
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Lab Order.')
      }
    })
  }

  updatePrescription(prescriptionId: string){
    this.prescriptionService.updatePrescriptionById(prescriptionId, this.prescription).subscribe({
      next: (x) => {
        this.alertService.success('Presctiption Saved Successfully.');
        this.healthRecord.prescription = x;
        this.healthRecord = cloneDeep(this.healthRecord);
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Prescription.');
      }
    })
  }

  updateVitals(vitalsId: string){
    this.vitalsService.updateVitals(vitalsId, this.vitals).subscribe({
      next: (x) => {
        this.alertService.success('Vitals Saved Successfully.')
        this.healthRecord.vital = x;
        this.healthRecord = cloneDeep(this.healthRecord);
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
        this.healthRecord = cloneDeep(this.healthRecord);
      },
      error: (err) => {
        this.alertService.error('An Error Occoured While Saving Medication.')

      }
    })
  }

  handleSectionVisibility(sectionId: string ) {
    this.currentTabId = sectionId;

    if(sectionId !== this.previousTabId){
      this.changeTab();
      this.previousTabId = sectionId;
    }
    // Perform actions based on the section visibility
  }
  
  scrollToSection(sectionId: string): void {
    this.currentTabId = sectionId;    
    const container = this.sectionContainer?.nativeElement;
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement && container) {
      container.scrollTo({behavior: 'smooth', top: sectionElement.offsetTop});
    }  
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

  openUploadFileDialog(){
    this.dialogService.open(AddFilesDialogComponent,{
      width: window.innerWidth > 600 ? '40%': '90vw',
      height: window.innerWidth > 600 ? 'auto' :'90vh',
      header:'Upload Files',
      data: {patient: this.patient},
      style: {
        'max-height': '90vh'
      }
    })
  }
}