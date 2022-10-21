import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder) { 
    this.fb.group({
      date:[''],
      email:[''],
      dateOfBirth:[''],
      

    })
  }

  ngOnInit(): void {
  }

}
