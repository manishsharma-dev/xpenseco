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
import { Options, ChangeContext, PointerType } from 'ng5-slider';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css']
})
export class FlightResultsComponent implements OnInit {
  model: any = {};  
  minDate: Date;
  maxDate: Date;
    datepickerconfig: Partial<BsDatepickerConfig>;
    datepickerconfigto: Partial<BsDatepickerConfig>;
    AuthReq: any;
    isresult: boolean = false;
    public loading = false;
    oneway: boolean = true;
    return: boolean = false;
    Isreturn=false;
    flghtdtls: any[];
    serchData: any;
    public flresults:any;
    public onewayr:any;
    dattta: any[];
    filterresult: any[];
    filterresultO: any[];
    filterresultR: any[];
    TotalPrice: any;
    airlinename: string;
    Maxprice: number;
    Minprice: number;
    MaxpriceR: number;
    MinpriceR: number;
    flightdetails: boolean = false;
    FlightDels: any[];
    FlightRDels: any[];
    FlightR2Dels: any[];
    fldetails: boolean = true;
    Faredetail: boolean = false;
    Baggagedetail: boolean = false;
    Cancelationdetail: boolean = false;
    Datedetail: boolean = false;
    close: boolean = false;
    sId: number;
    sIdO: number;
    sIdR: number;
    lengths: number
    fdetailsary: boolean = true;
    public BookFlightO: any;
    public BookFlightR: any;
    masterrequest: any
    SegId: string;
    faredata: any;
    faredataO: any;
    faredataR: any;
    refundable: boolean = false;
    indigo: boolean = false;
    public flag: boolean = true;
    public flag1: boolean = true;
    public clients: any[];
    public clients1: any[];
    public ClientName = '';
    public ClientName1 = '';
    Oneresult: boolean = true;
    twoway: any;
    isDisabled = true;
    flightrdetails: boolean = false;
    flightr2details: boolean = false;
    flrdetails: boolean = false;
    flr2details: boolean = false;
    farebreakupO: boolean = false;
    farebreakupR: boolean = false;
    FareRuleO: boolean = false;
    FareRuleR: boolean = false;
    international="";
    returnDatehtml:any;
    pClass:boolean=false;
    userdata: any[];
    dlOpen:boolean=true;
    dlClose:boolean=false;
  
    FlightRDetailss:boolean=true;
    closetabOO:boolean=false;
  
    FlightR2Detailss:boolean=true;
    closetabRR:boolean=false;
    source:any;Derture:any;Rtun:any;Denation:any;Adlt:any;Chld:any;Infnt:any;
  
    FDetail:boolean=false;
    FDetailO:boolean=false;
    FDetailR:boolean=false;
    fbOpen:boolean=true;
    fbclose:boolean=false;
    fareBreakup: any[];
    taxserv: any;
   stopfcounter:number=0;
   stopRcounter:number=0;
   flightcounter:number=0;
    userinfo =
      {
        ClintId: "",
        Email: ""
  
      }
      FlighCount=[{
       FlightName:"",
       Count:0 
      }]
    newVar: any;
    returnVar: any;
    name = {
  
      AuthenticationData: {
        ClientID: "SMT",
        ClientType: "Direct/API",
        Service: "Flight",
        channel: "B2C"
  
      },
      Request: {
  
        Origin: "",       //   1
        Destination: "",    // 2
        DepartureDate: "",    //3
        ReturnDate: "2018/06/02",   //4
        AdultCount: "1",           //5
        ChildCount: "0",
        InfantCount: "0",
        SeniorCount: "0",
        //Type: "Domestic",
        JourneyType: "OneWay",
        PreferredCabinClass: "All",    //6
        PromotionalPlanType: "Normal",
        Currency: "INR",
        SAirportCode: "",
        SAirportName: "",
        SCountry: "",
        DCountry: "",
        SCity:"",
        DCity:"",
        clientName:"Travelfare",
        AgentId:"",
       BookingAs:""
      }
  
    }
  
    is_edit : boolean = false;
  
  
    
  
    listOfFlights: any[];
    listOfFlightsR: any[];
    lsitofFlightCount:any[];
    showfarerule: boolean = false;
    constructor(private route: Router, private flightService: FlightserviceService,private airportserv:AirportService,
      private data: Data, private activatedRoute: ActivatedRoute,private renderer: Renderer2,public datepipe: DatePipe) {
        
        this.minDate = new Date();
          this.maxDate = new Date();
          this.minDate.setDate(this.minDate.getDate());
          this.maxDate.setDate(this.maxDate.getDate()+360);
      this.datepickerconfig = Object.assign({},
        {
          showWeekNumbers: false,
          containerClass: 'theme-dark-blue',
          // dateInputFormat:'YY/MM/DD',
          date: 'yyyy-MM-dd',
          minDate: new Date(Date.now())
        });
  
    }
    disableRetunDate()
    {
      this.returnDatehtml=(document.getElementById('ToDate') as HTMLInputElement);
      this.returnDatehtml.disabled=true;
    }
    enableDate()
    {
      this.returnDatehtml=(document.getElementById('ToDate') as HTMLInputElement);
      this.returnDatehtml.disabled=false;
    }
    setToDate() {
      debugger;
     
     this.returnDatehtml=(document.getElementById('ToDate') as HTMLInputElement);
      this.returnDatehtml.disabled=false;
      this.datepickerconfigto = Object.assign({},
        {        
          showWeekNumbers: false,
          containerClass: 'theme-dark-blue',
          // dateInputFormat:'YY/MM/DD',
          date: 'yyyy-MM-dd',
          minDate: new Date(Date.parse(this.returnDatehtml) + 1),
        });
      this.twoway = "Yes";
      
    }
  
  
    getNameList(nameList: any) {
      debugger;
      alert(nameList);
    }
  
    isDisabled1(): boolean{
      return this.is_edit;
            }
  
