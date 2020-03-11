import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators,NgForm} from '@angular/forms'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  minDate: Date;
  maxDate: Date; 
  bsValue: any;
  datepickerconfig: Partial<BsDatepickerConfig>;
  datepickerconfigto: Partial<BsDatepickerConfig>;
  constructor(private formBuilder: FormBuilder) { 

    this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setDate(this.minDate.getDate());
        this.maxDate.setDate(this.maxDate.getDate()+360);
        this.datepickerconfig = Object.assign({},
            {
                showWeekNumbers:false,
                containerClass: 'theme-dark-blue',
                // dateInputFormat:'YY/MM/DD',
                date: 'yyyy-MM-dd',
                minDate: new Date(Date.now())
            });


  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            dateFrom: ['', Validators.required],
            dateTo: ['', Validators.required],
        });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)')
  }

}
