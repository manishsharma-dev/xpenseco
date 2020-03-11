import { Component, OnInit } from '@angular/core';
import {HotelviewService } from '../../services/hotelview.service';
import {HolidayService} from '../../services/holiday.service'
import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';
import {HotelBookingModel} from '../../model/hotel-booking-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-holidayb',
  templateUrl: './holidayb.component.html',
  styleUrls: ['./holidayb.component.css']
})
export class HolidaybComponent implements OnInit {

  DESCRIPTION :any;
  hotelname :any;
  pricepernight:any;
  ChkInDate:any;
  ChkOutDate:any;
  NoOfRoom:number=0;
  NoOfAdult:number=0;
  NoOfChild:number=0;
  roomtype:any;
  discount:any;
  currency :any;
  Response:any;
  errorMessage:any;
  paxinfo: any={}
  profilemodel:any={}
  HolidaInfo:any;
  chekindate:any;
  chekoutdate:any;
  checkinMonth:any;
  checkoutMonth:any;
  public cartitems:any=[];
  bookingResponse:any;
  public charge:any=0;
  public GST:any=0;
  public Tax:any=0;
  public TotalPrice:any=0;
  model = new HotelBookingModel('','','','','');
  public listofPax:any=[];
  serviceData:any={};
  hotelformdata:any={};
  leadpax:any={};
  userdetail:any={};
  SearchReq:any={};
  departureDate:any;
  bookingType:any;
sendquery:boolean=false;
onlinequery:boolean=true;
AdultCount:number;
ChildCount:number;
ChildwCount:number;
 occumentMaster={
    OccupanyList:{
      Title:"",
      FirstName:"",
      LastName:"",
      Email:"",
      MobileNo:"",
    }
  }
  
  Adultdtl = {
      
    Title:"",
    FirstName:"",
    LastName:"",
    Email:"",
    MobileNo:"",
    BookingType:""
    
  }

  Childdtl = [{
      
    FirstName:"",
    LastName:"",
    Age:"",
    Email:"",
     
  }]

  travelMonth:any=[];
  travelDay:any=[];
  travelYear:any=[];
  actualprice:any;
  price:any;
  PriceCal = {
      
    DepartureCity:"--Please select--",
    AdultCount:1,
    ChildWCount:"0",
    Childwoutbed:"0",
    Infant:"0",
    SelectdYear:"--Select Year--",
    selectdMonth:"--Select Month--",
    selectedDay:"-- Select Day --",
    mobile:"",
    email:"",
    condition:""  ,
    departureCity:"" 
  }
  
  words2 = [{

    Title: "Mr",
    FirstName: "dsadas",
    LastName: "sadsads"
  }]
  constructor(private hd :HolidayService,  private route: Router) { }

  ngOnInit() {
    debugger;
    if (localStorage.getItem("Loginfo") != null) {
      var loginclient = JSON.parse(localStorage.getItem("Loginfo"));

      this.paxinfo.ClientId = loginclient.Id;
      this.paxinfo.FirstName = loginclient.FirstName;
    }
    if (localStorage.getItem("PackageData") != null) {
      debugger;
      this.SearchReq = JSON.parse(localStorage.getItem("HolidayForm"));
      this.HolidaInfo = JSON.parse(localStorage.getItem('PackageData'));

      this.AdultCount = this.HolidaInfo.AdultCount;
      this.ChildCount = this.HolidaInfo.ChildWCount;
      this.ChildwCount = this.HolidaInfo.Childwoutbed;

      this.departureDate = this.HolidaInfo.TravelDates;
      if (this.HolidaInfo.Costing == 0)
        this.HolidaInfo.Costing = this.HolidaInfo.SGL;

      if (this.HolidaInfo.AdultCount == 0)
        this.HolidaInfo.AdultCount = 1;

      if (this.HolidaInfo.NoOfRoom == 0)
        this.HolidaInfo.NoOfRoom = 1;

      var tempdat = this.HolidaInfo.TravelDates.split(',')
      var tempM;
      var tempday;
      var tempyear;
      for (var i = 0; i < tempdat.length; i++) {
        var tempdate = tempdat[i];
        var dconv1 = tempdate.split('-');

        var orginalyear = dconv1[2];
        if (tempyear != orginalyear) {
          tempyear = orginalyear;
          debugger;
          this.travelYear.push(tempyear);

        }

      }
      this.add();
      if (this.ChildCount != null) {
        this.addch();
      }
      if (this.ChildwCount != null) {
        this.addInFnt();
      }
    }

  }
  onChange(deviceValue:any) {
    this.travelMonth.length=0;
    var tempdat=this.HolidaInfo.TravelDates.split(',')
       var tempM;
       var tempyear;
       debugger;
       localStorage.setItem("selectedYear",deviceValue);
       for(var i=0;i<tempdat.length;i++)
       { 
         var tempdate=tempdat[i];
         var dconv1=tempdate.split('/');
         var orginalMonth=dconv1[0];         
         var orginalyear=dconv1[2];
        if(tempM!=orginalMonth)
        {
          tempM=orginalMonth;
          debugger;
          if(orginalyear==deviceValue)
          {
            this.travelMonth.push(tempM);
          }
          
        }

       }
}

onChangeM(month:any) {
  debugger;
  this.travelDay.length=0;
  var tempdat=this.HolidaInfo.TravelDates.split(',')
     var tempM;
     var tempyear;
     var tempDay;
     debugger;
     var selYear=localStorage.getItem("selectedYear");
     for(var i=0;i<tempdat.length;i++)
     {
       var tempdate=tempdat[i];
       var dconv1=tempdate.split('/');
       var orginalMonth=dconv1[0];         
       var orginalyear=dconv1[2];
       var orginalDay=dconv1[1];
      if(tempDay!=orginalDay)
      {
        tempDay=orginalDay;
        debugger;
        if(orginalyear==selYear && orginalMonth==month)
        {
          this.travelDay.push(tempDay);
        }
        
      }

     }
}

calculatePrice()
{
   debugger;
   (document.getElementById("onlinequer") as HTMLInputElement).checked=true;
  // if(JSON.parse(localStorage.getItem('count'))!=null)
  // {
  //    var countnumber=JSON.parse(localStorage.getItem('count'))
  //    this.actualprice=localStorage.getItem('actualprice');
  //     price=this.actualprice;
  //     //actualprice=actualpric
  // }
  // else
  // {
  //   var price=this.searchData.Costing;  
  //   this.actualprice=price;
  //   var finalPrice=0;
  //   var count=0;
  // }
  
  //var price;
  if(this.price==null)
  this.price=this.HolidaInfo.Costing;
  else
  this.HolidaInfo.Costing=this.price;
  var finalPrice=0;

  finalPrice=((parseFloat(this.price)*this.PriceCal.AdultCount)
      + parseFloat(this.HolidaInfo.CNB)* parseInt(this.PriceCal.Childwoutbed)
      + parseFloat(this.HolidaInfo.CWB)*parseInt(this.PriceCal.ChildWCount)
      +  parseFloat(this.HolidaInfo.Infant)*parseInt(this.PriceCal.Infant));

      this.HolidaInfo.Costing=finalPrice;
      this.HolidaInfo.AdultCount=this.PriceCal.AdultCount;
      this.HolidaInfo.ChildWCount=this.PriceCal.ChildWCount;
      this.HolidaInfo.Childwoutbed=this.PriceCal.Childwoutbed;
      this.HolidaInfo.Infant=this.PriceCal.Infant;
      this.HolidaInfo.TravelDates=this.PriceCal.SelectdYear+"-"+this.PriceCal.selectdMonth+"-"+this.PriceCal.selectedDay;
      //count=1;
     // localStorage.setItem('PackageData', JSON.stringify(this.HolidaInfo));
      // localStorage.setItem('count', JSON.stringify(count));
      // localStorage.setItem('actualprice', this.actualprice);
}

rediochecked()
{
  debugger;
  (document.getElementById("onlinequer") as HTMLInputElement).checked=true;
}

