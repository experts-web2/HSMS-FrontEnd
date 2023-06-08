import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../State/user/user.service';
import { LoaderService } from '../../Services/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private loaderService:LoaderService) { }

  ngOnInit(): void {
  }
}
