import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent {
  @Output() mobileSerchBar: EventEmitter<any> = new EventEmitter();
  @Input() mobileSerchBarData: any;

  emitEvent() {
    // Emit the event when the button is clicked
    this.mobileSerchBar.emit();
  }
}