    ngOnInit() {
      debugger
     // ((document.getElementById("ToDate") as HTMLInputElement).disabled)=true;
      if (localStorage.getItem('req') != null) 
      {
        debugger;
        this.masterrequest = JSON.parse(localStorage.getItem('req'));
        var srch=JSON.parse(localStorage.getItem('req'));
        this.source=srch.Request.Origin;
        this.Derture=srch.Request.DepartureDate;
        if(this.masterrequest.Request.JourneyType=="return")
          {
            if((document.getElementById("ToDate") as HTMLInputElement)!=null)
            ((document.getElementById("ToDate") as HTMLInputElement).disabled)=true;
           
          }
          else
          {
            this.is_edit=true;
           this.isDisabled1();
          }
        if(srch.Request.ReturnDate=="2018/06/02")
        {
          this.Rtun="Return Date";
        }
        else
        {
          this.Rtun=srch.Request.ReturnDate;
        }
        this.Denation=srch.Request.Destination;
        this.name.Request.AdultCount=srch.Request.AdultCount;
        this.name.Request.ChildCount=srch.Request.ChildCount;
        this.name.Request.InfantCount=srch.Request.InfantCount;
      }
      this.serchData = JSON.parse(localStorage.getItem('req'));    
      if (this.serchData === undefined)
       {
        this.route.navigate(['/Flights/']);
      }
      if (this.serchData != undefined) 
      {
        this.testClick(this.serchData);
        //((document.getElementById("ToDate") as HTMLInputElement).disabled)=true;
      }
    }
  
    checked() {
      return this.filterresult.filter(item => { return item.checked; });
    }
  
    getSerchResults(): void {
    }
  
  
  
    testClick(name: any) {
      debugger;
      var name=JSON.parse(localStorage.getItem('req'));
      this.masterrequest =JSON.parse(localStorage.getItem('req'));
      this.source=name.Request.Origin;
       // this.Derture=name.Request.DepartureDate;
      if (name.Request.ReturnDate == "2018/06/02") {
        this.Rtun = "Return Date";
      }
      else {
        this.Rtun = name.Request.ReturnDate;
        this.Isreturn=true;
      }
        this.Denation=name.Request.Destination;
        this.Adlt=name.Request.AdultCount;
        this.Chld=name.Request.ChildCount;
        this.Infnt=name.Request.InfantCount;
  
      this.flightService.GetFlights(name)    
        .subscribe(data => {
          this.serchData = data[0].Data;
          this.flresults=this.serchData;
          this.onewayr=this.serchData;
          localStorage.setItem("flresultsR",JSON.stringify(this.flresults));
          localStorage.setItem("serchDataO",JSON.stringify(this.flresults));
          localStorage.setItem("onewayr",JSON.stringify(this.onewayr));       
          if (data[0].Data.FlightResults == null) {
            this.filterresult = null;
            this.isresult = false;
            this.loading = false;
            alert('Sorry no results found with this search criteria !!!')
            this.route.navigate(['/Flights/']);
          }
          else {          
            this.isresult = true;
          }
          // this.isresult=true;
          this.filterresult = data[0].Data.FlightResults.Flights.Flight;
          this.filterresult = this.onewayr.FlightResults.Flights.Flight.sort((a:any,b:any)=> parseFloat(a.Fare.PublishedPrice) - parseFloat(b.Fare.PublishedPrice))
          if (this.serchData.Request.JourneyType === "return") 
          {
            this.Oneresult = false;
            this.filterresultO = this.filterresult.filter(row => row.TripIndicator==1)
            this.filterresultR = this.filterresult.filter(row => row.TripIndicator==2)       
  
            this.BookFlightO = this.filterresultO[0];
            this.BookFlightR = this.filterresultR[0];
            //this.BookFlightO=this.BookFlightO.Flights.Flight.sort((a:any,b:any)=> parseFloat(a.Fare.PublishedPrice) - parseFloat(b.Fare.PublishedPrice))
            //this.BookFlightR=this.BookFlightR.Flights.Flight.sort((a:any,b:any)=> parseFloat(a.Fare.PublishedPrice) - parseFloat(b.Fare.PublishedPrice))
            localStorage.setItem('filterresultOOrg', JSON.stringify(this.filterresultO));
            localStorage.setItem('filterresultROrg', JSON.stringify(this.filterresultR));
            this.TotalPrice = parseInt(this.BookFlightO.Fare.PublishedPrice) + parseInt(this.BookFlightR.Fare.PublishedPrice);
  
            this.oneway = false;
            this.return = true;
          }
          if (this.serchData.Request.JourneyType === "OneWay") 
          {
            this.oneway = true;
            this.return = false;
          }
          var uniquevalue = [];
          for (let sa of this.filterresult) {
            for (let se of sa.Segments.Segment) {
              uniquevalue.push(se.AirlineCode)
              
            }
          }
          let unique_array = []
          let fligtCountunique=[]
          let counter=0;
          let cnt=0;
          uniquevalue.sort()
          for (let i = 0; i < uniquevalue.length; i++) {
            debugger;
            if(i==uniquevalue.length-1) 
            fligtCountunique.push(counter); 
            if (unique_array.indexOf(uniquevalue[i]) === -1) {
            
              if(counter>1)
                {
                  fligtCountunique.push(counter);   
                  counter=1;
                }
                else if(counter==1 && unique_array[i-1]!=uniquevalue[i] )
                fligtCountunique.push(counter);
  
                unique_array.push(uniquevalue[i]); 
                counter=1;
            }
            else{
              counter++;
  
            }
  
          }
         // this.listOfFlights = unique_array
          this.listOfFlightsR = unique_array
          this.lsitofFlightCount=fligtCountunique
          localStorage.setItem('filterresultOrg', JSON.stringify(this.filterresult));
          let mydata = this.filterresultO;
          let mydataR = this.filterresultR;
          function getmaxmin() {
            return mydata.map(any => any.Fare.PublishedPrice);
          }
          function getmaxminR() {
            return mydataR.map(any => any.Fare.PublishedPrice);
          }
  
          this.Maxprice = Math.max.apply(Math, getmaxmin());
          this.Minprice = Math.min.apply(Math, getmaxmin());
  
          this.MaxpriceR = Math.max.apply(Math, getmaxminR());
          this.MinpriceR = Math.min.apply(Math, getmaxminR());
        },
  
          error => {
  
            console.log('error');
            this.loading = false;
            this.isresult = false;
          },
          () => console.log('done'),//complete
  
      )
    }
    filterByAirlineOne(ailinename: any, val: any) {
      debugger
      this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
      if(ailinename=='All')
      this.filterresult;
      else
      this.filterresult = this.filterresult.filter(row => row.Segments.Segment[0].AirlineName == ailinename);
    }
    filterByAirline(ailinename: any) {
      debugger
      if (ailinename != '') {
        if (this.serchData.Request.JourneyType === "return") {
          this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
          if(ailinename=='All')
          this.filterresultO;
          else
          this.filterresultO = this.filterresultO.filter(row => row.Segments.Segment[0].AirlineName == ailinename);
        }
        else {
          this.filterresultO = JSON.parse(localStorage.getItem('filterresultOrg'));
          if(ailinename=='All')
          this.filterresultO;
          else
          this.filterresultO = this.filterresultO.filter(row => row.Segments.Segment[0].AirlineName == ailinename);
        }
      }
      else {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultOrg'));
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
      }
    }
    filterByAirlineR(ailinename: any) {
      debugger
      if (ailinename != '') {
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
        if(ailinename=='All')
        this.filterresultR;
        else
        this.filterresultR = this.filterresultR.filter(row => row.Segments.Segment[0].AirlineName == ailinename);
        //this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
      }
    }
  //   filterBy(ailinename: any, val: any) {
  // debugger
  //     if (ailinename != '' && val.target.checked === true) {
        
