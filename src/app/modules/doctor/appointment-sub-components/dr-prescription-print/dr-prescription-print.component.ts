import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MedicationDosageEnum } from 'src/app/constants/Constants/MedicationDosage';
import { MedicationDurationEnum } from 'src/app/constants/Constants/MedicationDuration';
import { MedicationFrequencyEnum } from 'src/app/constants/Constants/MedicationFrequency';
import { MedicationInstructionEnum } from 'src/app/constants/Constants/MedicationInstructions';
import { MedicationRouteEnum } from 'src/app/constants/Constants/MedicationRoute';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { IMedication } from 'src/app/models/interfaces/Medication';
import { IPrescription } from 'src/app/models/interfaces/Prescription';
import { IToken } from 'src/app/models/interfaces/Token';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IVital } from 'src/app/models/vitals';
import { DoctorService, LabOrderService, LoaderService, MedicationService, PrescriptionService, VitalService } from 'src/app/services';

@Component({
  selector: 'app-dr-prescription-print',
  templateUrl: './dr-prescription-print.component.html',
  styleUrls: ['./dr-prescription-print.component.scss']
})
export class DrPrescriptionPrintComponent {
  
  historyData?: IDialogData;
  medicationTableData: Array<IMedicationTableColumn> = [];
  token!: IToken;
  medicationTableColumns: Array<ITableColumns> = [
    {
      name: 'Medicine',
      property: 'name'
    },
    {
      name: 'Duration',
      property: 'duration'
    },
    {
      name: 'Dosage',
      property: 'dosage'
    },
    {
      name: 'Route',
      property: 'route'
    },
    {
      name: 'Frequency',
      property: 'frequency'
    },
    {
      name: 'Instruction',
      property: 'instruction'
    }
  ];

  constructor(
    private readonly dialogRef: DynamicDialogRef, 
    private readonly dialogConfig: DynamicDialogConfig<{historyVisits: IToken, patient: IPatient}>,
    private readonly medicationService: MedicationService,
    private readonly vitalsService: VitalService,
    private readonly prescriptionService: PrescriptionService,
    private readonly labOrderService: LabOrderService,
    private readonly doctorService: DoctorService,
    private readonly loaderService: LoaderService
  ){
    
  }

  ngOnInit(): void {
    let tokenId = '';
    let doctorId = '';
    console.log(this.dialogConfig.data);
    if(this.dialogConfig.data?.historyVisits){
      this.token = this.dialogConfig.data?.historyVisits;
    }
    if (this.dialogConfig.data?.patient){
      this.historyData = {...this.historyData, patient: this.dialogConfig.data?.patient} 
    }
    
    this.historyData = {
      token: this.dialogConfig.data?.historyVisits
    }

    if(this.historyData.token) { 
      tokenId = this.historyData.token?.id;
      doctorId = this.historyData.token.doctorId
    }

    this.getAllData(tokenId, doctorId);
  }

  getAllData(tokenId: string, doctorId: string){
    console.log({tokenId, doctorId});
    
    this.getLabOrder(tokenId);
    this.getMedication(tokenId);
    this.getPrescription(tokenId);
    this.getVitals(tokenId);
    this.getDoctor(doctorId);
  }

  medicationMapper(){
    if (this.historyData?.medication?.medicationDetails) {
      this.medicationTableData = this.historyData.medication.medicationDetails.map((x, i) => {
        let medication: IMedicationTableColumn = {
          number: i + 1,
          name: x.medicineName,
          duration: `${x.durationValue} ${MedicationDurationEnum[x.duration]}`,
          dosage: `${x.dosageValue} ${MedicationDosageEnum[x.dosage]}`,
          frequency: MedicationFrequencyEnum[x.frequency],
          route: MedicationRouteEnum[x.route],
          instruction: MedicationInstructionEnum[x.insturction]
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