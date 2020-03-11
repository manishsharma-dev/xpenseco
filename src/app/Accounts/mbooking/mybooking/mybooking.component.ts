import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Data } from "../../../providers/data/data";
import { PagingService } from '../../../services/paging.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {
  model: any = {};
  loading = false;
  checkuser: any
  public bookinglist: any;
  bookingid: any;
  IsHotel:boolean=false;
  IsPackage:Boolean=false;
  IsFlight:Boolean=false;
  constructor(private route: Router, private aservice: AccountService,private pageserv: PagingService, private _FB: FormBuilder) { }
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  ngOnInit() {
      debugger;
      this.model.DateFrom="";
      this.model.DateTo="";
      this.model.Report="Select";
      this.model.ServiceType="Flight";
      this.model.type="Select Booking Type";
      this.model.CheckInDate="";
      this.model.CheckOutDate="";
      this.model.agentID = localStorage.getItem('AgentCode');
      this.checkuser = localStorage.getItem('Loginusername');
      if (this.checkuser == null) {
          this.route.navigate(['/']);
      }
    //   this.aservice.getmybooking(this.model)
    //   .subscribe(data => {
    //       this.bookinglist = data.Table;
    //       this.setPage(1);
    //       if( this.bookinglist[0].ServiceType=='Hotel')
    //       {
    //          this.IsHotel=true;
    //          this.IsPackage=false;
    //          this.IsFlight=false;
    //       }
    //       if( this.bookinglist[0].ServiceType=='Package')
    //       {
    //           this.IsPackage=true;
    //           this.IsHotel=false;
    //           this.IsFlight=false;

    //       }
    //       if( this.bookinglist[0].ServiceType=='Flight')
    //       {
    //           this.IsPackage=false;
    //           this.IsHotel=false;
    //           this.IsFlight=true;

    //       }
    //   })
  }

  mybooking() {
      debugger
      this.loading = true;
      this.model.Report = "Select";
      this.aservice.getmybooking(this.model)
          .subscribe(data => {
              this.bookinglist = data.Table;
              this.setPage(1);
              if( this.bookinglist[0].ServiceType=='Hotel')
              {
                 this.IsHotel=true;
                 this.IsPackage=false;
                 this.IsFlight=false;
              }
              if( this.bookinglist[0].ServiceType=='Package')
              {
                  this.IsPackage=true;
                  this.IsHotel=false;
                  this.IsFlight=false;

              }
              if( this.bookinglist[0].ServiceType=='Flight')
              {
                  this.IsPackage=false;
                  this.IsHotel=false;
                  this.IsFlight=true;

              }
          })
  }
  setPage(page: number) {
      // get pager object from service
      this.pager = this.pageserv.getPager(this.bookinglist.length, page);
      // get current page of items
      this.pagedItems = this.bookinglist.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  getinfo(BookingRef: any) {
      debugger
      this.bookingid = BookingRef;
      localStorage.setItem('BookingID', JSON.stringify(this.bookingid));
      localStorage.setItem('sType',this.bookinglist[0].ServiceType);
      if (this.model.Report == "Ticket") {
          this.route.navigate(['/Ticket']);
      }
      else if (this.model.Report == "InvoicePrint") {
          this.route.navigate(['/TicketPrint']);
      }
      else if (this.model.Report == "CustomerInvoice") {
          this.route.navigate(['/CustomerInvoice']);
      }
      else if (this.model.Report == "Cancel") {
          this.route.navigate(['/CancelRequest']);
      }
      else if (this.model.Report == "Reschedule") {
          this.route.navigate(['/Reschedule']);
      }
  }
}


