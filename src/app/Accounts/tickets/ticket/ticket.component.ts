import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  model: any = {};
  BookingRef:any
ticketDetails: any[]
bookingMaster:any[]
passengerMaster:any[]
itineraryDetails:any[]
segmentDetails:any[]
ticket:any;
NonRefundable:any;
maildialogue:boolean=false;
itinaryhtmlforemail:any;
constructor(private route: Router, private flightService: AccountService) { }

  ngOnInit() {
    debugger
    this.BookingRef = JSON.parse(localStorage.getItem('BookingID'));
    this.model.ServiceType="Flight";
    this.model.BookingRef=this.BookingRef;
    this.flightService.getCustomerInvoice(this.model)
            .subscribe(data => {
                this.ticketDetails = data.Table;
                this.ticket=this.ticketDetails[0]; 
                this.bookingMaster=data.Table1;
                this.passengerMaster=data.Table2;
                this.itineraryDetails=data.Table3;
                this.segmentDetails=data.Table4;               
            })
  }
  printComponent(cmpName:any) {
    debugger
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    
    document.body.innerHTML = originalContents;
}
  emaildialog() {
    this.maildialogue = true;
  }
  closeemaildialog() {
    this.maildialogue = false;
  }
  sendemail() {
    debugger
    if (((document.getElementById("txtEmail") as HTMLInputElement).value)== "undefined") {
      alert("Please enter a valid email id");
    }
    else {
      this.model.ticketType="Flight Invoice";
      this.model.mailcontent=document.getElementById("itinaryhtmlforemail").innerHTML;
      this.flightService.EmailTicket(this.model)
      .subscribe(data => {            
      })
      alert("Mail has been sent successfuly");
      this.maildialogue = false;
    }
  }
}