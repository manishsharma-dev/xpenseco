import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Data } from "../../providers/data/data";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from "@angular/core";
import { FlightserviceService } from '../../services/flightservice.service';

@Component({
  selector: 'app-review-booking',
  templateUrl: './review-booking.component.html',
  styleUrls: ['./review-booking.component.css']
})
export class ReviewBookingComponent implements OnInit {
  ExcessBag:number=0;
  Meal:number=0;
  Insurance:number=0;
  model: any = {};
  ticketDetails: any[]
  segmentDetails: any[]
  passengerDetailss: any[]
  ticket: any;
  ticketData: any[]
  FBookdata: any[];
  FBookdataD: any[];
  FBookdataR: any;
  AuthReq: any;
  filterresult: any[];
  Maxprice: any;
  Minprice: any;
  finalFare: any;
  Rindex: any;
  isLoginError: boolean = false;
  Adcount: number;
  ChCount: number;
  InfantCount: number;
  signin: boolean = false;
  LoginInfo: any = {};
  lengtth: number;
  signintab: boolean = true;
  searchForm: FormGroup;
  CheckpriceR: boolean = true;
  CheckpriceC: boolean = false;
  publlishedPrice: number;
  TaxAndFees: number;
  IfReturn: boolean = false;
  basefare: number;
  userinfor: any;
  passengerData: any;
  isBtnDisable:boolean=true;
  passengerDetails: any;
  ContactDetails: any;
  ContactDetails1: any;
  EMailID: any;
  Phone: any;
  return: boolean = false;
  userdata: any;
  ispubpriceChange: boolean = false;
  priceNotChanged: boolean = true;
  paymentMethodType: any;
  pstatus:any;
  constructor(public data: Data, private route: Router, private activatedRoute: ActivatedRoute, private flightService: FlightserviceService) { }
  Adultdtl = {
    paymentmethod: ""
  }
  ngOnInit() {
    debugger;
    let param1 = this.activatedRoute.snapshot.queryParams["Amount"];
    let Clientid = this.activatedRoute.snapshot.queryParams["Tid"];
    let messaages = this.activatedRoute.snapshot.queryParams["Msz"];
    let mdis = this.activatedRoute.snapshot.queryParams["MID"];
    this.pstatus = this.activatedRoute.snapshot.queryParams["status"];
    
    if(this.pstatus=="Ok")
    {
      alert("Dear customer your payment successfully succeded.")
      if (localStorage.getItem('PassengerBookingDetails') != null)
      {
      this.AuthReq = JSON.parse(localStorage.getItem('PassengerBookingDetails'));
      }
      this.AuthReq.Request.status="Ok";
      this.AuthReq.Request.PaymentMode="PaymentGetway";
      this.flightService.GetFlihtsBookDetails(this.AuthReq)
            .subscribe(data => {
            //var  orderid = data.Data.Bookingref;
              alert("Booking Successful");
              this.model.BookingRef = this.AuthReq.Request.BookingId;
              this.flightService.getCustomerInvoice(this.model)
                .subscribe(data => {
                  this.ticketData = data;
                  localStorage.setItem('ticketData', JSON.stringify(this.ticketData))
                  this.route.navigate(['/FThankYou']);
                })
            },
              error => {
                console.log('error');
              },
          )
    }

    if (localStorage.getItem('PassengerBookingDetails') != null) {
      this.AuthReq = JSON.parse(localStorage.getItem('PassengerBookingDetails'));
      this.data.authreq = this.AuthReq;
      this.AuthReq.AuthenticationData.cid = Clientid;
      localStorage.setItem('tokenid', this.data.authreq.FlightResults.Flights.Flight[0].tokenId);
      //  this.FBookdata = this.data.storage;
      this.FBookdata = this.data.authreq.FlightResults.Flights.Flight;
      this.FBookdataD = this.FBookdata[0];
      if (this.AuthReq.Request.JourneyType == "return" && this.data.authreq.Request.Type==='Domestic') {
        this.FBookdataR = this.FBookdata[1];
        this.return=true;
        
      }
      if (this.data.authreq.Request.JourneyType === 'return' && this.data.authreq.Request.Type==='Domestic') {
        this.publlishedPrice = parseFloat(this.FBookdata[0].Fare.PublishedPrice) + parseFloat(this.FBookdata[1].Fare.PublishedPrice);

        this.basefare = parseFloat(this.FBookdata[0].Fare.BaseFare) + parseFloat(this.FBookdata[1].Fare.BaseFare)

        this.TaxAndFees = this.publlishedPrice - this.basefare;
      }
      else {
        this.publlishedPrice = parseFloat(this.FBookdata[0].Fare.PublishedPrice);
      this.basefare = parseFloat(this.FBookdata[0].Fare.BaseFare);
      this.TaxAndFees = this.publlishedPrice - this.basefare;
      }
     

      this.passengerData = JSON.parse(localStorage.getItem('PassengerData'));
      this.passengerDetails = this.passengerData[0];

      this.ContactDetails = JSON.parse(localStorage.getItem('ContactDetails'));
      this.ContactDetails1 = JSON.parse(localStorage.getItem('ContactDetails1'));
      this.EMailID = this.ContactDetails.emailid;
      this.Phone = this.ContactDetails1;
    }
  }
  bookflight() {
    debugger
    this.isBtnDisable=false;
    this.paymentMethodType = this.Adultdtl.paymentmethod;
    // if (this.paymentMethodType == null || this.paymentMethodType == "" || this.paymentMethodType == undefined) {
    //   alert("Please select payment method by credit limit or card !!!")
    // }
    // else 
    {
      let random = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
      var buyerEmail = this.EMailID;
      var buyerPhone = this.Phone;
      var buyerFirstName = 'ABCD';
      var buyerLastName = 'KYZ';
      var amount=((document.getElementById("pprice") as HTMLInputElement).value)+".00";
      var TransactionID ="E"+random;    
      this.AuthReq.Request.BookingId=TransactionID;
      var currency = "INR";
      if (this.paymentMethodType == "PaymentGetway" || this.paymentMethodType=="" || this.paymentMethodType == null || this.paymentMethodType == "" || this.paymentMethodType == undefined) {
        this.AuthReq.Request.PaymentMode="PaymentGetway";
        this.AuthReq.Request.status="";
        this.flightService.GetFlihtsBookDetails(this.AuthReq)
        .subscribe(data => {
          window.location.href = 'http://payment.sourcemytrip.com/SubpaisaPay.aspx?' + 'amount=' + amount + '&&' + 'currency=' + currency + '&&' + 'cCode=' + this.AuthReq.Request.AgentId+'&&'+'TransactionID='+TransactionID;
          var status; 
        },
          error => {
            console.log('error');
          },
      )
             
      }
      if (this.paymentMethodType == "CreditLimit12") {
        this.AuthReq = JSON.parse(localStorage.getItem('PassengerBookingDetails'));
      this.AuthReq.Request.BookingId=TransactionID;
      this.AuthReq.Request.PaymentMode="CreditLimit";
      this.AuthReq.Request.status="";
      this.AuthReq.Request.ReqID=JSON.parse(localStorage.getItem('REQID'));
        this.flightService.GetFlihtsBookDetails(this.AuthReq)
          .subscribe(data => {
            alert("Booking Successful");
            this.model.BookingRef = this.AuthReq.Request.BookingId;
            this.flightService.getCustomerInvoice(this.model)
              .subscribe(data => {
                this.ticketData = data;
                localStorage.setItem('ticketData', JSON.stringify(this.ticketData))
                this.route.navigate(['/FThankYou']);
              })
          },
            error => {
              console.log('error');
            },
        )
      }
      
    }
  }
  international:any;
  cancel()
  {
    debugger
    this.international = JSON.parse(localStorage.getItem('international'));
    if(this.international=="Yes")
    {
      this.route.navigate(['/Book-Flights']);
    }
    else
    {
      this.route.navigate(['/Book-Flight']);
    }
  }
}
