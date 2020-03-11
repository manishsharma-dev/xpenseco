import { Component, OnInit, OnChanges,Renderer2 } from '@angular/core';
import { FlightserviceService } from '../../services/flightservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AirportService } from '../../services/airport.service';
import { parse } from 'querystring';
import { Tree } from '@angular/router/src/utils/tree';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from '@angular/common';
import { count } from 'rxjs/operator/count';
import { Data } from "../../providers/data/data";
import { data } from '../../providers/data/search-result-data';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-international-booking',
  templateUrl: './international-booking.component.html',
  styleUrls: ['./international-booking.component.css']
})
export class InternationalBookingComponent implements OnInit {
  ExcessBag:number=0;
  Meal:number=0;
  Insurance:number=0;
    FBookdata: any[];
    FBookdataD: any;
    FBookdataR: any;
    AuthReq: any;
    filterresult: any[];
    Maxprice: any;
    Minprice: any;
    finalFare: any;
    Rindex: any;
    passengerDetails: any;
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
    masterrequest: any;
    segmentLength:number;
    IfIReturn:boolean=false;
    international:any;
    ContactDetails:any;
    ContactDetails1:any;
    GST:boolean=false;  
    ispubpriceChange:boolean=false;
    priceNotChanged:boolean=true;
    baggage:any;
    meallist:any;
    userinfo =
      {
        ClintId: "",
        Email: ""
  
      }
    originone: any
    segmentindi: any
    //FlightResult : any;
    public show: boolean = false;
    public buttonName: any = 'Login';
    wordsChiled = [{
  
      Title: "",
      FirstName: "",
      LastName: "",
      Type: "",
      Nationalty:"",
      PassportNo:"",
      DateOfBirth: "02-APR-1985",
      Gender: "Male",
      PassportExpiry: "2008-03-09 16:05:07.123",
      Country: "IN",
      Meal: "--Select Meal--",
      MealFare: "0",
      MealCode: "0",
      Seat: "0",
      SeatCode: "0",
      Baggage: "--Select Baggage--",
      BaggageFare: "0",
      BaggageCode: "0",
      GSTNumber: "0",
      GSTCompanyName: "0",
      CompanyContactNo: "0",
      CompanyAddress: "0",
      CompanyEmail: "",
      Insurance:""
    }]
    words2 = [{
  
      Title: "",
      FirstName: "",
      LastName: "",
      Type: "",
      Nationalty: "",
      PassportNo: "",
      DateOfBirth: "02-APR-1985",
      Gender: "Male",
      PassportExpiry: "2008-03-09 16:05:07.123",
      Country: "IN",
      Meal: "--Select Meal--",
      MealFare: "0",
      MealCode: "0",
      Seat: "0",
      SeatCode: "0",
      Baggage: "--Select Baggage--",
      BaggageFare: "0",
      BaggageCode: "0",
      GSTNumber: "0",
      GSTCompanyName: "0",
      CompanyContactNo: "0",
      CompanyAddress: "0",
      CompanyEmail: "",
      Insurance:""
    }]
    Bookflght = {
      Email: {
        emailid: ""
      },
      Contact: {
        Mobile: ""
      },
      Passenger: {
        WSPassenger: [
          {
            Title: "Mr.",
            FirstName: "BVKSD",
            LastName: "Deepak",
            Type: "Adult",
            Nationalty:"",
            PassportNo:"",
            DateOfBirth: "02-APR-1985",
            Gender: "Male",
            PassportExpiry: "2008-03-09 16:05:07.123",
            Country: "IN",
            Meal: "--Select Meal--",
            MealFare: "0",
            MealCode: "0",
            Seat: "0",
            SeatCode: "0",
            Baggage: "--Select Baggage--",
            BaggageFare: "0",
            BaggageCode: "0",
            GSTNumber: "0",
            GSTCompanyName: "0",
            CompanyContactNo: "0",
            CompanyAddress: "0",
            CompanyEmail: "",
            Insurance:""
  
          }
        ]
      }
    }
  
