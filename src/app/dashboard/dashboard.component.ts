import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { appointmentModel } from '../models/patient-model';
import { PatientService } from '../Services/patient/patient.service';

// const APPOINTMENTS_DATA: any[] = [
//   {name: '', time: 'There Are No Tokens For Today', doctor: ''},
// ];

// const MESSAGES_DATA: any[] = [
//   {sendAt: '12 Days Ago', message: 'Dear Anwar, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Zohaib, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Abdullah, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Waqas, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '12 Days Ago', message: 'Dear Mohsin, welcome to MedicaZon Hospital Multan, Thank you for choosing us.'},
//   {sendAt: '', message: 'There Are No Tokens For Today'},
// ];


// const TOKENS_DATA: any[] = [
//   {token: '', patient: 'There Are No Tokens For Today', doctor: ''},
// ]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'time', 'doctor'];
  displayedMessageColumns: string[] = ['sendAt', 'message'];
  displayedTokensColumns: string[] = ['token', 'patient', 'doctor'];
  appointmentsData: any;
  messagesData: any;
  tokensData: any;


  constructor(private patientService: PatientService) { }

  filter: any = [
    {
      id: "week",
      label: "Last 7 Days"
    },
    {
      id: "month",
      label: "Last 30 Days"
    },
    {
      id: "cutom",
      label: "Custom Range"
    }
  ];

  ngOnInit(): void {
    this.getAppointments();
    this.getMessagesData();
    this.getTokensData();
  }

  selectedFilter: string = "Last 7 Days";

  getAppointments() {
    this.patientService.getAppointments().subscribe((res: any) => {
      this.appointmentsData = res.appointments
    })
  }

  getMessagesData() {
    this.patientService.getMessages().subscribe((res: any) => {
      this.messagesData = res
    })
  }

  getTokensData() {
    this.patientService.getTokens().subscribe((res: any) => {
      this.tokensData = res
    })
  }

}
