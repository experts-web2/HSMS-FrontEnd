import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToken } from '../models/interfaces/Token';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  tokenTrigger: BehaviorSubject<IToken | null> = new BehaviorSubject<IToken | null>(null);
  appointmentTrigger: BehaviorSubject<IToken | null> = new BehaviorSubject<IToken | null>(null);
  
  constructor() { }

  
}