  //       if (this.serchData.Request.JourneyType === "return") {
  
  //         if(this.flightcounter==0 && this.stopfcounter==0)
  //         {
  //           this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
  //           this.flightcounter=1;
  //         }
  //         else if(this.flightcounter>0 && this.stopfcounter==0)
  //         {
  //           this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
  //         }  
  //         else if (this.flightcounter>0 && this.stopfcounter>0)
  //         {
  //           this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
  //         }
  //         else
  //         {
  //           this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
  //         }
  //         this.filterresultO = this.filterresultO.filter(row => row.Segments.Segment[0].AirlineName == ailinename);
  //         if(this.filterresultO.length>0)
  //           localStorage.setItem("filterresultO",JSON.stringify(this.filterresultO))
  
  //         if(this.flightcounter==0 && this.stopRcounter==0)
  //         {
  //           this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
  //           this.flightcounter=1;
  //         }
  //         else if(this.flightcounter>0 && this.stopRcounter==0)
  //         {
  //           this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
  //         }  
  //         else if (this.flightcounter>0 && this.stopRcounter>0)
  //         {
  //           this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
  //         }
  //         else
  //         {
  //           this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
  //         }
  //         //this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
  //         this.filterresultR = this.filterresultR.filter(row => row.Segments.Segment[0].AirlineName == ailinename);
  //         if(this.filterresultR.length>0)
  //         localStorage.setItem("filterresultR",JSON.stringify(this.filterresultR))
  //       }
  //       else {
  //         if(this.flightcounter==0 && this.stopfcounter==0)
  //         {
  //           this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
  //           this.flightcounter=1;
  //         }
  //         else if(this.flightcounter>0 && this.stopfcounter==0)
  //         {
  //           this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
  //         }  
  //         else if (this.flightcounter>0 && this.stopRcounter>0)
  //         {
  //           this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
  //         }
  //         else
  //         {
  //           this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
  //         }
  //         //this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
  //         this.filterresult = this.filterresult.filter(row => row.Segments.Segment[0].AirlineName == ailinename);
  //         if(this.filterresult.length>0)
  //           localStorage.setItem("filterresult",JSON.stringify(this.filterresult))
  //       }
  //     }
  //     else {
  //       this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
  //       this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
  //       this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
  //       this.flightcounter=0;
  //     }
  //   }
    RemoveFilter() {
      debugger
      if (this.serchData.Request.JourneyType === "return")
      {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
      }
      else
      {
        this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
      }
    }
    btnBookClick = function (bookid: string) {
      debugger
      this.userdata = JSON.parse(localStorage.getItem('Logininfo'));
      var udata = JSON.parse(this.userdata._body);
     // var credit = udata.Data[0];
     // var climit=(parseFloat(credit.CreditLimit)-parseFloat(credit.CreditLimitUse))
  
        this.data.storage = this.serchData.FlightResults.Flights.Flight.filter(row => row.SegmentKey == bookid);
        this.serchData.FlightResults.Flights.Flight = this.data.storage;
        this.serchData.AuthenticationData.Channel = "B2B";
        this.data.authreq = this.serchData;
        localStorage.setItem('Booking Details', JSON.stringify(this.serchData));
        localStorage.setItem('Review Details', JSON.stringify(this.serchData));
        this.TotalPrice=this.serchData.FlightResults.Flights.Flight[0].Fare.PublishedPrice;      
     //if (climit > parseFloat(this.TotalPrice)) {
        this.route.navigate(['/FlightBooking/']);
     // }
     // else {
     //   alert("Sorry !! You don't have enough credit limit.");
     // }
    };
  
