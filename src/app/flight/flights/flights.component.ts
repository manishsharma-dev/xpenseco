import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators,NgForm,FormsModule} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { AirportService } from '../../services/airport.service';
import { Data } from "../../providers/data/data";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
    minDate: Date;
    maxDate: Date;
   
    datepickerconfig: Partial<BsDatepickerConfig>;
    datepickerconfigto: Partial<BsDatepickerConfig>;
    checkuser: any
    model: any = {};
    public clients: any[];
    public clients1: any[];
    nameId: "";
    serchData: any;
    public ClientName = '';
    public ClientName1 = '';
    nameList: any;
    private searchTerms: any[];
    public flag: boolean = true;
    public flag1: boolean = true;
    flightoneway: boolean = true;
    flightreturn: boolean = true;
    query:boolean=false;
    twoway:any;
    newVar: any;
    returnVar: any;
    returnDatehtml:any;
    agentid:any;
    queries:any[];
    allqueris:any[];
    uniquequeries:any[];
    first:any;
    second:any;
    //isDisabled = true;
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
            Type: "Domestic",
            JourneyType: "OneWay",
            PreferredCabinClass: "All",    //6
            PromotionalPlanType: "Normal",
            Currency: "INR",
            SAirportCode:"",
            SAirportName:"",
            SCountry:"",
            DCountry:"",
            SCity:"",
            DCity:"",
            clientName:"Airaspire",
            AgentId:"",
           BookingAs:"",
           ReqID:""
        }
  
    }
  
  
  
      //flightDetails: FlightDetails = new FlightDetails();
  
      constructor(
  
          private flightService: AirportService,
          private route: Router, private data: Data
         
  
      ) 
      
     
      {
          this.minDate = new Date();
          this.maxDate = new Date();
          this.minDate.setDate(this.minDate.getDate());
          this.maxDate.setDate(this.maxDate.getDate()+360);
          this.datepickerconfig = Object.assign({},
              {
                  showWeekNumbers:false,
                  containerClass: 'theme-dark-blue',
                  // dateInputFormat:'YY/MM/DD',
                  date: 'yyyy-MM-dd',
                  minDate: new Date(Date.now())
              });
  
      }
     
      setToDate() 
      {
          debugger
          this.returnDatehtml=(document.getElementById('ToDate') as HTMLInputElement);
          this.datepickerconfigto = Object.assign({},
              {
                  showWeekNumbers:false,
                  containerClass: 'theme-dark-blue',
                  // dateInputFormat:'YY/MM/DD',
                  date: 'yyyy-MM-dd',
                  minDate: new Date(Date.parse(this.returnDatehtml) + 1),
              });
      }
  
  
      getNameList(nameList: any) {
          debugger;
          alert(nameList);
      }
      // @Input() request:Request;
      // responseStatus:Object= [];
      // status:boolean ;
  
      addTodo(title: string) {
          alert(title);
      }
      ngOnInit() {
          ((document.getElementById("ToDate") as HTMLInputElement).disabled)=true;
          debugger;
          this.checkuser = localStorage.getItem('Loginusername');
          if (this.checkuser == null) {
              this.route.navigate(['/AgentLogin']);
          }
          else
          {
              this.query=true;
             var userdata = JSON.parse(localStorage.getItem('Logininfo'));
             var udata = JSON.parse((<any>userdata)._body);            
             this.queries = udata.Data;            
             this.allqueris = this.queries.filter(row => row.requesttype == "Flights");
             localStorage.setItem('uqueries', JSON.stringify(this.allqueris))
          }
      }
  
      filldata(reqnumber:any)
      {
          debugger
          this.uniquequeries=JSON.parse(localStorage.getItem('uqueries'));
          this.uniquequeries = this.uniquequeries.filter(row => row.reqnumber == reqnumber);
          localStorage.setItem('pdtl',JSON.stringify(this.uniquequeries));
          var quer=this.uniquequeries[0];
          var AirportCode=quer.flightfrom;
          localStorage.setItem('REQID',JSON.stringify(quer.RID));
                  this.flightService.SelectAirportList(AirportCode).subscribe(
                      data => {
                          this.clients = data[0].Data;
                          this.first=this.clients[0];
                          (document.getElementById("dest") as HTMLInputElement).value = this.first.AirportCode;
                          (document.getElementById("arcode") as HTMLInputElement).value = this.first.AirportCode;
                          (document.getElementById("arname") as HTMLInputElement).value = this.first.AirportName;
                          (document.getElementById("souCountry") as HTMLInputElement).value = this.first.Country;
                          (document.getElementById("souCity") as HTMLInputElement).value = this.first.CityName;
                          var AirportCode=quer.flightto; 
                          this.flightService.SelectAirportList(AirportCode).subscribe(
                              data => {
                                  this.clients1=data[0].Data;
                                  this.second = this.clients1[0];
                                  (document.getElementById("desti") as HTMLInputElement).value = this.second.AirportCode;            
                                  (document.getElementById("desCountry") as HTMLInputElement).value = this.second.Country;
                                  (document.getElementById("desCity") as HTMLInputElement).value = this.second.CityName;
                                  if (this.first.CityName != "" || this.second.CityName) {
                                      ((document.getElementById("qSource") as HTMLInputElement).value) = this.first.CityName + '(' + quer.flightfrom + ')';
                                      ((document.getElementById("ar1") as HTMLInputElement).hidden) = true;
                                      ((document.getElementById("qDestination") as HTMLInputElement).value) = this.second.CityName + '(' + quer.flightto + ')';
                                      ((document.getElementById("ar2") as HTMLInputElement).hidden) = true;
                                      ((document.getElementById("FromDate") as HTMLInputElement).value) = quer.flightfromdate;
                                      if (quer.flighttodate != "") {
                                          ((document.getElementById("ToDate") as HTMLInputElement).value) = quer.flighttodate;
                                          this.twoway ="Yes";
                                      }
                                      ((document.getElementById("qSource") as HTMLInputElement).disabled) = true;
                                      ((document.getElementById("qDestination") as HTMLInputElement).disabled) = true;
                                      ((document.getElementById("FromDate") as HTMLInputElement).disabled) = true;
                                      ((document.getElementById("pdtlvisiblity") as HTMLInputElement).disabled) = true;
                                  }
                              }
                          );
                      }
                  );       
      }
      Origin: any
      Destination: any
      Departure: any
      Return: any
      total: any
      adult: number
      child: number
      infant: number
      arcode:any
      arname:any
      souCountry:any
      desCountry:any
      souCity:any
      desCity:any
      SearchFlight(name: any) {
          debugger;
          this.Origin = ((document.getElementById("dest") as HTMLInputElement).value);
          this.Destination = ((document.getElementById("desti") as HTMLInputElement).value);
          this.Departure = ((document.getElementById("FromDate") as HTMLInputElement).value);
          this.arcode=((document.getElementById("arcode") as HTMLInputElement).value);
          this.arname=((document.getElementById("arname") as HTMLInputElement).value);
          this.souCountry=((document.getElementById("souCountry") as HTMLInputElement).value);
          this.desCountry=((document.getElementById("desCountry") as HTMLInputElement).value);
          this.souCity=((document.getElementById("souCity") as HTMLInputElement).value);
          this.desCity=((document.getElementById("desCity") as HTMLInputElement).value);
          this.agentid= localStorage.getItem('AgentCode');
          if(((document.getElementById("Currency") as HTMLInputElement)!=null))
          this.name.Request.Currency= ((document.getElementById("Currency") as HTMLInputElement).value);
          else
          this.name.Request.Currency="INR"
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
          name.Request.SAirportCode=this.arcode;
          name.Request.SAirportName=this.arname;
          name.Request.SCountry=this.souCountry;
          name.Request.DCountry=this.desCountry;
          name.Request.SCity=this.souCity;
          name.Request.DCity=this.desCity;
          name.Request.AgentId = this.agentid;
          if (this.Return != "") {
              name.Request.JourneyType = "return";
              name.Request.ReturnDate = this.Return;
          }
          if (name.Request.Origin == "" || name.Request.Destination == "" || name.Request.DepartureDate == "") {
              alert("Please fill the all fields !!!")
          }
          else {
              if (name.Request.Origin == name.Request.Destination)
              {
                  alert("Origin and Destination can't be same !!!")
              }
              else
              {
              this.adult = name.Request.AdultCount; this.child = name.Request.ChildCount; this.infant = name.Request.InfantCount;
              this.total = Number(this.adult) + Number(this.child); //+ Number(this.infant);
              if (Number(this.infant) > Number(this.adult)) 
              {
                  alert("Infant can't be more than Adult !!!!")
              }
              else if (this.total > 9) {
                  alert("Total passenger can't be more than 9 except infant !!!!")
              }
              else {
                  debugger;
                  this.data.storage = name;
                  localStorage.setItem('req', JSON.stringify(this.data.storage));
                  if (name.Request.Type == "International" && this.twoway == "Yes") {
                      this.route.navigate(['/int-result']);
                  }
                 else if (name.Request.Type != "International" && this.twoway == "Yes") {
                      this.route.navigate(['/FlightResults']);
                  }
                  else {
                      this.route.navigate(['/FlightResult']);
                  }
              }
          }
          }
      }
  
      oneway() {
          debugger
          this.flightoneway = true;
          this.flightreturn = true;
          this.twoway="";
          ((document.getElementById("ToDate") as HTMLInputElement).disabled)=true;
          ((document.getElementById("customRadioInline1") as HTMLInputElement).checked)=true;
      }
  
      EnablePRVT()
      {
  debugger;
  
  if((document.getElementById("private-trip") as HTMLInputElement).checked)
  {
   
      ((document.getElementById("divQuery") as HTMLDivElement).style.display='');
      ((document.getElementById("private-trip") as HTMLInputElement).checked)=false;
  
      ((document.getElementById("qSource") as HTMLInputElement).disabled) = true;
      ((document.getElementById("qDestination") as HTMLInputElement).disabled) = true;
      ((document.getElementById("FromDate") as HTMLInputElement).disabled) = true;
      ((document.getElementById("DivtravelerHomeI") as HTMLInputElement).disabled) = true;
      ((document.getElementById("DivtravelerHomeA") as HTMLInputElement).disabled) = true;
      ((document.getElementById("DivtravelerHomeC") as HTMLInputElement).disabled) = true;
      
     
  }
  else
  {
      ((document.getElementById("private-trip") as HTMLInputElement).checked)=true;
  
      ((document.getElementById("divQuery") as HTMLDivElement).style.display='none');
    
      ((document.getElementById("qSource") as HTMLInputElement).disabled) = false;
      ((document.getElementById("qDestination") as HTMLInputElement).disabled) = false;
      ((document.getElementById("FromDate") as HTMLInputElement).disabled) = false;
     
      ((document.getElementById("qDestination") as HTMLInputElement).value) ="";
      ((document.getElementById("qSource") as HTMLInputElement).value)="";
      ((document.getElementById("FromDate") as HTMLInputElement).value)="";
  
      ((document.getElementById("DivtravelerHomeI") as HTMLInputElement).disabled) = false;
      ((document.getElementById("DivtravelerHomeA") as HTMLInputElement).disabled) = false;
      
      ((document.getElementById("DivtravelerHomeC") as HTMLInputElement).disabled) = false;
      
  
  }
  
     }
  
      Rturn() {
          debugger
          this.flightoneway = true;
          this.flightreturn = true;
          this.twoway="Yes";    
          ((document.getElementById("ToDate") as HTMLInputElement).disabled)=false;
          ((document.getElementById("customRadioInline2") as HTMLInputElement).checked)=true;
          // ToDate
          // this.re   
          //this.isDisabled = !this.isDisabled;
      }
      onChangeD() {
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
      searchClient(term: '') {
          this.flag = true;
          //this.searchTerms.next(term);  
          debugger;
         
              this.flightService.GetAirportList(term).subscribe(
                  data => {
                      this.clients = data[0].Data;
                  }
              );
         
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
  
      searchClientd(term: '') {
          debugger;
          this.flag1 = true;
          //this.searchTerms.next(term); 
         
              this.flightService.GetAirportList(term).subscribe(
                  data => {
                      this.clients1 = data[0].Data;
                  }
              );
      }    
      onselectClientd(ClientObj: any) {
          debugger
        
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
      moroption:boolean=false;
      moreoption()
      {
          this.moroption=true;
      }
      closemoreoption()
      {
          this.moroption=false;
      } 
      adlt:any;
      chld:any;
      infnt:any;
      totpassenger()
      {
          this.adlt = this.name.Request.AdultCount; this.chld = this.name.Request.ChildCount; this.infnt = this.name.Request.InfantCount;
          this.total = Number(this.adlt) + Number(this.chld)+ Number(this.infnt);
      }   
      
      
  }