    constructor(private route: Router, private flightService: FlightserviceService,  public data: Data, private _FB: FormBuilder, private activatedRoute: ActivatedRoute) {
      // this.FBookdata = this.data.storage;
  
      // this.Rindex = this.FBookdata[0].tokenId;
      //  this.AuthReq = this.data.authreq;
  
  
      // var dataid = this.FBookdata;
  
    }
  
    ngOnInit() {
      let param1 = this.activatedRoute.snapshot.queryParams["Amount"];
      let Clientid = this.activatedRoute.snapshot.queryParams["Tid"];
      let messaages = this.activatedRoute.snapshot.queryParams["Msz"];
      let mdis = this.activatedRoute.snapshot.queryParams["MID"];
      this.Bookflght.Passenger.WSPassenger[0].Country="IN";
      if (localStorage.getItem('req') != null) {
        this.masterrequest = JSON.parse(localStorage.getItem('req'));
      }
      if (Clientid != undefined) {
        this.AuthReq = JSON.parse(localStorage.getItem('PassengerBookingDetails'));
        this.AuthReq.AuthenticationData.cid = Clientid;
        this.Rindex = localStorage.getItem('tokenid');
  
        this.AuthReq.FlightResults.Flights.Flight[0].tokenId = this.Rindex;
        this.bookmyflight(this.AuthReq);
        return true;
  
      }
  
      this.lengtth = 2;
      if (localStorage.getItem('currentUser') != null) {
        if (localStorage.getItem('logininfo') != null) {
          this.userinfor = JSON.parse(localStorage.getItem('Logininfo'));
          this.Bookflght.Contact.Mobile = this.userinfor[0].Mobile;
          this.Bookflght.Email = this.userinfor[0].EmailAddress;
  
          this.signintab = false;
  
        }
      }
      if (localStorage.getItem('Booking Details') != null) {
  
        this.AuthReq = JSON.parse(localStorage.getItem('Booking Details'));
        this.data.authreq = this.AuthReq;
        this.AuthReq.AuthenticationData.cid = Clientid;
        localStorage.setItem('tokenid', this.data.authreq.FlightResults.Flights.Flight[0].tokenId);
        
        this.Adcount = this.masterrequest.Request.AdultCount;
        this.ChCount = this.masterrequest.Request.ChildCount;
        this.InfantCount = this.masterrequest.Request.InfantCount;
      }
      this.FBookdata = this.data.authreq.FlightResults.Flights.Flight;
      
      this.segmentLength=this.FBookdata[0].Segments.Segment.length;
  
        this.publlishedPrice = parseFloat(this.FBookdata[0].Fare.PublishedPrice);
        this.basefare = Number(this.FBookdata[0].Fare.BaseFare);
        this.TaxAndFees = this.publlishedPrice - this.basefare;
      this.add();
      if (this.ChCount != null) {
        this.addch();
      }
      if (this.InfantCount != null) {
        this.addInFnt();
      }
      debugger;
      this.flightService.GetFlightsMealBaggs(this.AuthReq)
      .subscribe(data => {
  debugger;
        this.baggage=data.Data.Response.Baggage[0];
        this.meallist=data.Data.Response.MealDynamic[0];
        localStorage.setItem("baggages",this.baggage);
        localStorage.setItem("Meallist",this.meallist);
        
        
      },
        error => {
          console.log('error');
        }
      )
  
      this.flightService.GetFlihtsPrice(this.AuthReq)
      .subscribe(data => {
  
        if(data.Data.FlightResults.IsPriceChange)
        {
  
          this.publlishedPrice=data.Data.FlightResults.Flights.Flight[0].Fare.PublishedPrice
          this.ispubpriceChange=true;
          this.priceNotChanged=false;
        } 
        else
        {
          this.ispubpriceChange=false;
          this.priceNotChanged=false;
          alert("Price is not changed");
        } 
        
      },
        error => {
          console.log('error');
        }
      )
    }
    addInFnt() {
      debugger
      for (var i = 0; i < this.InfantCount; i++) {
        this.words2.push({
          Title: "Mr.",
            FirstName: "BVKSD",
            LastName: "Deepak",
            Type: "Adult",
            Nationalty:"",
            PassportNo:"",
            DateOfBirth: "02-APR-1985",
            Gender: "Male",
            PassportExpiry: "2008-03-09 16:05:07.123",
            Country: "IN",
            Meal: "--Select Meal--",
            MealFare: "0",
            MealCode: "0",
            Seat: "0",
            SeatCode: "0",
            Baggage: "--Select Baggage--",
            BaggageFare: "0",
            BaggageCode: "0",
            GSTNumber: "0",
            GSTCompanyName: "0",
            CompanyContactNo: "0",
            CompanyAddress: "0",
            CompanyEmail: "",
            Insurance:""
  
        });
      }
    }
    addch() {
      debugger
      for (var i = 0; i < this.ChCount; i++) {
        this.words2.push({
          Title: "Mr.",
          FirstName: "BVKSD",
          LastName: "Deepak",
          Type: "Adult",
          Nationalty:"",
          PassportNo:"",
          DateOfBirth: "02-APR-1985",
          Gender: "Male",
          PassportExpiry: "2008-03-09 16:05:07.123",
          Country: "IN",
          Meal: "--Select Meal--",
          MealFare: "0",
          MealCode: "0",
          Seat: "0",
          SeatCode: "0",
          Baggage: "--Select Baggage--",
          BaggageFare: "0",
          BaggageCode: "0",
          GSTNumber: "0",
          GSTCompanyName: "0",
          CompanyContactNo: "0",
          CompanyAddress: "0",
          CompanyEmail: "",
          Insurance:""
  
        });
      }
    }
    add() {
  debugger
      for (var i = 0; i < this.Adcount - 1; i++) {
        this.words2.push({
          Title: "Mr.",
            FirstName: "BVKSD",
            LastName: "Deepak",
            Type: "Adult",
            Nationalty:"",
            PassportNo:"",
            DateOfBirth: "02-APR-1985",
            Gender: "Male",
            PassportExpiry: "2008-03-09 16:05:07.123",
            Country: "IN",
            Meal: "--Select Meal--",
            MealFare: "0",
            MealCode: "0",
            Seat: "0",
            SeatCode: "0",
            Baggage: "--Select Baggage--",
            BaggageFare: "0",
            BaggageCode: "0",
            GSTNumber: "0",
            GSTCompanyName: "0",
            CompanyContactNo: "0",
            CompanyAddress: "0",
            CompanyEmail: "",
            Insurance:""
  
        });
      }
    }
  