    btnBookClick1 = function (bookid: any, bookid1: any) {
      debugger
      this.userdata = JSON.parse(localStorage.getItem('Logininfo'));
      var udata = JSON.parse(this.userdata._body);
     // var credit = udata.Data[0];
     // var climit=(parseFloat(credit.CreditLimit)-parseFloat(credit.CreditLimitUse))
  
    //  if (climit > this.TotalPrice) {
        var data1 = this.serchData.FlightResults.Flights.Flight.filter(row => row.SegmentKey === bookid);
        var data2 = this.serchData.FlightResults.Flights.Flight.filter(row => row.SegmentKey === bookid1);
        this.data.storage = data2.concat(data1);
        this.serchData.FlightResults.Flights.Flight = this.data.storage;
        this.serchData.AuthenticationData.Channel = "B2C";
        this.data.authreq = this.serchData;
        localStorage.setItem('Booking Details', JSON.stringify(this.serchData));
        localStorage.setItem('Review Details', JSON.stringify(this.serchData));
        this.route.navigate(['/FlightBooking/']);
      }
     // else {
      //  alert("Sorry !! You don't have enough credit limit.");
     // }
   // }
    FDetails(bookid: any, index: number) {
      debugger
      this.fareBreakup = this.filterresult.filter(row => row.SegmentKey === bookid);
  if(this.fareBreakup[0].Price.HM!=null)
      this.taxserv=parseFloat(this.fareBreakup[0].Fare.Tax)+parseFloat(this.fareBreakup[0].Price.HM)
   else
   this.taxserv=parseFloat(this.fareBreakup[0].Fare.Tax)
  
      this.sId = index;
      this.lengths = this.fareBreakup[0].Segments.Segment.length;
  
      this.FDetail = true;
      //this.fldetails = true;
      this.fbOpen=false;
      this.fbclose=true;
    };
    closefb() {
      this.FDetail = false;
      //FDetailthis.fdetailsary = true;
      this.fbOpen=true;
      this.fbclose=false;
    }
    FDetailsO(bookid: any, index: number) {
      debugger
      this.fareBreakup = this.filterresult.filter(row => row.SegmentKey === bookid);
  
      this.taxserv=parseFloat(this.fareBreakup[0].Fare.Tax)+parseFloat(this.fareBreakup[0].Price.HM)
      this.sId = index;
      this.lengths = this.fareBreakup[0].Segments.Segment.length;
  
      this.FDetailO = true;
      //this.fldetails = true;
      this.fbOpen=false;
      this.fbclose=true;
    };
    closefbO() {
      this.FDetailO = false;
      //FDetailthis.fdetailsary = true;
      this.fbOpen=true;
      this.fbclose=false;
    }
    FDetailsR(bookid: any, index: number) {
      debugger
      this.fareBreakup = this.filterresult.filter(row => row.SegmentKey === bookid);
  
      this.taxserv=parseFloat(this.fareBreakup[0].Fare.Tax)+parseFloat(this.fareBreakup[0].Price.HM)
      this.sId = index;
      this.lengths = this.fareBreakup[0].Segments.Segment.length;
  
      this.FDetailR = true;
      //this.fldetails = true;
      this.fbOpen=false;
      this.fbclose=true;
    };
    closefbR() {
      this.FDetailR = false;
      //FDetailthis.fdetailsary = true;
      this.fbOpen=true;
      this.fbclose=false;
    }
    FlightDetails = function (bookid: any, index: number) {
      debugger
      this.FlightDetls = this.filterresult.filter(row => row.SegmentKey === bookid);
  
      this.sId = index;
      this.lengths = this.FlightDetls[0].Segments.Segment.length;
  
      this.flightdetails = true;
      this.fldetails = true;
      this.dlOpen=false;
      this.dlClose=true;
    };
    closetab() {
      this.flightdetails = false;
      this.fdetailsary = true;
      this.dlOpen=true;
      this.dlClose=false;
    }
  
    Fdetails() {
      this.fldetails = true;
      this.Faredetail = false;
      this.Baggagedetail = false;
      this.Cancelationdetail = false;
      this.Datedetail = false;
    };
  
  
    Faredetails() {
      this.fldetails = false;
  
      this.Baggagedetail = false;
      this.Cancelationdetail = false;
      this.Datedetail = false;
      this.Faredetail = true;
  
    }
    Baggagedetails(bookid: any, index: any) {
      debugger;
      this.faredata = null;
      this.data.storage = this.filterresult.filter(row => row.SegmentKey == bookid);
      this.serchData.FlightResults.Flights.Flight = this.data.storage;
      this.serchData.AuthenticationData.Channel = "B2C";
      this.data.authreq = this.data.authreq;
      this.fareClick(this.serchData);
      this.fldetails = false;
      this.Faredetail = false;
      this.sId = index;
      this.Cancelationdetail = false;
      this.Datedetail = false;
      this.Baggagedetail = true;
      this.showfarerule = true;
    }
    Cancelationdetails() {
      this.fldetails = false;
      this.Faredetail = false;
      this.Baggagedetail = false;
  
      this.Datedetail = false;
      this.Cancelationdetail = true;
    }
    Datedetails() {
      this.fldetails = false;
      this.Faredetail = false;
      this.Baggagedetail = false;
      this.Cancelationdetail = false;
  
      this.Datedetail = true;
    }
    
