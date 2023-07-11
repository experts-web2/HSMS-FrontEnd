import { Component } from '@angular/core';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent {
  selectedItem:any;
  suggestions:any[]=[];
  search(event:any){
    this.suggestions = [...Array(10).keys()].map(x=> event.query+'-'+x);
    
  }
}
