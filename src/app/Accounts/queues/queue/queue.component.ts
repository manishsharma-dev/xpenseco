import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Data } from "../../../providers/data/data";
import { PagingService } from '../../../services/paging.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  model: any = {};
  loading = false;
  checkuser: any
  Booking: any; Payment: any;
  Cancellation: any; Reschedule: any;
  bking: boolean = true;
  cncl: boolean = false;
  rchdl: boolean = false;
  pmnt: boolean = false;
  constructor(private route: Router, private flightService: AccountService,private pagerService: PagingService) { }
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  pagedItems1: any[];
  pagedItems2: any[];
  pagedItems3: any[];
  ngOnInit() {
      debugger;
      this.model.AgentID = localStorage.getItem('AgentCode');
      this.checkuser = localStorage.getItem('Loginusername');
      if (this.checkuser == null) {
          this.route.navigate(['/AgentLogin']);
      }
      this.flightService.getBkngQueue(this.model)
      .subscribe(data => {
          this.Booking = data.Table;
          this.setPage(1);
      });
  }
  BookingQueue() {
      debugger;
      this.bking = true;
      this.cncl = false;
      this.rchdl = false;
      this.pmnt = false;

      this.flightService.getBkngQueue(this.model)
      .subscribe(data => {
          this.Booking = data.Table;
          this.setPage(1);
      });
  }
  CancellationQueue() {
      debugger;
      this.loading = true;
      this.flightService.getCancelQueue(this.model)
          .subscribe(data => {
              this.Cancellation = data.Table;
              this.bking = false;
              this.cncl = true;
              this.rchdl = false;
              this.pmnt = false;
              this.setPage3(1);
          })
  }
  RescheduleQueue() {
      debugger;
      this.loading = true;
      this.flightService.getRescheduleQueue(this.model)
          .subscribe(data => {
              this.Reschedule = data.Table;
              this.bking = false;
              this.cncl = false;
              this.rchdl = true;
              this.pmnt = false;
              this.setPage1(1);
          })
  }
  PaymentQueue() {
      debugger;
      this.flightService.getPaymentQueue(this.model)
          .subscribe(data => {
              this.Payment = data.Table;
              this.bking = false;
              this.cncl = false;
              this.rchdl = false;
              this.pmnt = true;
              this.loading = true;
              this.setPage2(1);
          })
  }
 
  setPage1(page: number) {
      this.pager = this.pagerService.getPager(this.Reschedule.length, page);
      this.pagedItems = this.Reschedule.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  setPage2(page: number) {
      this.pager = this.pagerService.getPager(this.Payment.length, page);
      this.pagedItems1 = this.Payment.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  setPage3(page: number) {
      this.pager = this.pagerService.getPager(this.Cancellation.length, page);
      this.pagedItems2 = this.Cancellation.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  setPage(page: number) {
      this.pager = this.pagerService.getPager(this.Booking.length, page);
      this.pagedItems3 = this.Booking.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}