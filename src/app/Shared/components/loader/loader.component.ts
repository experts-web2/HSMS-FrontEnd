import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
})
export class LoaderComponent {
  constructor(public readonly loaderService: LoaderService) {
    this.loaderService.getStatus;
  }
}