    toggle() {
      this.show = !this.show;
  
      // CHANGE THE NAME OF THE BUTTON.
      if (this.show)
        this.buttonName = "Hide";
      else
        this.buttonName = "Login";
    }
    testClick(price: any, Rndex: any) {
      debugger;
      //this.loaderService.display(true);
      //  this.loading = true;
      this.flightService.GetFlihtsFareRule(price)
        // this.loaderService.display(false);
        .subscribe(data => {
          //this.serchData = data[0].Data;
          //  if(data.Data.FlightResults === null)
          //  {
          //   this.route.navigate(['/Flight']);
          //   return false;
          //  }
          this.filterresult = data.Data.FlightResults.Flights.Flight;
          this.data.authreq.FlightResults.Flights.Flight = this.filterresult;
          this.data.authreq.FlightResults.Flights.Flight[0].tokenId = this.filterresult[0].tokenId;
  
          this.FBookdata = this.data.authreq.FlightResults.Flights.Flight;
          this.FBookdataD = this.FBookdata;
  
  
          this.FBookdataD = this.FBookdataD[0];
  
          if (this.data.authreq.Request.JourneyType === 'return') {
            this.FBookdataD = this.FBookdata.filter(row => row.Segments.Segment[0].Origin.AirportCode === this.data.authreq.Request.Origin);
  
  
            this.FBookdataD = this.FBookdataD[0];
  
            this.FBookdataR = this.FBookdata.filter(row => row.Segments.Segment[0].Origin.AirportCode === this.data.authreq.Request.Destination);
            this.FBookdataR = this.FBookdataR[0];
          }
  
          if (this.data.authreq.Request.JourneyType === 'return') {
            this.publlishedPrice = parseFloat(this.FBookdataD.Fare.PublishedPrice) + parseFloat(this.FBookdataR.Fare.PublishedPrice);
  
            this.basefare = parseFloat(this.FBookdataD.Fare.BaseFare) + parseFloat(this.FBookdataR.Fare.BaseFare)
  
            this.TaxAndFees = this.publlishedPrice - this.basefare;
          }
          else {
            this.publlishedPrice = parseFloat(this.FBookdataD.Fare.PublishedPrice);
  
            this.basefare = parseFloat(this.FBookdataD.Fare.BaseFare);
  
            this.TaxAndFees = this.publlishedPrice - this.basefare;
          }
  
  
          // var Concatresult=  this.FBookdataD.concat(this.FBookdataR);
  
          this.AuthReq.FlightResults.Flights.Flight = this.FBookdata;
  
          this.finalFare = this.filterresult.filter(row => row.SegmentKey == Rndex);
          // let mydata = this.filterresult;
          this.CheckpriceC = true;
          this.CheckpriceR = false;
          return true;
          // for(var i = 0; i < this.filterresult.length; i++){
          //   this.Maxprice = Math.max(this.filterresult[i].Fare.PublishedPrice);
          //   this.Minprice = Math.min(this.filterresult[i].Fare.PublishedPrice);
          // };
          // let fdata = mydata.FlightResults.Flights.Flight;
        },
  
          error => {
            //error
            console.log('error');
            // this.loading = false;
          },
        // () => console.log('done'),//complete
        // () => this.loading = false
      )
    }
  
