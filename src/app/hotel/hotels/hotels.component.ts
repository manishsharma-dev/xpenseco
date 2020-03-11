import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Type } from '@angular/compiler/src/core';
import {HotelviewService} from '../../services/hotelview.service'
import {BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { parse } from 'querystring';
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import {HotelModel} from '../../model/hotelmodel';
import {Master} from '../../model/hotelsearchrequest';
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  datepickerconfig:Partial<BsDatepickerConfig>;
  datepickerconfigto:Partial<BsDatepickerConfig>;



//hotelsdtls: any[];
//searchData: any[];

//counntrycityname:'';

  one: boolean = true;
  two: boolean = false;
  three: boolean = false;
  four: boolean = false;
  adultcount: any;
  cage1: boolean = false;
  cage2: boolean = false;
  cage3: boolean = false;
  cage4: boolean = false;
  cage5: boolean = false;
  cage6: boolean = false;
  cage7: boolean = false;
  cage8: boolean = false;
  serchData: any;
  hotelsdtls: any[];
  searchData: any;
  master: Master;
  Departure: any;
  Return: any;
  roomno: number;
  CountryCityName: any;
  countryCName: any;
  model: any;
  newVar: any;
  queries:any[];
    allqueris:any[];
    uniquequeries:any[];
    first:any;
    second:any;    
    query:boolean=false;
    public clients: any[];
    public clients1: any[];
modeln=new HotelModel('','','');
roomadd= 
 [  
   {  
      Adult:"1",
      RoomType:"",
      Children:{  
         Child:[  
            {  
               ChildAge:""
           },
           {  
             ChildAge:""
         }
         ]
      }
   },
   {  
     Adult:"1",
     RoomType:"",
     Children:{  
        Child:[  
           {  
              ChildAge:""
          },
          {  
            ChildAge:""
        }
        ]
     }
  },
  {  
   Adult:"1",
   RoomType:"",
   Children:{  
      Child:[  
         {  
            ChildAge:""
        },
        {  
          ChildAge:""
      }
      ]
   }
},
{  
 Adult:"1",
 RoomType:"",
 Children:{  
    Child:[  
       {  
          ChildAge:""
      },
      {  
        ChildAge:""
    }
    ]
 }
}
  
];

returnVar:any;
listofRooms:any;
pepleCount:number;
childcound:number;
couci={ model:
{
 CountryCityName:''
}
}
public CountryCityList: any={}; 
public CountryCityN = '';
Divclose:boolean=false;
// roomtype :any={

// }


HotelFormFields = {
 Master:{  
     CityName:"delhi",
     CityCode:"2720",
     AreaFlag:"False",
     AreaCode:"",
     ChkInDate:"",
     ChkOutDate:"",
     Duration:"1",
     CountryName:"",
     CountryCode:"88",
     Currency:"INR",
     LangCode:"GB",
     Nationality:"1",
     GMax_Price:"",
     GMin_Price:"",
     LanCount:"",
     NoOfRooms:"1",          
     NoOfAdult:"1",
     NoOfChild:"0",
     NoOfChild1:"0",
     NoOfChild2:"0",
     NoOfChild3:"0",
     NoOfChild4:"0",
     ClientId:"",
     FirstName:"",
     AgentId:""
  },
  Authentication:{  
     Channel:"B2B",
     CompanyId:"UHM",
     ServiceType:"Hotel",
     ClientId:"UHM",
     SessionId:"xfhldc2cgl1nez3im0i1y345",
     UserId:"RBS001",
     RefNo:"2222728201741155"
  },
  HotelBoard:{  
     Type:"",
     Code:""
  },
  Filter:{  
     StarCategory:"All",
     HotelName:"",
     AvailableOnly:"false"
  },
  Rooms:{  
     Room:[  
        {  
           Adult:"1",
           RoomType:""
          
        },
       
     ]
  }      
}
   FlightserviceService: any;
   currencyList: any;





constructor( private hotelservice: HotelService ,  private route: Router, public  Hvs : HotelviewService )  {
  debugger;

 
 this.datepickerconfig=Object.assign({},
   { 
     showWeekNumbers:false, 
     containerClass:'theme-dark-blue',
     // dateInputFormat:'YY/MM/DD',
      date:'dd/MM/yyyy',
      minDate: new Date(Date.now())
   });
   debugger;
  
   

}

checkuser:any
errorMessage:any
Response: any;
ngOnInit() {
   this.checkuser = localStorage.getItem('Loginuser');
   if (this.checkuser == null) {
      this.route.navigate(['/hotel']);
   }
   this.FlightserviceService.getCurrency()
      .subscribe(data => {
         this.currencyList = data.Table;
      })
   this.HotelFormFields.Master.Currency = "INR";
   this.HotelFormFields.Master.Nationality = "India";
   this.query=true;
         var userdata = JSON.parse(localStorage.getItem('Logininfo'));
         var udata = JSON.parse((<any>userdata)._body);            
         this.queries = udata.Data;            
         this.allqueris = this.queries.filter(row => row.requesttype == "Hotel");
         localStorage.setItem('uqueries', JSON.stringify(this.allqueris))
}
filldata(reqnumber:any)
{
    debugger
    this.uniquequeries=JSON.parse(localStorage.getItem('uqueries'));
    this.uniquequeries = this.uniquequeries.filter(row => row.reqnumber == reqnumber);
    localStorage.setItem('pdtl',JSON.stringify(this.uniquequeries));
    var quer=this.uniquequeries[0];
    localStorage.setItem('REQID',JSON.stringify(quer.RID));
    this.couci.model.CountryCityName=quer.hotelcity;
    this.hotelservice.GetCCity(this.couci.model).subscribe(
       data => {
          this.clients = data.Data;
                    this.first=this.clients[0];
                    (document.getElementById("CountrCityName") as HTMLInputElement).value = this.first.CITY_NAME + " " + "(" + this.first.COUNTRY_NAME + ")";
                    localStorage.setItem('cclist', JSON.stringify(this.first));
                    this.CountryCityList = [];
                    (document.getElementById("FromDate") as HTMLInputElement).value = quer.hotelcheckindate;
                    (document.getElementById("ToDate") as HTMLInputElement).value = quer.hotelcheckoutdate;
                                ((document.getElementById("CountrCityName") as HTMLInputElement).disabled) = true;
                                ((document.getElementById("FromDate") as HTMLInputElement).disabled) = true;
                                ((document.getElementById("ToDate") as HTMLInputElement).disabled) = true;
                            }
                    );
}
setToDate()
{
this.datepickerconfigto=Object.assign({},
{ 
 showWeekNumbers:false, 
  containerClass:'theme-dark-blue',
  // dateInputFormat:'YY/MM/DD',
   date:'dd/MM/yyyy',
   minDate:new Date( Date.parse(this.HotelFormFields.Master.ChkInDate)+1),
});
}
drop() {
debugger
if (this.HotelFormFields.Master.NoOfRooms == "1") {
 this.one = true;
 this.two = false;
 this.three = false;
 this.four = false;
}
else if (this.HotelFormFields.Master.NoOfRooms == "2") {
 this.two = true;
 this.three = false;
 this.four = false;
 this.one = true;
}
else if (this.HotelFormFields.Master.NoOfRooms == "3") {
 this.three = true;
 this.one = true;
 this.two = true;
 this.four = false;
}
else if (this.HotelFormFields.Master.NoOfRooms == "4") {
 this.four = true;
 this.three = true;
 this.one = true;
 this.two = true;
}
}
childone()
{
if(this.HotelFormFields.Master.NoOfChild1=="0")
{
 this.cage1=false;
 this.cage2=false;
}
else  if(this.HotelFormFields.Master.NoOfChild1=="1")
{
 this.cage1=true;
 this.cage2=false;
}
else  if(this.HotelFormFields.Master.NoOfChild1=="2")
{
 this.cage1=true;
 this.cage2=true;
}
}
childtwo()
{
if(this.HotelFormFields.Master.NoOfChild2=="0")
{
 this.cage3=false;
 this.cage4=false;
}
else  if(this.HotelFormFields.Master.NoOfChild2=="1")
{
 this.cage3=true;
 this.cage4=false;
}
else  if(this.HotelFormFields.Master.NoOfChild2=="2")
{
 this.cage3=true;
 this.cage4=true;
}
}
childthree()
{
if(this.HotelFormFields.Master.NoOfChild3=="0")
{
 this.cage5=false;
 this.cage6=false;
}
else  if(this.HotelFormFields.Master.NoOfChild3=="1")
{
 this.cage5=true;
 this.cage6=false;
}
else  if(this.HotelFormFields.Master.NoOfChild3=="2")
{
 this.cage5=true;
 this.cage6=true;
}
}
childfour()
{
if(this.HotelFormFields.Master.NoOfChild4=="0")
{
 this.cage7=false;
 this.cage8=false;
}
else  if(this.HotelFormFields.Master.NoOfChild4=="1")
{
 this.cage7=true;
 this.cage8=false;
}
else  if(this.HotelFormFields.Master.NoOfChild4=="2")
{
 this.cage7=true;
 this.cage8=true;
}
}
// GetHotels(HotelFormFields:any)  {

//     this.hotelservice.GetHotels(this.HotelFormFields)

//         .subscribe( data =>{

//             this.searchData = data;
//            // this.searchData = this.searchData.filter(row => row.Segments.Segment[0].Hotels == "");
//             this.searchData= data.Data.Hotel_Details.Hotel.filter(row => row.HID=="H!0011507");
//             this.Hvs.hotelformdata=this.HotelFormFields;
//             this.Hvs.serviceData =this.searchData;
//             this.route.navigate(['/hotelview']);
    
//         },
//                 error => {
//                     //error
//                     console.log('error');
//                 }

//             );

//         }



GetHotels(HotelFormFields:any)  {

var agntdtl=JSON.parse(localStorage.getItem("Logininfo"));
// this.hotelservice.GetHotels(this.HotelFormFields)

//     .subscribe( data =>{

//         this.searchData = data;
    // this.searchData = this.searchData.filter(row => row.Segments.Segment[0].Hotels == "");
 //    this.searchData= data.Data.Hotel_Details.Hotel.filter(row => row.HID=="H!0011507");
debugger;
 this.Departure=((document.getElementById("FromDate")as HTMLInputElement).value);
 

 this.Return=((document.getElementById("ToDate")as HTMLInputElement).value);

this.CountryCityList=JSON.parse(localStorage.getItem('cclist'))
this.HotelFormFields.Master.CountryCode=this.CountryCityList.COUNTRY_ID;
this.HotelFormFields.Master.CountryName=this.CountryCityList.COUNTRY_NAME;
this.HotelFormFields.Master.CityCode=this.CountryCityList.CITY_ID;
this.HotelFormFields.Master.CityName=this.CountryCityList.CITY_NAME;
this.HotelFormFields.Master.AgentId=agntdtl.AgentCode; 
//this.HotelFormFields.Master.ChkInDate =this.Departure;
//this.HotelFormFields.Master.ChkOutDate =this.Return;

 var date =this.Departure;
 var checkindate = date.split("/").reverse().join("-");
 var chackoutdate1=this.Return;
 var chackoutdate=chackoutdate1.split("/").reverse().join("-");

this.HotelFormFields.Master.ChkInDate =checkindate;
this.HotelFormFields.Master.ChkOutDate =chackoutdate;

 let date1 = new Date(checkindate).getDay();
 let date2 = new Date(chackoutdate).getDay();
 let days =  date2-date1; 
 this.HotelFormFields.Master.Duration=days.toString();
 //this.HotelFormFields.Rooms.Room =this.roomadd;
// this.HotelFormFields.Master.Duration=this.HotelFormFields.Master.ChkOutDate-
   //  HotelFormFields.RoomType= HotelFormFields.Rooms.Room[0].RoomType;
   
   //   if(HotelFormFields.RoomType ==="Single"){
   //   //  this.roomno=0;
    
   //   }
   //   if(HotelFormFields.RoomType ==="Double"){
   //    // this.roomno=1;
   //     for(var i=0;i<1;i++ )
   //     {
   //         this.HotelFormFields.Rooms.Room.push({Adult:"",
   //           RoomType:"Double",
   //           Children:{  
   //             Child:[  
   //                 {  
   //                   ChildAge:"7"
   //                 }
   //             ]
   //           }})
   //     }
   //   }
   //   if(HotelFormFields.RoomType ==="Deluxe"){
   //     //this.roomno=3;
   //   }
     
     

    this.Hvs.hotelformdata=this.HotelFormFields;
    localStorage.setItem('HotelForm',JSON.stringify(this.HotelFormFields))
     this.Hvs.serviceData =this.searchData;
     this.route.navigate(['/Hotel-Result']);
  


 }

 searchCountryCity(CityName:any){
   debugger;
   this.couci.model.CountryCityName=CityName;
   if(this.couci.model.CountryCityName.length>=3)
   {
   this.hotelservice.GetCCity(this.couci.model).subscribe(
     data=>{
         this.CountryCityList = data.Data;
     }

 );
}
}

onselectCountryCity(CCObj:any) {     
if (CCObj.name != 0) {  
 (document.getElementById("CountrCityName")as HTMLInputElement).value = CCObj.CITY_NAME +" "+ "("+CCObj.COUNTRY_NAME +")";
 localStorage.setItem('cclist',JSON.stringify(CCObj));   
 //this.flag1 = true;  
// this.flag =true;
 this.CountryCityList = [];
}  
else {  
 return false;  
}  
}
Addrooms(){
if(this.roomadd.length<2)
{
  this.roomadd.push({  
   Adult:"",
   RoomType:"",
   Children:{  
      Child:[  
         {  
            ChildAge:""
            //ChildAge1:""
         }
      ]
   }
}
);

}

}  
Removerooms(){

 this.roomadd.pop();

}
Hiderooms(count:any)
{
debugger;
 this.roomno=parseInt(this.HotelFormFields.Master.NoOfRooms);
 //this.HotelFormFields.Rooms.Room = this.roomno.toString();
 var ccount=0;

  this.pepleCount=0;
  this.childcound=0;
 for(var i=0;i<this.roomno;i++)
 {
   if(i==0)
   {
   
     this.roomadd[i].Adult=((document.getElementById("adult1")as HTMLInputElement).value);      

     this.adultcount=parseInt(this.roomadd[i].Adult);
   // this.HotelFormFields.Rooms.Room[i].Adult=((document.getElementById("adult1")as HTMLInputElement).value);
   ccount=parseInt(this.HotelFormFields.Master.NoOfChild1)
   this.HotelFormFields.Rooms.Room[i].RoomType="";
   for(var j=0;j<ccount;j++)
   {
     
     if(j==0)
     {
       this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage1")as HTMLInputElement).value);
     //this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage1")as HTMLInputElement).value);
     }
     if(j==1)
     {
       this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage2")as HTMLInputElement).value);
       //this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage2")as HTMLInputElement).value);
     }
   }
   this.pepleCount= this.pepleCount+this.roomno;
   this.childcound=this.childcound+ccount;
   
   if(ccount<=0)
   {
     
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,0);
   }
   if(ccount>0)
   {
      if(this.roomadd[i].Children.Child[1].ChildAge=="")
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,1);

   }

   this.HotelFormFields.Rooms.Room[i]=this.roomadd[i];
 }
 if(i==1)
   {
    
     this.roomadd[i].Adult=((document.getElementById("adult2")as HTMLInputElement).value);

    this.adultcount= parseInt(this.adultcount)+parseInt(this.roomadd[i].Adult);
   // this.HotelFormFields.Rooms.Room[i].Adult=((document.getElementById("adult2")as HTMLInputElement).value);
   ccount=parseInt(this.HotelFormFields.Master.NoOfChild2)
  // this.HotelFormFields.Rooms.Room[i].RoomType="";
    for(var j=0;j<ccount;j++)
    {
   // 
      if(j==0)
      {
        
       this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage3")as HTMLInputElement).value);
        //this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage3")as HTMLInputElement).value);
      }
       if(j==1)
       {
         this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage4")as HTMLInputElement).value);
        //this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage4")as HTMLInputElement).value);
       }
       //   }
    }
   this.pepleCount= this.pepleCount+this.roomno;
   this.childcound=this.childcound+ccount;
  //  if(this.roomadd[i].Children.Child[1].ChildAge=="")
  //  this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,1);

  if(ccount<=0)
   {
     
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,0);
   }
   if(ccount>0)
   {
      if(this.roomadd[i].Children.Child[1].ChildAge=="")
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,1);

   }
   this.HotelFormFields.Rooms.Room[i]=this.roomadd[i];
 }
 if(i==2)
   {
    
     this.roomadd[i].Adult=((document.getElementById("adult3")as HTMLInputElement).value);
     this.adultcount=parseInt(this.adultcount)+parseInt(this.roomadd[i].Adult);
   //this.HotelFormFields.Rooms.Room[i].Adult=((document.getElementById("adult3")as HTMLInputElement).value);
   ccount=parseInt(this.HotelFormFields.Master.NoOfChild3)
   //this.HotelFormFields.Rooms.Room[i].RoomType="";
    for(var j=0;j<ccount;j++)
    {
     if(j==0)
     {
       this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage5")as HTMLInputElement).value);
      // this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage5")as HTMLInputElement).value);
     }
       if(j==1)
       {
         this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage6")as HTMLInputElement).value);
        //this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage6")as HTMLInputElement).value);
       }
    }
   this.pepleCount= this.pepleCount+this.roomno;
   this.childcound=this.childcound+ccount;
  //  if(this.roomadd[i].Children.Child[1].ChildAge=="")
  //  this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,1);
  if(ccount<=0)
   {
     
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,0);
   }
   if(ccount>0)
   {
      if(this.roomadd[i].Children.Child[1].ChildAge=="")
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,1);

   }

   this.HotelFormFields.Rooms.Room[i]=this.roomadd[i];
 }
 if(i==3)
   {

     this.roomadd[i].Adult=((document.getElementById("adult4")as HTMLInputElement).value);
     this.adultcount=parseInt(this.adultcount)+parseInt(this.roomadd[i].Adult);
   //this.HotelFormFields.Rooms.Room[i].Adult=((document.getElementById("adult4")as HTMLInputElement).value);
   ccount=parseInt(this.HotelFormFields.Master.NoOfChild4)
   //this.HotelFormFields.Rooms.Room[i].RoomType="";
   for(var j=0;j<ccount;j++)
   {
   
     if(j==0)
     {
       this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage7")as HTMLInputElement).value);
       //this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage7")as HTMLInputElement).value);
     }
       if(j==1)
       {
         this.roomadd[i].Children.Child[j].ChildAge=((document.getElementById("cage8")as HTMLInputElement).value);
       //this.HotelFormFields.Rooms.Room[i].Children.Child[j].ChildAge=((document.getElementById("cage8")as HTMLInputElement).value);
       }
   }
   this.pepleCount= this.pepleCount+this.roomno;
   this.childcound=this.childcound+ccount;
  //  if(this.roomadd[i].Children.Child[1].ChildAge=="")
  //  this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,1);
  if(ccount<=0)
   {
     
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,0);
   }
   if(ccount>0)
   {
      if(this.roomadd[i].Children.Child[1].ChildAge=="")
      this.roomadd[i].Children.Child=this.roomadd[i].Children.Child.slice(0,1);

   }
   this.HotelFormFields.Rooms.Room[i]=this.roomadd[i];
 }



 }
 this.HotelFormFields.Master.NoOfRooms=this.roomno.toString();
this.HotelFormFields.Master.NoOfAdult=this.adultcount;//this.pepleCount.toString();
 if(this.childcound.toString()=="NaN")
 this.HotelFormFields.Master.NoOfChild="";
 else
 this.HotelFormFields.Master.NoOfChild=this.childcound.toString();
 this.Divclose=false;

}
opendiv()
{
this.Divclose=true;
}  
closediv()
{

 this.Divclose=false;
}
}

