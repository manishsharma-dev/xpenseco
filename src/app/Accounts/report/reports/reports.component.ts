import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Data } from "../../../providers/data/data";
import { PagingService } from '../../../services/paging.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  model: any = {};
  loading = false;
  checkuser:any
  public bookinglist: any;
  constructor(private route: Router, private flightService: AccountService) { }

  ngOnInit() {
      this.model.type = "Flight Bookings";
      debugger;
      this.model.agentID = localStorage.getItem('Loginusername');
      this.checkuser=localStorage.getItem('Loginusername');
      if(this.checkuser==null) 
      {
          this.route.navigate(['/']);
      }
  }

  mybooking() {
      debugger
      this.loading = true;
      this.flightService.getmybooking(this.model)
          .subscribe(data => {
              this.bookinglist = data.Table;
          })
  }
}
