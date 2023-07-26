import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AlertService } from 'src/app/Services/alert/alert.service';
import { PatientService } from 'src/app/Services/patient/patient.service';
import { TokenService } from 'src/app/Services/token.service';
import { SubscriptionManagmentDirective } from 'src/app/Shared/directive/subscription-managment.directive';
import { Genders } from 'src/app/constants/enums/Gender-enum';
import { IToken } from 'src/app/models/interfaces/Token';
import { IPatient } from 'src/app/models/interfaces/patient-model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent extends SubscriptionManagmentDirective implements OnInit {
tokenId!: string;
patient!: IPatient;
token!: IToken;
constructor(private alertService: AlertService, private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly patientService: PatientService){
  super();
  this.route.params.pipe(takeUntil(this.componetDestroyed)).subscribe({
    next: (x) => {
      this.tokenId = x["tokenId"];      
    }
  })
}

ngOnInit(): void{
  if(this.tokenId) this.getToken();
}

getToken(){
  this.tokenService.getTokenById(this.tokenId).pipe(takeUntil(this.componetDestroyed)).subscribe({
    next: (x) =>{
      this.token = x;
      this.getPatient(x.patientId);
      this.markTokenAsViewd(x.id);
    }
  })
}

markTokenAsViewd(tokenId: string){
  this.tokenService.markTokenAsViewd(tokenId).subscribe({
    next: (x) => {
      console.log(x);
      
    }
  })
}

getPatient(patientId: string){
  this.patientService.getPatientById(patientId).pipe(takeUntil(this.componetDestroyed)).subscribe({
    next: (x)=>{
      console.log(x);
      this.patient = x;      
    }
  })
}

getGender(gender: Genders): string{
  return Genders[gender];
}


}