    bookflight() {
      debugger
      var buyerEmail = 'abc@gmail.com';
      var buyerPhone = '8989898989';
      var buyerFirstName = 'ABCD';
      var buyerLastName = 'KYZ';
      var amount = '52.10';
      var orderid = "QAZAMP";
      if (this.priceNotChanged == true) {
        alert("Wait untill price change !!!");
      }
      else
      {
      this.international='Yes';
      this.Rindex = this.FBookdata[0].tokenId;
      this.Bookflght.Passenger.WSPassenger = this.words2;
      localStorage.setItem('PassengerData', JSON.stringify(this.Bookflght.Passenger.WSPassenger))
      localStorage.setItem('international', JSON.stringify(this.international))
      // this.Bookflght;
      //  this.data.authreq.FlightResults.Flights.Flight[0].TokanId = this.Rindex;
      this.AuthReq.FlightResults.Flights.Flight[0].tokenId = this.Rindex;
      let Clientid = this.activatedRoute.snapshot.queryParams["CID"];
      if (Clientid == undefined) {
        Clientid = "";
        this.AuthReq.AuthenticationData.cid = Clientid;
      }
      this.AuthReq = Object.assign(this.AuthReq, this.Bookflght);
  
      localStorage.setItem('PassengerBookingDetails', JSON.stringify(this.AuthReq))
  
      // this.flightService.GetFlihtsBookDetails(this.AuthReq)
      //   .subscribe(data => {
      //     orderid = data.Data.Bookingref;
          amount = this.publlishedPrice.toString() + ".00";
          var emilid = JSON.stringify(this.Bookflght.Email);
          emilid = JSON.parse(emilid);
          buyerEmail = emilid;
          buyerFirstName = this.Bookflght.Passenger.WSPassenger[0].FirstName;
          buyerLastName = this.Bookflght.Passenger.WSPassenger[0].LastName;
          buyerPhone = this.Bookflght.Contact.Mobile;
          this.ContactDetails=buyerEmail;
          this.ContactDetails1=buyerPhone;
          localStorage.setItem('ContactDetails', JSON.stringify(this.ContactDetails))
          localStorage.setItem('ContactDetails1', JSON.stringify(this.ContactDetails1))
          this.route.navigate(['/ReviewBooking']);
      //   },
      //     error => {
      //       console.log('error');
      //     },
      // )
    }
  }
    SignInn() {
      this.signin = true;
    };
    logininfo() {
      this.flightService.userAuthentication(this.LoginInfo.username, this.LoginInfo.password)
        .subscribe(data => {
          localStorage.setItem('clientname', this.LoginInfo.username);
          this.userinfo.Email = this.LoginInfo.username;
          this.flightService.getUserInfo(this.userinfo).subscribe(
            data => {
              this.Bookflght.Contact.Mobile = data[0].Mobile;
              this.Bookflght.Email = data[0].EmailAddress;
              localStorage.setItem('Logininfo', JSON.stringify(data));
            })
          this.signin = false;
          this.signintab = false;
        },
          (err: HttpErrorResponse) => {
            this.isLoginError = true;
          });
    }
    bookmyflight(detailspage: any) {
      this.flightService.GetFlihtsBookDetails(detailspage)
        // this.loaderService.display(false);
        .subscribe(data => {
          //this.serchData = data[0].Data;
  
          this.data.pnrdetails = data;
          localStorage.setItem('PnrDetailsss', JSON.stringify(this.data.pnrdetails));
          this.route.navigate(['/ThankYou']);
          //this.filterresult = data[0].Data.FlightResults.Flights.Flight;
  
        },
  
          error => {
            //error
            console.log('error');
            // this.loading = false;
          });
    }
    GstDetails()
    {
      this.GST=true;
    }
    mealcalprice() {
      debugger
      var meal = this.Bookflght.Passenger.WSPassenger[0].Meal;
      if (meal != "0" || meal != undefined) {
        var meales=meal.split(",");
        meal=meales[3];
        this.publlishedPrice = Number(this.publlishedPrice) + Number(meal);
        this.Meal = Number(meal);
        this.words2[0].Meal = meales[0];
        this.words2[0].MealCode = meales[1];
        this.words2[0].MealFare = meales[3];
      }
    }
    bagcalprice()
    {
      debugger
      var Baggage=this.Bookflght.Passenger.WSPassenger[0].Baggage;
      if(Baggage!="0" || Baggage!=undefined)
      {
        var bages=Baggage.split("-");
        Baggage=bages[2];
        this.publlishedPrice=Number(this.publlishedPrice)+Number(Baggage);
        this.ExcessBag=Number(Baggage);      
        this.words2[0].Baggage="";
        this.words2[0].BaggageCode=bages[0];
        this.words2[0].BaggageFare=bages[2];
      }
    }
    calPrice() {
      debugger
      this.AuthReq = JSON.parse(localStorage.getItem('Booking Details'));
      var AdultCount=this.AuthReq.Request.AdultCount;
      var ChildCount=this.AuthReq.Request.ChildCount;
      var InfantCount=this.AuthReq.Request.InfantCount;
      var actPrice = this.publlishedPrice;
      var totalPassenger=Number(AdultCount)+Number(ChildCount)+Number(InfantCount);
      var ic=161;
      this.Insurance=totalPassenger*Number(ic);
  
      this.words2[0].Insurance=this.Insurance.toString();
  
      this.publlishedPrice=Number(this.publlishedPrice)+this.Insurance+this.ExcessBag+this.Meal;
      localStorage.setItem('Insurance', JSON.stringify(this.Insurance));
    }
    NoCalPrice() {
      debugger
      var insurance=JSON.parse(localStorage.getItem('Insurance'));
      if(insurance!=null || insurance!=undefined || 0)
      {
        this.publlishedPrice=Number(this.publlishedPrice)-insurance;
        this.Insurance=0;
        this.words2[0].Insurance="0";
        localStorage.setItem('Insurance', JSON.stringify(this.Insurance));
      }
    }
      fillpassenger() {
        debugger
        if (localStorage.getItem('pdtl') != null) {
          this.passengerDetails = JSON.parse(localStorage.getItem('pdtl'));
          var PD = this.passengerDetails[0];
          this.words2[0].Title= PD.title;
          this.words2[0].FirstName= PD.firstname;
          this.words2[0].LastName= PD.lastname;
          this.Bookflght.Contact.Mobile = PD.mobile;
          this.Bookflght.Email.emailid=PD.emplemail;
         
          ((document.getElementById("btnBookNow") as HTMLInputElement).disabled) = false;
          ((document.getElementById("Title") as HTMLInputElement).disabled)=true;
          ((document.getElementById("FirstName") as HTMLInputElement).disabled)=true;
          ((document.getElementById("LastName") as HTMLInputElement).disabled)=true;
          ((document.getElementById("email") as HTMLInputElement).disabled)=true;
          ((document.getElementById("Mobile") as HTMLInputElement).disabled)=true;
    
        }
    }
  }