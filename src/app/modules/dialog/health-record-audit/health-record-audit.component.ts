import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/services/audit/audit.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-health-record-audit',
  templateUrl: './health-record-audit.component.html',
  styleUrls: ['./health-record-audit.component.scss'],
  standalone: true,
  imports: []
})
export class HealthRecordAuditComponent implements OnInit{
  
  healthRecordId!: string;
  healthRecodAudits: Array<IAudit> = []

  constructor (
    private readonly auditService: AuditService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig<{id: string}>,
  ) {
      
  }

  ngOnInit(): void {
    if(this.dialogConfig.data?.id) this.healthRecordId = this.dialogConfig.data?.id;
  }

  getHealthRecodAudit(){
    this.auditService.getEntityAudit<IAudit>(this.healthRecordId).subscribe({
      next: (x) => {
        this.healthRecodAudits = x;
      },
      error:(err) => {

      }
    })
  }


  close(){
    this.dialogRef.close()
  }
}


