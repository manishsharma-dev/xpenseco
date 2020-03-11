import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit {

  model: any = {};
  BookingRef:any
ticketDetails: any[]
segmentDetails:any[]
ticket:any;
maildialogue:boolean=false;
itinaryhtmlforemail:any;
totAmount:any;
constructor(private route: Router, private flightService: AccountService) { }

  ngOnInit() {
    debugger
    this.BookingRef = JSON.parse(localStorage.getItem('BookingID'));
    this.model.BookingRef = this.BookingRef;

    this.flightService.getTicketDetailsPrint(this.model)
      .subscribe(data => {
        this.ticketDetails = data.Table;
        this.segmentDetails = data.Table1;
        this.ticket = this.ticketDetails[0];
        this.totAmount = this.ticket.NetAMt;
      })
  }
  printComponent(cmpName:any) {
    debugger
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    //window.print();
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
    this.model.mailcontent=document.getElementById("ticketholder").innerHTML;
    this.flightService.EmailTicket(this.model)
    .subscribe(data => {            
    })
    alert("Mail has been sent successfuly");
    this.maildialogue = false;
  }
}
}

