import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../modules/prime-ng/prime-ng.module';

@Component({
  selector: 'app-add-prescription-dialogue',
  templateUrl: './add-prescription-dialogue.component.html',
  styleUrls: ['./add-prescription-dialogue.component.scss'],
  standalone: true,
  imports: [PrimeNgModule]
})
export class AddPrescriptionDialogueComponent implements OnInit {
  visible:boolean = false;
  @Output() show: EventEmitter<() => void> = new EventEmitter<() => void>();

  constructor(){
    
  }

  ngOnInit(): void {
    this.show.emit(this.showDialogue.bind(this));
  }

  showDialogue(): void {
    this.visible = true
  }

  hideDialogue(): void {
    this.visible = false
  }
  
}
