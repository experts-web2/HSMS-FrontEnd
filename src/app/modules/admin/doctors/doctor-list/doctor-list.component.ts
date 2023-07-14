import { Component } from '@angular/core';
import { ITableColumns } from 'src/app/models/interfaces/table-Columns';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { DoctorService } from 'src/app/Services/doctor.service';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { TableColumnFilterTypes } from 'src/app/constants/enums/table-column-filterTypes';
import { DataTypesEnum } from 'src/app/constants/enums/dataTypes';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent {

  visible: boolean = false
  totalRecords: number = 0;
  doctorsList: Array<any> = [];
  actionsToShow: Array<string> = ['edit', 'delete'];
  ref!: DynamicDialogRef;
  columns: Array<ITableColumns> = [
    {
      name: 'Name',
      property: 'name',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Qualification',
      property: 'qualification',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Speciality',
      property: 'speciality',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Consultation Fee',
      property: 'consultationFee',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Timings',
      property: 'timings',
      filter: true,
      globalSearch: true,
      filterType: TableColumnFilterTypes.Text,
      columnType: DataTypesEnum.String
    },
    {
      name: 'Appointment',
      property: 'appointment',
      filter: true,
      globalSearch: true,
      columnType: DataTypesEnum.InnerHtml,
      valueToShow: this.getStatus.bind(this)
    }    
  ];

  constructor(
    public dialogService: DialogService,
    private readonly doctorService: DoctorService,
    private readonly alertService: AlertService){
  }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(){
    this.doctorService.getDoctors().subscribe({
      next: (x) => {
        this.doctorsList = x.data;
        this.totalRecords = x.total;
      },
      error: (err) => {

      }
    })
  }

  edit(editDoctor:any){
    this.addDoctor(editDoctor,'update');
  }

  deleteUser(deleteDoctor:any){
    this.doctorService.deleteDoctor(deleteDoctor).subscribe({
      next: (x) => {
        this.alertService.success('Success', 'Doctor delete successfully');
        this.getDoctors()
      },
      error: (err) => {
        this.alertService.error('Error', 'An error occoured while delete doctor')
      }
    })

  }

  getStatus(status: boolean): string{
    let icon = '<span class="text-success"><i class="fa-solid fa-check"></i></span>';
    if(!status) icon = '<span class="text-danger"><i  class="fa-solid fa-xmark"></i></span>';
    return icon;
  }

  addDoctor(doctor?:any, action:string ='add' ){
    this.ref = this.dialogService.open(DoctorFormComponent, { 
        width:'100%',
        height:'100%',
        data: {
          doctor : doctor,
          action: action
        }
      });
      this.ref.onClose.subscribe((doctor) => {
        if (doctor === undefined) {
          this.getDoctors();
        }
    });
  
  }

}
