import { Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserStateService } from 'src/app/State/user/user.service';
import { MedicationDosageEnum } from 'src/app/constants/Constants/MedicationDosage';
import { MedicationDurationEnum } from 'src/app/constants/Constants/MedicationDuration';
import { MedicationFrequencies, MedicationFrequencyEnum } from 'src/app/constants/Constants/MedicationFrequency';
import { MedicationInstructionEnum, MedicationInstructions } from 'src/app/constants/Constants/MedicationInstructions';
import { MedicationRouteEnum, MedicationRoutes } from 'src/app/constants/Constants/MedicationRoute';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { ILogedInUser } from 'src/app/models/interfaces/Iloggedinuser';
import { IMedication } from 'src/app/models/interfaces/Medication';
import { IPrescription } from 'src/app/models/interfaces/Prescription';
import { IToken } from 'src/app/models/interfaces/Token';
import { IHealthRecord } from 'src/app/models/interfaces/healthRecord';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IVital } from 'src/app/models/vitals';
import { AccountService, DoctorService, LabOrderService, LoaderService, MedicationService, PrescriptionService, VitalService } from 'src/app/services';

@Component({
  selector: 'app-dr-prescription-print',
  templateUrl: './dr-prescription-print.component.html',
  styleUrls: ['./dr-prescription-print.component.scss']
})
export class DrPrescriptionPrintComponent {
  @ViewChild('printElement') printElement!: ElementRef;
  historyData?: IDialogData;
  medicationTableData: Array<IMedicationTableColumn> = [];
  patient!: IPatient;
  token!: IToken;
  healthRecord!: IHealthRecord;
  currentuser!: ILogedInUser;
  accountId!: string
  account:any;
  constructor(
    private readonly dialogRef: DynamicDialogRef, 
    private readonly dialogConfig: DynamicDialogConfig<{healthRecord: IHealthRecord}>,
    private readonly medicationService: MedicationService,
    private readonly vitalsService: VitalService,
    private readonly prescriptionService: PrescriptionService,
    private readonly labOrderService: LabOrderService,
    private readonly doctorService: DoctorService,
    private readonly userStateService: UserStateService,
    private readonly accountService: AccountService
  ){
    let currentUser = this.userStateService.User_State.value;  
    this.accountId = currentUser?.accountId;   
  }

  ngOnInit(): void {
    let tokenId = '';
    let doctorId = '';
    this.accountService.getAccountByID(this.accountId).subscribe(account => {
      console.log(account);
      this.account = account;
      
    })
    console.log(this.dialogConfig.data);
    if(this.dialogConfig.data?.healthRecord){
      this.healthRecord = this.dialogConfig.data?.healthRecord;
      if(this.healthRecord.patient ) this.patient = this.healthRecord.patient;
      
      this.historyData = {...this.historyData, patient: this.patient, medication: this.healthRecord.medication, prescription: this.healthRecord.prescription, vitals: this.healthRecord.vital} 
    }
    this.medicationMapper();
  }



  medicationMapper(){
    if (this.historyData?.medication?.medicationDetails) {
      this.medicationTableData = this.historyData.medication.medicationDetails.map((x, i) => {
        let medication: IMedicationTableColumn = {
          number: i + 1,
          name: x.medicineName,
          duration: `${x.durationValue} ${MedicationDurationEnum[x.duration]}`,
          dosage: `${x.dosageValue} ${MedicationDosageEnum[x.dosage]}`,
          frequency: MedicationFrequencies.find(y => x.frequency === y.value)?.label ?? MedicationFrequencyEnum[x.frequency],
          route: MedicationRoutes.find(y => x.route === y.value)?.label ?? MedicationRouteEnum[x.route],
          instruction: MedicationInstructions.find(y => x.insturction === y.value)?.label ?? MedicationInstructionEnum[x.insturction]
        } 
        return medication;
      })
    }
  }

  getMedication(tokenId: string){

    this.medicationService.getMedicationByTokenId(tokenId).subscribe({
      next: (x) => {
        if (this.historyData) this.historyData.medication = x;
        this.medicationMapper();
      },
      error: (err: Error) => {

      }
    })
  }

  getVitals(tokenId: string){

    this.vitalsService.getVitalsByTokenId(tokenId).subscribe({
      next: (x) => {
        if (this.historyData) this.historyData.vitals = x;

      },
      error: (err: Error) => {

      }
    })
  }

  getPrescription(tokenId: string){

    this.prescriptionService.getPrescriptionByTokenId(tokenId).subscribe({
      next: (x) => {
        if (this.historyData) this.historyData.prescription = x;

      },
      error: (err: Error) => {

      }
    })
  }

  getDoctor(doctorId: string){

    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (x) => {
        if (this.historyData) this.historyData.doctor = x;

      },
      error: (err: Error) => {

      }
    })
  }
  
  getLabOrder(tokenId: string){
    this.labOrderService.getLabOrderByTokenId(tokenId).subscribe({
      next: (x) => {
        if (this.historyData) this.historyData.labOrder = x;
      },
      error: (err: Error) => {

      }
    })
  }

  print(){
    const printContents = this.printElement.nativeElement.innerHTML;
    const popupWin = window.open('', '_blank', 'width=600,height=600');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body onload="window.print();window.close();">${printContents}</body>
      </html>
    `);
    popupWin?.document.close();
  }
}

interface IDialogData{
  token?: IToken,
  medication?: IMedication,
  prescription?: IPrescription,
  vitals?: IVital,
  labOrder?: any,
  doctor?: IDoctor,
  patient?: IPatient
}

interface IMedicationTableColumn{
  number: number,
  name: string,
  duration: string,
  dosage: string,
  route: string,
  frequency: string,
  instruction: string
}