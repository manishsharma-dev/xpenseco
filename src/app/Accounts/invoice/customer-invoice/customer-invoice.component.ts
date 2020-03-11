import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {
  model: any = {};
  BookingRef:any
ticketDetails: any[]
segmentDetails:any[]
passengerDetails:any[]
ticket:any;
NonRefundable:any;
maildialogue:boolean=false;
itinaryhtmlforemail:any;
constructor(private route: Router, private flightService: AccountService) { }

  ngOnInit() {
    debugger
    this.BookingRef = JSON.parse(localStorage.getItem('BookingID'));
    this.model.BookingRef=this.BookingRef;
    this.flightService.getCustomerInvoice(this.model)
            .subscribe(data => {
                this.ticketDetails = data.Table;
                this.ticket=this.ticketDetails[0];  
                this.segmentDetails=data.Table4;
                this.passengerDetails=data.Table2;
                             
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
    this.model.mailcontent=document.getElementById("cutomerInvoice").innerHTML;
    this.flightService.EmailTicket(this.model)
    .subscribe(data => {            
    })
    alert("Mail has been sent successfuly");
    this.maildialogue = false;
  }
}
}