  HolidayBooking()
  {
    this.bookingType=this.Adultdtl.BookingType;

    if (((document.getElementById("Title") as HTMLInputElement).value) == "" || ((document.getElementById("FirstName") as HTMLInputElement).value) == "" || ((document.getElementById("LastName") as HTMLInputElement).value) == "" || ((document.getElementById("emailaddress") as HTMLInputElement).value) == ""
    || ((document.getElementById("MobileNo") as HTMLInputElement).value) == "") {
      alert("Please fill passenger details !!!!")
    }
    else if(this.bookingType=="")
    {
      alert("Booking type must be select Send Query or Online !!!!")
    }
    else {
    this.occumentMaster.OccupanyList.Title=this.Adultdtl.Title;
    this.occumentMaster.OccupanyList.FirstName=this.Adultdtl.FirstName;
    this.occumentMaster.OccupanyList.LastName=this.Adultdtl.LastName;
    this.occumentMaster.OccupanyList.Email=this.Adultdtl.Email;
    this.occumentMaster.OccupanyList.MobileNo=this.Adultdtl.MobileNo;
    this.HolidaInfo.OccupancyList=this.occumentMaster.OccupanyList;
    this.HolidaInfo.AdultCount=this.SearchReq.PackageSearchReq.AdultCount;
    this.HolidaInfo.ChildCount=this.SearchReq.PackageSearchReq.ChildCount;
    this.HolidaInfo.DateOfTravel=this.departureDate;
    this.HolidaInfo.CityId=this.SearchReq.PackageSearchReq.CityId;
    this.HolidaInfo.CountryId=this.SearchReq.PackageSearchReq.CountryId;
    this.HolidaInfo.CityName=this.SearchReq.PackageSearchReq.CityName;
    this.HolidaInfo.CountryName=this.SearchReq.PackageSearchReq.CountryName;
    this.HolidaInfo.AgentId=this.paxinfo.ClientId;
    this.HolidaInfo.AgentName=this.paxinfo.FirstName;
    this.HolidaInfo.BookingType=this.bookingType;
    
    localStorage.setItem("HBookingReq",this.HolidaInfo);
    this.hd.holidaybook(this.HolidaInfo)    
    .subscribe( data =>{
      this.bookingResponse=JSON.stringify(data[0].Data);
      localStorage.setItem("bookingresponse",this.bookingResponse);
      this.route.navigate(['/thank-you']);  
    },
            error => {
                //error
                console.log('error');
            }

        );


  }
}
squery(query:any)
{
  debugger;
  if(query=="SendQuery")
  {
    this.sendquery=true;
    this.onlinequery=false;
  }
  if(query=="Online")
  {
    this.sendquery=false;
    this.onlinequery=true;
  }
 }
  addInFnt() {
    debugger
    for (var i = 0; i < this.AdultCount - 1; i++) {
      this.words2.push({
        Title: "Mr",
        FirstName: "",
        LastName: ""
      });
    }
  }
addch() {
  debugger
  for (var i = 0; i < this.ChildCount- 1; i++) {
    this.words2.push({
      Title: "Master",
      FirstName: "",
      LastName: ""
    });
  }
}
add() {
debugger
  for (var i = 0; i < this.ChildwCount - 1; i++) {
    this.words2.push({
      Title: "Master",
      FirstName: "",
      LastName: ""
    });
  }

}
}

