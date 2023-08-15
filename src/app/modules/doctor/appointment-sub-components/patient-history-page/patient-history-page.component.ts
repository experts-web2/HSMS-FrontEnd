import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IMedication } from 'src/app/models/interfaces/Medication';
import { IPrescription } from 'src/app/models/interfaces/Prescription';
import { IToken } from 'src/app/models/interfaces/Token';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { IVital } from 'src/app/models/vitals';
import { MedicationService, VitalService } from 'src/app/services';
import { PrescriptionService } from '../../../../services/prescription/prescription.service';
import { LabOrderService } from '../../../../services/lab-order/lab-order.service';
import { IPatient } from 'src/app/models/interfaces/patient-model';
import { DoctorService } from '../../../../services/doctor/doctor.service';
import { IDoctor } from 'src/app/models/interfaces/Doctor';
import { patientData } from '../../../../../data';

@Component({
  selector: 'app-patient-history-page',
  templateUrl: './patient-history-page.component.html',
  styleUrls: ['./patient-history-page.component.scss']
})
export class PatientHistoryPageComponent implements OnInit {
  historyData?: IDialogData;
  medicationTableColumns: Array<ITableColumns> = [
    {
      name: 'Sr#',
      property: 'number'
    },
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
    private readonly dialogConfig: DynamicDialogConfig<{token: IToken, patient: IPatient}>,
    private readonly medicationService: MedicationService,
    private readonly vitalsService: VitalService,
    private readonly prescriptionService: PrescriptionService,
    private readonly labOrderService: LabOrderService,
    private readonly doctorService: DoctorService
  ){

  }

  ngOnInit(): void {
    let tokenId = '';
    let doctorId = '';
    console.log(this.dialogConfig.data);
    this.historyData = {
      token: this.dialogConfig.data?.token
    }

    if(this.historyData.token) { 
      tokenId = this.historyData.token?.id;
      doctorId = this.historyData.token.doctorName
    }

    this.getLabOrder(tokenId);
    this.getMedication(tokenId);
    this.getPrescription(tokenId);
    this.getVitals(tokenId);
    this.getDoctor(doctorId);
  }

  medicationMapper(tokenId: string){
    this.medicationService.getMedicationByTokenId(tokenId).subscribe({
      next: (x) => {

      },
      error: (err: Error) => {

      }
    })
  }

  getMedication(tokenId: string){
    this.medicationService.getMedicationByTokenId(tokenId).subscribe({
      next: (x) => {
        if (this.historyData) this.historyData.mediction = x;
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
        if(this.historyData) this.historyData.doctor = x;
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
  mediction?: IMedication,
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

