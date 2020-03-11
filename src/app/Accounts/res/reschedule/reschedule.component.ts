import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css']
})
export class RescheduleComponent implements OnInit {
  model: any = {};
  cancRequest:any;
  BookingRef: any
  ticketDetails: any[]
  segmentDetails: any[]
  passengerDetails: any[]
  ticket: any;
  NonRefundable: any;
  AgentID:any;
  passangerCancel:any;
  
  constructor(private route: Router, private flightService: AccountService) { }

  ngOnInit() {
    debugger
    this.BookingRef = JSON.parse(localStorage.getItem('BookingID'));
    this.AgentID = localStorage.getItem('AgentCode');
   this.model.BookingRef = this.BookingRef;
   
    this.flightService.getCancelTicket(this.model)
      .subscribe(data => {
        this.ticketDetails = data.Table;
        this.ticket= this.ticketDetails[0];
        this.segmentDetails = data.Table1;
        this.passengerDetails = data.Table2;

      })
  }
  Reschedule()
  {
    debugger
    this.passangerCancel="";
    var pdetls;
    for (var i = 0; i<this.passengerDetails.length; i++) {
      if(this.passengerDetails[i].YId!="undefined")
      {        
      var id = this.passengerDetails[i].YId;
        pdetls = ((document.getElementById(id) as HTMLInputElement));
      }
      if (pdetls.checked == true) {
        this.passangerCancel=this.passangerCancel+','+id;
      }
    }    
    this.model.PassengerID=this.passangerCancel;
    this.model.CancelType="Reschedule";
    this.model.BookingRef=JSON.parse(localStorage.getItem('BookingID'));
    this.model.AgentID=localStorage.getItem('AgentCode');
    this.flightService.RescheduleRequest(this.model)
        .subscribe(data => {
            var id = data;
            this.model = {};
            alert("Reschedule request has been submited successfully");
        })
  }
  
}
