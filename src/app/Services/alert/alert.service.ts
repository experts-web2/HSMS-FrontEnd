import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService: MessageService) {}

  success(message: string, summary?: string, life?: number, styleClass?: string, sticky?: boolean, closeable?: boolean, icon?: string, key?:string) {    
    this.messageService.add({
      severity: 'success',
      summary: summary || 'Success',
      detail: message,
      life: life || 3000,
      sticky: sticky,
      styleClass: styleClass,
      closable: closeable,
      icon: icon,
      key: key
    });
  }

  info(message: string, summary?: string, life?: number, styleClass?: string, sticky?: boolean, closeable?: boolean, icon?: string, key?:string) {
    this.messageService.add({
      severity: 'info',
      summary: summary || 'Info',
      detail: message,
      life: life || 3000,
      sticky: sticky,
      styleClass: styleClass,
      closable: closeable,
      icon: icon,
      key: key
    });
  }

  warning(message: string, summary?: string, life?: number, styleClass?: string, sticky?: boolean, closeable?: boolean, icon?: string, key?:string) {
    this.messageService.add({
      severity: 'warn',
      summary: summary || 'Warning',
      detail: message,
      life: life || 3000,
      sticky: sticky,
      styleClass: styleClass,
      closable: closeable,
      icon: icon,
      key: key
    });
  }

  error(message: string, summary?: string, life?: number, styleClass?: string, sticky?: boolean, closeable?: boolean, icon?: string, key?:string) {
    this.messageService.add({
      severity: 'error',
      summary: summary || 'Error',
      detail: message,
      life: life || 3000,
      sticky: sticky,
      styleClass: styleClass,
      closable: closeable,
      icon: icon,
      key: key
    });
  }

}
