import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { PatientFormComponent } from '../../forms/patient-form/patient-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from 'src/app/Services/doctor.service';
import { IDropDown } from 'src/app/models/interfaces/Dropdown';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-lab-test-report',
  templateUrl: './lab-test-report.component.html',
  styleUrls: ['./lab-test-report.component.scss']
})
export class LabTestReportComponent implements OnInit {
  patients: IDropDown[]=[];
  patientsToShow: IDropDown[]=[];
  labTestForm!: FormGroup
  doctors: IDropDown[]=[];
  doctorsToShow: IDropDown[]=[];
  datePlaceholder = formatDate(Date.now(), 'MM/dd/yyyy', 'en-US');
  preview ='';
  selectedFiles: any;
  currentFile!: File;

  constructor(private readonly patientServive:PatientService,
    private dialog: MatDialog,
     private readonly alertService: AlertService,
     private readonly doctorService : DoctorService,
     private fb:FormBuilder){

      this.labTestForm = this.fb.group({
        patientId: [''],
        doctorId: [''],
        dateTime: [''],
        report: [''],
        remarks: [''],
        photoPath: [''],
      });
     }


  ngOnInit(): void {
    this.getPatientDropDownList();
    this.getDoctorDropDownList();
  }


  getPatientDropDownList(){
    this.patientServive.getPatientsDropdown().subscribe({
      next: (x) => {
        this.patients = x
      },
      error: (err) => {
      }
    })
  }

  getDoctorDropDownList(){
    this.doctorService.getDoctorsDropDown().subscribe({
      next: (x) => {
        this.doctors = x
      },
      error: (err) => {
      }
    })
  }

  search(event:any){
    console.log(event.query);
    const query = event.query;
    this.patientsToShow = this.patients.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log(this.patientsToShow)
  }

  
  doctorSearch(event:any){
    console.log(event.query);
    const query = event.query;
    this.doctorsToShow = this.doctors.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log(this.doctorsToShow)
  }

  selectFile(event: any): void {
    this.preview = '';
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.labTestForm.controls['photoPath'].setValue(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  onSubmit(){
    console.log(this.labTestForm.value)
  }

  addPatient() {
    const dialogRef = this.dialog.open(PatientFormComponent, {
      width: '600px'
    })
  }

}