    onUserChangeEnd(changeContext: ChangeContext): void {
      this.getChangeContextString(changeContext);   
   } 
   onUserChangeEndR(changeContext: ChangeContext): void {
    this.getChangeContextStringR(changeContext);   
 } 
   getChangeContextString(changeContext: ChangeContext) {    
       this.myOnChange(changeContext.value,changeContext.highValue);           
   }
   getChangeContextStringR(changeContext: ChangeContext) {   
    this.myOnChangeR(changeContext.value,changeContext.highValue);           
}
   myOnChange(from: any,to:any) {
     
     debugger
     if (this.serchData.Request.JourneyType === "return") {
       this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
       this.filterresultO = this.filterresultO.filter(row => row.Fare.PublishedPrice >= from && row.Fare.PublishedPrice <= to);
       
     }
   }
   myOnChangeR(from: any,to:any) {
     debugger
     if (this.serchData.Request.JourneyType === "return")
       this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
       this.filterresultR = this.filterresultR.filter(row => row.Fare.PublishedPrice >= from && row.Fare.PublishedPrice <= to);
     }
    btnBookCheckO(check: any) {
      debugger;
      this.BookFlightO = this.filterresultO.filter(row => row.SegmentKey === check);
      this.BookFlightO = this.BookFlightO[0];
      this.TotalPrice = parseInt(this.BookFlightO.Fare.PublishedPrice) + parseInt(this.BookFlightR.Fare.PublishedPrice);
     // const parent: HTMLElement = document.getElementById('parentOne');
      //const child = parent.children[0];
     //this.renderer.setStyle(i, 'border', '2px solid #faa41f');
    }
    btnBookCheckR(check: any) {
      debugger;
      this.BookFlightR = this.filterresultR.filter(row => row.SegmentKey === check);
      this.BookFlightR = this.BookFlightR[0];
      this.TotalPrice = parseInt(this.BookFlightO.Fare.PublishedPrice) + parseInt(this.BookFlightR.Fare.PublishedPrice);
    }
    beforesix()
    {
      debugger
      var searchtime="06:00:00";
      if (this.serchData.Request.JourneyType === "return")
      {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
        this.filterresultO = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)<= searchtime);
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
        this.filterresultR = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)<= searchtime);
      }
      else
      {
        this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
        this.filterresult = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)<= searchtime);
      }
    }
    aftersix()
    {
      debugger
      var searchtime="06:00:00";
      if (this.serchData.Request.JourneyType === "return")
      {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
        this.filterresultO = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime);
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
        this.filterresultR = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime);
      }
      else
      {
        this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
        this.filterresult = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime);
      }
    }
    sixtotwelve()
    {
      debugger
      var searchtime="06:00:00";
      var searchtime1="12:00:00";
      if (this.serchData.Request.JourneyType === "return")
      {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
        this.filterresultO = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime && 
        row.Segments.Segment[0].DepDateTime.slice(11)<=searchtime1);
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
        this.filterresultR = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime && 
        row.Segments.Segment[0].DepDateTime.slice(11)<=searchtime1);
      }
      else
      {
        this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
        this.filterresult = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime && 
        row.Segments.Segment[0].DepDateTime.slice(11)<=searchtime1);
      }
    }
    twelvetosix()
    {
      debugger
      var searchtime="06:00:00";
      var searchtime1="12:00:00";
      if (this.serchData.Request.JourneyType === "return")
      {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
        this.filterresultO = this.filterresult.filter(row =>  row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime1 && 
        row.Segments.Segment[0].DepDateTime.slice(11)>=searchtime);
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
        this.filterresultR = this.filterresult.filter(row =>  row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime1 && 
        row.Segments.Segment[0].DepDateTime.slice(11)>=searchtime);
      }
      else
      {
        this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
        this.filterresult = this.filterresult.filter(row => row.Segments.Segment[0].DepDateTime.slice(11)>= searchtime1 && 
        row.Segments.Segment[0].DepDateTime.slice(11)>=searchtime);
      }
    }
    refundables() {
      debugger
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
        this.filterresultO = this.filterresult.filter(row => row.NonRefundable == "true")   
    }
    nonrefundable()
    {
      debugger
      this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
      this.filterresultR = this.filterresult.filter(row => row.NonRefundable === "false")
    }
    MailTicket(SegmentKey:any)
    {
      debugger
      this.model.txtEmail = ((document.getElementById("segMailID") as HTMLInputElement).value);//"rizwan@mageinfotech.com";
      this.model.ticketType = "Flight Invoice";
      this.data.storage = this.serchData.FlightResults.Flights.Flight.filter(row => row.SegmentKey == SegmentKey);
      this.model.mailcontent=this.data.storage;
      this.airportserv.EmailTicket(this.model)
        .subscribe(data => {
        })
    }   
  
    selectedDevice = 'two';
    selectnamefilter(newValue: any) {
      debugger;
      this.filterresult = data[0].Data.FlightResults.Flights.Flight.sort(row => row.Segments.Segment[0].AirlineName === "asc")
  
    }
    selectNoOfStops(stops: number) {
      debugger
      if (this.serchData.Request.JourneyType === "return") {
        if(this.stopfcounter==0 && this.flightcounter==0)
        {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
        this.stopfcounter=1;
          
      }
     else if( this.stopfcounter>0 && this.flightcounter==0)
      this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
      else if(this.stopfcounter>0 && this.flightcounter>0)
      this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
      else if(this.stopfcounter==0 && this.flightcounter>0)
      {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultO'));
        this.stopfcounter=1;
      }
      else
      {
        this.filterresultO = JSON.parse(localStorage.getItem('filterresultOOrg'));
        this.stopfcounter=1;
      }
        this.filterresultO = this.filterresultO.filter(row => row.Segments.Segment.length === stops)
        if(this.filterresultO.length>0) 
        localStorage.setItem("filterresultO",JSON.stringify(this.filterresultO))
      }
      else {
       
        if(this.stopfcounter==0 && this.flightcounter==0)
        {
        this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
        this.stopfcounter=1;
          
      }
     else if( this.stopfcounter>0 && this.flightcounter==0)
      this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
      else if(this.stopfcounter>0 && this.flightcounter>0)
      this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
      else if(this.stopfcounter==0 && this.flightcounter>0)
      {
        this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
        this.stopfcounter=1;
      }
      else
      {
        this.filterresult = JSON.parse(localStorage.getItem('filterresultOrg'));
        this.stopfcounter=1;
      }
  
       // this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
        this.filterresult = this.filterresult.filter(row => row.Segments.Segment.length === stops)
        if(this.filterresult.length>0)
        localStorage.setItem("filterresult",JSON.stringify(this.filterresult))
      }
    }
    selectNoOfStopsR(stops: number) {
      debugger
      if (this.serchData.Request.JourneyType === "return") {
       
        if(this.stopRcounter==0 && this.flightcounter==0)
        {
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
        this.stopRcounter=1;
          
      }
     else if( this.stopRcounter>0 && this.flightcounter==0)
      this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
      else if(this.stopRcounter>0 && this.flightcounter>0)
      this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
      else if(this.stopRcounter==0 && this.flightcounter>0)
      {
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
        this.stopRcounter=1;
      }
      else
      {
        this.filterresultR = JSON.parse(localStorage.getItem('filterresultROrg'));
        this.stopRcounter=1;
      }
       
       
        // this.filterresultR = JSON.parse(localStorage.getItem('filterresultR'));
        this.filterresultR = this.filterresultR.filter(row => row.Segments.Segment.length === stops)
        if(this.filterresultR.length>0)
        localStorage.setItem("filterresultR",JSON.stringify(this.filterresultR))
      }
    }
    isDupe(item: any) {
      // do some logic to ensure that dupe is not displayed
      return true; // if dupe
    }
  
    showfr() {
      debugger
      this.showfarerule = false;
    }
    mopen: boolean = true;
    mclose: boolean = false;
    modifyopen() {
      debugger
      this.return = false;
      this.mopen = false;
      this.mclose = true;   
    }
  
    fareClick(price: any) {
      debugger;
  
      this.flightService.GetFlihtsFareRule(price)
        .subscribe(data => {
          this.faredata = data.Data.Response.FareRules[0];
        },
  
          error => {
            console.log('error');
          },
      )
    }
    searchClient(term: any) {
      this.flag = true;
      //this.searchTerms.next(term); 
      if(term.length<2){
        return;
    }
        this.airportserv.GetAirportList(term).subscribe(
          data => {
            this.clients = data[0].Data;
          }
        );
      
    }
    searchClientd(term: any) {
      debugger;
      this.flag1 = true;
      //this.searchTerms.next(term); 
      if(term.length<2){
        return;
    }
        this.airportserv.GetAirportList(term).subscribe(
          data => {
            this.clients1 = data[0].Data;;
          }
        );
    }
    Refundable()
    {
      this.filterresultO = this.filterresultO.filter(row => row.NonRefundable=== "true")
      if(this.filterresultO.length>0) 
      localStorage.setItem("filterresultO",JSON.stringify(this.filterresultO))
    }
    onselectClient(ClientObj: any) {
      debugger;
      if (ClientObj.AirportName != 0) {
        this.ClientName = ClientObj.CityName + " " + "(" + ClientObj.AirportCode + ")";
        (document.getElementById("dest") as HTMLInputElement).value = ClientObj.AirportCode;
        (document.getElementById("arcode") as HTMLInputElement).value = ClientObj.AirportCode;
        (document.getElementById("arname") as HTMLInputElement).value = ClientObj.AirportName;
        (document.getElementById("souCountry") as HTMLInputElement).value = ClientObj.Country;
        (document.getElementById("souCity") as HTMLInputElement).value = ClientObj.CityName;
        //this.flag1 = true;  
        this.flag = true;
        this.clients = [];
      }
      else {
        return false;
      }
    }
    onChangeD() {
      debugger
      this.Origin = ((document.getElementById("Origin") as HTMLInputElement).value);
      this.Destination = ((document.getElementById("Destination") as HTMLInputElement).value);
      this.name.Request.Origin = this.Origin;
      this.name.Request.Destination = this.Destination;
      if (this.name.Request.Origin == this.name.Request.Destination) {
        alert("Origin and destination doesnot be same")
        this.name.Request.Destination = "";
        return;
      }
    }
    onselectClientd(ClientObj: any) {
     
      if (ClientObj.AirportName != 0) {
        this.ClientName1 = ClientObj.CityName + " " + "(" + ClientObj.AirportCode + ")";
        (document.getElementById("desti") as HTMLInputElement).value = ClientObj.AirportCode;
  
        (document.getElementById("desCountry") as HTMLInputElement).value = ClientObj.Country;
        (document.getElementById("desCity") as HTMLInputElement).value = ClientObj.CityName;
        //this.flag1 = true;  
        this.flag1 = true;
        this.clients1 = [];
      }
      else {
        return false;
      }
    
    }
    Origin: any
    Destination: any
    Departure: any
  
    Return: any
    total: any
    adult: number
    child: number
    infant: number
    arcode: any
    arname: any
    souCountry: any
    desCountry: any
    souCity:any
    desCity:any
    agentid:any
    SearchFlight(name: any) {
      debugger;
     this.serchData = null;
     this.filterresult = null;
      if (((document.getElementById("dest") as HTMLInputElement).value) == "") {
        this.Origin = this.masterrequest.Request.Origin;
      } else {
        this.Origin = ((document.getElementById("dest") as HTMLInputElement).value);
      }
      if (this.Destination = ((document.getElementById("desti") as HTMLInputElement).value) == "") {
        this.Destination = this.masterrequest.Request.Destination;
      } else {
        this.Destination = ((document.getElementById("desti") as HTMLInputElement).value);
      }
      if (this.Departure = ((document.getElementById("FromDate") as HTMLInputElement).value) == "") {
        this.Departure = this.masterrequest.Request.DepartureDate;
      } else {
        this.Departure = ((document.getElementById("FromDate") as HTMLInputElement).value);
      }
      if (((document.getElementById("ToDate") as HTMLInputElement).value) == "") {
        this.Return = "";
      } else {
        this.Return = ((document.getElementById("ToDate") as HTMLInputElement).value);
      }    
      this.arcode = ((document.getElementById("arcode") as HTMLInputElement).value);
      this.arname = ((document.getElementById("arname") as HTMLInputElement).value);
      if(((document.getElementById("souCountry") as HTMLInputElement).value)=="")
      {
        this.souCountry = this.masterrequest.Request.SCountry;
      }else
      {
        this.souCountry = ((document.getElementById("souCountry") as HTMLInputElement).value);
      }
      if(((document.getElementById("desCountry") as HTMLInputElement).value)=="")
      {
        this.desCountry =  this.masterrequest.Request.DCountry;
      }else
      {
        this.desCountry = ((document.getElementById("desCountry") as HTMLInputElement).value);
      }
      this.souCity=((document.getElementById("souCity") as HTMLInputElement).value);
      this.desCity=((document.getElementById("desCity") as HTMLInputElement).value);
      this.agentid= localStorage.getItem('AgentCode');
      if (this.twoway == "Yes") {
        this.Return = ((document.getElementById("ToDate") as HTMLInputElement).value);
      }
      else {
        this.Return = "";
      }
      if (this.souCountry == "India" && this.desCountry == "India") {
        name.Request.Type = "Domestic";
      }
      else {
        name.Request.Type = "International";
      }
      name.Request.Origin = this.Origin;
      name.Request.Destination = this.Destination;
      name.Request.DepartureDate = this.Departure;
      name.Request.SAirportCode = this.arcode;
      name.Request.SAirportName = this.arname;
      name.Request.SCountry = this.souCountry;
      name.Request.DCountry = this.desCountry;
      name.Request.SCity=this.souCity;
      name.Request.DCity=this.desCity;
      name.Request.AgentId= this.agentid;
      if (this.twoway=="Yes") {
        name.Request.JourneyType = "return";
        name.Request.ReturnDate = this.Return;
      }
      else
      {
        name.Request.JourneyType = "OneWay";
      }
      if (name.Request.Origin == "" || name.Request.Destination == "" || name.Request.DepartureDate == "") {
        alert("Please fill the all fields !!!")
      }
      else {
        if (name.Request.Origin == name.Request.Destination)
        {
            alert("Origin and Destination can't be same !!!")
            this.route.navigate(['/Flights']);
        }
        else
        {
        this.adult = name.Request.AdultCount; this.child = name.Request.ChildCount; this.infant = name.Request.InfantCount;
        this.total = Number(this.adult) + Number(this.child) + Number(this.infant);
        if (this.total > 9) {
          alert("Total passenger can't be more than 9 !!!!")
        }
        else {
          debugger;
          this.mclose = false;
          this.mopen = true;
          this.isresult = false;
          this.isresult
          this.data.storage = name;
          localStorage.setItem('req', JSON.stringify(this.data.storage));
          if (name.Request.Type == "International" && this.twoway == "Yes")
          {
            this.route.navigate(['/int-result']);
          }
          else if (name.Request.Type != "International" && this.twoway == "Yes")
          {
            this.route.navigate(['/FlightResults']);
          }
          else {
            this.testClick(this.serchData);
          }
        }
      }
      }
    }
    /////return code star here///
  
  
    FlightRDetails = function (bookid: any, index: number) {
      debugger
      this.FlightRDels = this.filterresultO.filter(row => row.SegmentKey === bookid);
  
      this.sIdO = index;
      this.lengths = this.BookFlightO.Segments.Segment.length;
  
      this.flightrdetails = true;
      this.flrdetails = true;
      this.FlightRDetailss=false;
      this.closetabOO=true;
    };
    FlightR2Details = function (bookid: any, index: number) {
      debugger
      this.FlightR2Dels = this.filterresultR.filter(row => row.SegmentKey === bookid);
  
      this.sIdR = index;
      this.lengths = this.BookFlightR.Segments.Segment.length;
  
      this.flightr2details = true;
      this.flr2details = true;
      this.FlightR2Detailss=false;
      this.closetabRR=true;
    };
    closetabO() {
      this.flightrdetails = false;
      this.flrdetails = false;
      this.FlightRDetailss=true;
      this.closetabOO=false;
    }
    closetabR() {
      this.flightr2details = false;
      this.flr2details = false;
      this.FlightR2Detailss=true;
      this.closetabRR=false;
    }
    fareclickO = function (bookid: any, index: number) {
      debugger
      this.FlightRDels = this.filterresultO.filter(row => row.SegmentKey === bookid);
      this.flightrdetails = true;
      this.farebreakupO = true;
    }
    fareclickR = function (bookid: any, index: number) {
      debugger
      this.FlightR2Dels = this.filterresultR.filter(row => row.SegmentKey === bookid);
      this.flightr2details = true;
      this.farebreakupR = true;
    }
    closetabfareO() {
      debugger
      this.flightrdetails = false;
      this.farebreakupO = false;
    }
    closetabfareR() {
      debugger
      this.flightr2details = false;
      this.farebreakupR = false;
    }
    fareruleO = function (bookid: any, index: number) {
      debugger
      this.faredataO = null;
      this.data.storage = this.filterresultO.filter(row => row.SegmentKey == bookid);
      this.serchData.FlightResults.Flights.Flight = this.data.storage;
      this.serchData.AuthenticationData.Channel = "B2B";
      this.data.authreq = this.data.authreq;
      this.fareClickO(this.serchData);
      this.FareRuleO = true;
      this.sIdO = index;
    }
    fareruleR = function (bookid: any, index: number) {
      debugger
      this.faredataR = null;
      this.data.storage = this.filterresultR.filter(row => row.SegmentKey == bookid);
      this.serchData.FlightResults.Flights.Flight = this.data.storage;
      this.serchData.AuthenticationData.Channel = "B2B";
      this.data.authreq = this.data.authreq;
      this.fareClickR(this.serchData);
      this.FareRuleR = true;
      this.sIdR = index;
    }
    fareClickO(price: any) {
      debugger;
  
      this.flightService.GetFlihtsFareRule(price)
        .subscribe(data => {
          this.faredataO = data.Data.Response.FareRules[0];
        },
  
          error => {
            console.log('error');
          },
      )
    }
    fareClickR(price: any) {
      debugger;
  
      this.flightService.GetFlihtsFareRule(price)
        .subscribe(data => {
          this.faredataR = data.Data.Response.FareRules[0];
        },
  
          error => {
            console.log('error');
          },
      )
    }
    farecloseO() {
      this.FareRuleO = false;
    }
    farecloseR() {
      this.FareRuleR = false;
    }
    oneaway() {
      debugger
      this.twoway = "";
     // ((document.getElementById("ToDate") as HTMLInputElement).disabled) = true;
    }
    Rturn() {
      debugger
      this.twoway = "Yes";
     // ((document.getElementById("ToDate") as HTMLInputElement).disabled) = false;
     this.isDisabled = !this.isDisabled;
      // ToDate
      // this.re   
      //this.isDisabled = !this.isDisabled;
    }
    ArA: boolean = true;
    ArD: boolean = false;
    DepA: boolean = true;
    DepD: boolean = false;
    ArrA: boolean = true;
    ArrD: boolean = false;
    DurA: boolean = true;
    DurD: boolean = false;
    PrA: boolean = true;
    PrD: boolean = false;
  
    ArAr: boolean = true;
    ArDr: boolean = false;
    DepAr: boolean = true;
    DepDr: boolean = false;
    ArrAr: boolean = true;
    ArrDr: boolean = false;
    DurAr: boolean = true;
    DurDr: boolean = false;
    PrAr: boolean = true;
    PrDr: boolean = false;
  
    ArAr2: boolean = true;
    ArDr2: boolean = false;
    DepAr2: boolean = true;
    DepDr2: boolean = false;
    ArrAr2: boolean = true;
    ArrDr2: boolean = false;
    DurAr2: boolean = true;
    DurDr2: boolean = false;
    PrAr2: boolean = true;
    PrDr2: boolean = false;
    
    shortbyAirlineOne(type: any) {
      debugger
      if (this.serchData.Request.JourneyType === "return") {
        if (type == "O") {
          this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)      
          if(this.serchData.FlightResults.Flights.Flight.length==0)
          {
            this.serchData = JSON.parse(localStorage.getItem('serchDataO'));
            this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)  
          }
          this.filterresultO = this.serchData.FlightResults.Flights.Flight.sort(row =>row.Segments.Segment[0].AirlineName === "asc")
  
          this.ArAr = false;
          this.ArDr = true;
        }
        else {
          this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          if(this.flresults.FlightResults.Flights.Flight.length==0)
          {
             this.flresults = JSON.parse(localStorage.getItem('flresultsR'));
              this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          }     
              this.filterresultR = this.flresults.FlightResults.Flights.Flight.sort(row =>row.Segments.Segment[0].AirlineName === "asc")
              this.ArAr = false;
          this.ArDr = true;
          }
      }
      else {
       
        this.filterresult = JSON.parse(localStorage.getItem('onewayr'));
        this.filterresult = this.onewayr.FlightResults.Flights.Flight.sort((a:any,b:any)=>(a.Segments.Segment[0].AirlineName<b.Segments.Segment[0].AirlineName ? -1 : 1))
        this.ArA = false;
          this.ArD = true;
      }
    }
  
    compare(a:any, b:any, isAsc:any) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
    
    shortbyDepartureOne(type: any) {
      debugger
      if (this.serchData.Request.JourneyType === "return") {
        if (type == "O") {
          this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)      
          if(this.serchData.FlightResults.Flights.Flight.length==0)
          {
            this.serchData = JSON.parse(localStorage.getItem('serchDataO'));
            this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)  
          }
          this.filterresultO = this.serchData.FlightResults.Flights.Flight.sort(row => row.DepDateTime === "asc")
        }
        else {
  
          this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          if(this.flresults.FlightResults.Flights.Flight.length==0)
          {
             this.flresults = JSON.parse(localStorage.getItem('flresultsR'));
              this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          }     
              this.filterresultR = this.flresults.FlightResults.Flights.Flight.sort(row =>row.DepDateTime === "asc")
        }
      }
      else {
        this.filterresult = JSON.parse(localStorage.getItem('onewayr'));
        this.filterresult = this.onewayr.FlightResults.Flights.Flight.sort((a:any,b:any)=> a.DepDateTime<b.DepDateTime)
        this.DepA = false;
        this.DepD = true;
      }
  
    }
    shortbyArrivalOne(type: any) {
      if (this.serchData.Request.JourneyType === "return") {
        if (type == "O") {
          this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)      
          if(this.serchData.FlightResults.Flights.Flight.length==0)
          {
            this.serchData = JSON.parse(localStorage.getItem('serchDataO'));
            this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)  
          }
          this.filterresultO = this.serchData.FlightResults.Flights.Flight.sort(row => row.ArrDateTime === "asc")
          this.ArrAr = false;
          this.ArrDr = true;
        }
        else {
          this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          if(this.flresults.FlightResults.Flights.Flight.length==0)
          {
             this.flresults = JSON.parse(localStorage.getItem('flresultsR'));
              this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          }     
              this.filterresultR = this.flresults.FlightResults.Flights.Flight.sort(row =>row.ArrDateTime === "asc")
          this.ArrAr = false;
          this.ArrDr = true;
        }
      }
      else {
        this.filterresult = JSON.parse(localStorage.getItem('onewayr'));
        this.filterresult = this.onewayr.FlightResults.Flights.Flight.sort((a:any,b:any)=> a.ArrDateTime<b.ArrDateTime)
        this.ArrA = false;
        this.ArrD = true;
      }
  
    }
    shortbyDurationOne(type: any) {
      if (this.serchData.Request.JourneyType === "return") {
        if (type == "O") {
          this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)      
          if(this.serchData.FlightResults.Flights.Flight.length==0)
          {
            this.serchData = JSON.parse(localStorage.getItem('serchDataO'));
            this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)  
          }
          this.filterresultO = this.serchData.FlightResults.Flights.Flight.sort(row => row.TDuration === "asc")
          this.DurAr = false;
          this.DurDr = true;
        }
        else {
          this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          if(this.flresults.FlightResults.Flights.Flight.length==0)
          {
             this.flresults = JSON.parse(localStorage.getItem('flresultsR'));
              this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          }     
              this.filterresultR = this.flresults.FlightResults.Flights.Flight.sort(row =>row.TDuration === "asc")
          this.DurAr = false;
          this.DurDr = true;
        }
      }
      else {
        this.filterresult = JSON.parse(localStorage.getItem('onewayr'));
        this.filterresult = this.onewayr.FlightResults.Flights.Flight.sort((a:any,b:any)=> a.TDuration>b.TDuration)
        this.DurA = false;
        this.DurD = true;
      }
  
    }
    shortbyPriceOne(type: any) {
      if (this.serchData.Request.JourneyType === "return") {
        if (type == "O") {
          this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)      
          if(this.serchData.FlightResults.Flights.Flight.length==0)
          {
            this.serchData = JSON.parse(localStorage.getItem('serchDataO'));
            this.serchData.FlightResults.Flights.Flight = this.serchData.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==1)  
          }
          this.filterresultO = this.serchData.FlightResults.Flights.Flight.sort(row =>row.Fare.PublishedPrice === "asc")
          this.PrAr = false;
          this.PrDr = true;
        }
        else {
          this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          if(this.flresults.FlightResults.Flights.Flight.length==0)
          {
             this.flresults = JSON.parse(localStorage.getItem('flresultsR'));
              this.flresults.FlightResults.Flights.Flight = this.flresults.FlightResults.Flights.Flight.filter(row =>row.TripIndicator==2)  
          }     
              this.filterresultR = this.flresults.FlightResults.Flights.Flight.sort(row =>row.Fare.PublishedPrice === "asc")
          this.PrAr = false;
          this.PrDr = true;
        }
      }
      else {
        debugger;
        this.filterresult = JSON.parse(localStorage.getItem('onewayr'));
        this.filterresult = this.onewayr.FlightResults.Flights.Flight.sort((a:any,b:any)=> parseFloat(b.Fare.PublishedPrice) - parseFloat(a.Fare.PublishedPrice))
        this.PrA = false;
        this.PrD = true;
      }
  
    }
    adlt:any;
    chld:any;
    infnt:any;
    totpassenger()
    {
        this.adlt = this.name.Request.AdultCount; this.chld = this.name.Request.ChildCount; this.infnt = this.name.Request.InfantCount;
        this.total = Number(this.adlt) + Number(this.chld)+ Number(this.infnt);
    }   
   
    openFunction()
    {
      debugger
      this.pClass=true;
    }
    closeFunction()
    {
      debugger
      this.pClass=false;
    }
    onewayy() {
      debugger
      this.twoway="";
      ((document.getElementById("ToDate") as HTMLInputElement).disabled)=true;
      ((document.getElementById("customRadioInline1") as HTMLInputElement).checked)=true;
  }
  Rturny() {
      debugger
      this.twoway="Yes";    
      this.is_edit=false;
           this.isDisabled1();
      ((document.getElementById("ToDate") as HTMLInputElement).disabled)=false;
      ((document.getElementById("customRadioInline2") as HTMLInputElement).checked)=true;
  }
  }