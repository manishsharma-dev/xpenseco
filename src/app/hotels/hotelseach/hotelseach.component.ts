import { Component, OnInit } from '@angular/core';
import { HotelviewService } from '../../services/hotelview.service';
import { HotelService } from '../../services/hotel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../../services/page.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HttpClient } from '@angular/common/http';
import { data } from '../../providers/data/search-result-data';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Master } from '../../model/hotelsearchrequest';
import 'rxjs/add/operator/map';
import { Type } from '@angular/compiler/src/core';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { Http2SecureServer } from 'http2';

@Component({
  selector: 'app-hotelseach',
  templateUrl: './hotelseach.component.html',
  styleUrls: ['./hotelseach.component.css']
})
export class HotelseachComponent implements OnInit {
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
  DESCRIPTION: any;
  hotelname: any;
  searchData: any;
  searchDataOrg:any;
  pricepernight: any;
  ChkInDate: any;
  ChkOutDate: any;
  NoOfRoom: any;
  NoOfAdult: any;
  roomtype: any;
  modelprebook: any = {}
  Response: any;
  errorMessage: string = '';
  // array of all items to be paged
  private allItems: any[];
  destination: any;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  onestarcount: any;
  twostarcount: any;
  threestarcount: any;
  fourstart: any;
  fivstart: any;
  filterresult: any[];
  Maxprice: number;
  Minprice: number;
  model: any;
  newVar: any;
  returnVar: any;
  Departure :any;
  Return :any;
  HotelDtl: any[];
  Divclose: boolean = false;
  roomno: number;
  datepickerconfig: Partial<BsDatepickerConfig>;
  datepickerconfigto: Partial<BsDatepickerConfig>;
  roomadd= 
  [  
    {  
       Adult:"1",
       RoomType:"",
       Children:{  
          Child:[  
             {  
                ChildAge:"1"
            },
            {  
              ChildAge:"1"
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
               ChildAge:"1"
           },
           {  
             ChildAge:"1"
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
             ChildAge:"1"
         },
         {  
           ChildAge:"1"
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
           ChildAge:"1"
       },
       {  
         ChildAge:"1"
     }
     ]
  }
}
   
 ];
  couci = {
    model:
      {
        CountryCityName: ''
      }
  }
  public CountryCityList: any = {};
  public CountryCityN = '';
  listofRooms: any;
  pepleCount: number;
  childcound: number;
  //Get Room Details

  HotelFormFields = {
    Master: {
      CityName: "delhi",
      CityCode: "2720",
      AreaFlag: "False",
      AreaCode: "",
      ChkInDate: "",
      ChkOutDate: "",
      Duration: "1",
      CountryName: "",
      CountryCode: "88",
      Currency: "INR",
      LangCode: "GB",
      Nationality: "1",
      GMax_Price: "",
      GMin_Price: "",
      LanCount: "",
      NoOfRooms: "1",
      NoOfAdult: "1",
      NoOfChild: "0",
      NoOfChild1: "0",
      NoOfChild2: "0",
      NoOfChild3: "0",
      NoOfChild4: "0",
      ClientId: "",
      FirstName: "",
      AgentyId:""
    },
    Authentication: {
      Channel: "B2B",
      CompanyId: "UHM",
      ServiceType: "Hotel",
      ClientId: "UHM",
      SessionId: "xfhldc2cgl1nez3im0i1y345",
      UserId: "RBS001",
      RefNo: "2222728201741155"
    },
    Hotel: {
      HIndex: "",
      HID: "",
      IncomingOfficeCode: "",
      AvailToken: "",
      CID: ""
    },
    Rooms: {
      Room:[  
        {  
           Adult:"1",
           RoomType:"",
           Children:{  
              Child:[  
                 {  
                    ChildAge:"1"
                    
                 }
              ]
              
           }
        },
       
     ]
    }

  }

  //End

  constructor(private hvw: HotelviewService, private hs: HotelService, private route: Router, private pagerService: PagerService) {
    debugger;

    // this.searchData= data.Data.Hotel_Details.Hotel.filter(row => row.HID=="H!0011507");

    this.datepickerconfig = Object.assign({},
      {
        showWeekNumbers:false, 
        containerClass: 'theme-dark-blue',
        // dateInputFormat:'YY/MM/DD',
       // date: 'yyyy-MM-dd',
        date:'dd/MM/yyyy',
        minDate: new Date(Date.now())
      });

  }

  ngOnInit() {
    debugger;
    if (localStorage.getItem('HotelForm') === null) {
      this.route.navigate(['/hotel']);
      return false;
    }
    debugger;
    var formfield = JSON.parse(localStorage.getItem('HotelForm'))

    this.destination = formfield.Master.CityName + ',' + formfield.Master.CountryName;
    this.ChkInDate = formfield.Master.ChkInDate;
    this.ChkOutDate = formfield.Master.ChkOutDate;
    this.pepleCount = formfield.Master.NoOfAdult;
    this.roomno = formfield.Master.NoOfRooms;
    debugger;
    this.hs.GetHotels(formfield)

      .subscribe(data => {

        this.searchData = data;
        this.searchDataOrg=data;
        this.filterresult = data.Data.Hotel_Details.Hotel
        localStorage.setItem('filterresult', JSON.stringify(this.filterresult));
        let mydata = this.filterresult;

        function getmaxmin() {
          return mydata.map(any => any.PricePernight);
        }

        this.Maxprice = Math.max.apply(Math, getmaxmin());
        this.Minprice = Math.min.apply(Math, getmaxmin());
        localStorage.setItem('ResultData', JSON.stringify(this.searchData));
        this.setPage(1);
      },
        error => {
          //error
          console.log('error');
        }

      );


  }

  orderByComparator(a:any, b:any):number{
 
    if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
      //Isn't a number so lowercase the string to properly compare
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else{
      //Parse strings as numbers to compare properly
      if(parseFloat(a) < parseFloat(b)) return -1;
      if(parseFloat(a) > parseFloat(b)) return 1;
     }

    return 0; //equal each other
}
  
  GetRooms(HIndex: any) {
    debugger;
    this.HotelDtl = this.searchDataOrg.Data.Hotel_Details.Hotel.filter(row => row.HIndex === HIndex);
    this.searchDataOrg.Data.Hotel_Details.Hotel = this.HotelDtl;
    this.HotelFormFields.Master.CountryCode = this.searchDataOrg.Data.Master.CountryCode;
    this.HotelFormFields.Master.CountryName = this.searchDataOrg.Data.Master.CountryName;
    this.HotelFormFields.Master.CityCode = this.searchDataOrg.Data.Master.CityCode;
    this.HotelFormFields.Master.CityName = this.searchDataOrg.Data.Master.CityName;
    this.HotelFormFields.Master.ChkInDate = this.searchDataOrg.Data.Master.ChkInDate;
    this.HotelFormFields.Master.ChkOutDate = this.searchDataOrg.Data.Master.ChkOutDate;
    this.HotelFormFields.Master.Duration = this.searchDataOrg.Data.Master.Duration;
    this.HotelFormFields.Hotel.HIndex = this.searchDataOrg.Data.Hotel_Details.Hotel[0].HIndex;
    this.HotelFormFields.Hotel.HID = this.searchDataOrg.Data.Hotel_Details.Hotel[0].HID;
    this.HotelFormFields.Hotel.AvailToken = this.searchDataOrg.Data.Hotel_Details.Hotel[0].AvailToken;
    this.HotelFormFields.Hotel.IncomingOfficeCode = this.searchDataOrg.Data.Hotel_Details.Hotel[0].IncomingOfficeCode;
    this.HotelFormFields.Hotel.CID = this.searchDataOrg.Data.Hotel_Details.Hotel[0].CID;
    var formfield = JSON.parse(localStorage.getItem('HotelForm'))
    this.HotelFormFields.Master.NoOfAdult = formfield.Master.NoOfAdult;
    this.HotelFormFields.Master.NoOfRooms = formfield.Master.NoOfRooms;
    this.HotelFormFields.Master.NoOfChild = formfield.Master.NoOfChild;
    // this.Hvs.hotelformdata=this.searchData.Data.Hotel_Details.Hotel;
    var temprequest = JSON.parse(localStorage.getItem('HotelForm'))
    this.HotelFormFields.Rooms.Room = temprequest.Rooms.Room;
    localStorage.setItem('HotelRoomRQ', JSON.stringify(this.HotelFormFields))
    // this.Hvs.serviceData =this.searchData;
    this.route.navigate(['/Hotel-Detail']);
  }

  starFilter(starvalue: any) {


  }

  hotelbooking() {


    this.route.navigate(['/hotel-booking']);
  }

  setPage(page: number) {
    // get pager object from service
    if (this.searchData.length > 0) {
      this.pager = this.pagerService.getPager(this.searchData.length, page);

      // get current page of items
      this.pagedItems = this.searchData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    else {

      this.pager = this.pagerService.getPager(this.searchDataOrg.Data.Hotel_Details.Hotel.length, page);

      // get current page of items
      this.pagedItems = this.searchDataOrg.Data.Hotel_Details.Hotel.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.getChangeContextString(changeContext);
 
 }

 getChangeContextString(changeContext: ChangeContext) {    
     this.myOnChange(changeContext.value,changeContext.highValue);
         
 }


  myOnChange(from: any,to:any) {
    debugger;
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    this.searchData = this.filterresult.filter(row => row.PricePernight >= from && row.PricePernight <= to);
    // this.searchData=this.filterresult;
    this.setPage(1);
  }
  byStarRating(rating: any) {
    debugger;
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    var chkItem=document.getElementsByName('chkstarrating') ;
    var ischk:boolean=false;
    var fhote:any=[];
    for (var i=1;i<=chkItem.length;i++) // for acts as a foreach  
        {  
          var ischacked=((document.getElementById(i.toString())as HTMLInputElement).checked)
          // (document.getElementById[i] as HTMLElement).;
          if(ischacked)
          {
            this.searchData =this.filterresult.filter(row => row.StarRating == i);
            fhote.push(this.filterresult.filter(row => row.StarRating == i));
            ischk=true
          }
          
        } 
        // if(ischk)
        // this.searchData=fhote;
        if(!ischk)
        {
            this.searchData=this.filterresult;
        }
   
    // this.searchData=this.filterresult;
    this.setPage(1);
  }

  filterwithHFacility(facility: any) {
    debugger;
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    this.searchData = this.filterresult.filter(row => row.IsAllowCancelletion == facility);
    // this.searchData=this.filterresult;
    this.setPage(1);
  }

  filterwithHFacility1(facility: any) {
    debugger;
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    this.searchData = this.filterresult.filter(row => row.IsAllowWifi == facility);
    // this.searchData=this.filterresult;
    this.setPage(1);
  }

  filterwithHFacility2(facility: any) {
    debugger;

    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    this.searchData = this.filterresult.filter(row => row.IsFreeBreakfast == facility);
    // this.searchData=this.filterresult;
    this.setPage(1);
  }

  filterbyHotel()
  {
debugger;
   var hotelname=((document.getElementById("hotelName")as HTMLInputElement).value);

    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    if(hotelname!="")
    this.searchData = this.filterresult.filter(row => row.HName.indexOf(hotelname) !==-1);
    else
    this.searchData=this.filterresult;
    // this.searchData=this.filterresult;
    this.setPage(1);
  }
  RecShow: boolean = true;
  RecHide: boolean = false;
  StarShow: boolean = true;
  StarHide: boolean = false;
  SaveShow: boolean = true;
  SaveHide: boolean = false;
  PriceShow: boolean = true;
  PriceHide: boolean = false;

  RECOMMENDED() {
    debugger
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    //this.filterresult = this.searchData.Hotel_Details.Hotel.sort(row => row.Rooms.Room[0].IsAllowCancelletion == facility);
    this.RecShow = true;
    this.RecHide = false;
  }
  STAR() {
    debugger
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    this.filterresult = this.searchDataOrg.Data.Hotel_Details.Hotel.sort((a:any,b:any)=> parseInt(a.StarRating)-parseInt(b.StarRating));
    this.StarShow = true;
    this.StarHide = false;
  }
  SAVINGS() {
    debugger
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    //this.searchData = this.filterresult.sort(row => row.Rooms.Room[0].IsAllowCancelletion == facility);
    this.SaveShow = true;
    this.SaveHide = false;
  }
  PRICE() {
    debugger
    this.filterresult = JSON.parse(localStorage.getItem('filterresult'));
    this.filterresult = this.searchData.Data.Hotel_Details.Hotel.sort(row => row.PricePernight == "asc");
    this.PriceShow = true;
    this.PriceHide = false;
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
  childone() {
    if (this.HotelFormFields.Master.NoOfChild1 == "0") {
      this.cage1 = false;
      this.cage2 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild1 == "1") {
      this.cage1 = true;
      this.cage2 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild1 == "2") {
      this.cage1 = true;
      this.cage2 = true;
    }
  }
  childtwo() {
    if (this.HotelFormFields.Master.NoOfChild2 == "0") {
      this.cage3 = false;
      this.cage4 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild2 == "1") {
      this.cage3 = true;
      this.cage4 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild2 == "2") {
      this.cage3 = true;
      this.cage4 = true;
    }
  }
  childthree() {
    if (this.HotelFormFields.Master.NoOfChild3 == "0") {
      this.cage5 = false;
      this.cage6 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild3 == "1") {
      this.cage5 = true;
      this.cage6 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild3 == "2") {
      this.cage5 = true;
      this.cage6 = true;
    }
  }
  childfour() {
    if (this.HotelFormFields.Master.NoOfChild4 == "0") {
      this.cage7 = false;
      this.cage8 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild4 == "1") {
      this.cage7 = true;
      this.cage8 = false;
    }
    else if (this.HotelFormFields.Master.NoOfChild4 == "2") {
      this.cage7 = true;
      this.cage8 = true;
    }
  }
  setToDate() {
    this.datepickerconfigto = Object.assign({},
      {
        showWeekNumbers:false, 
        containerClass: 'theme-dark-blue',
        // dateInputFormat:'YY/MM/DD',
        //date: 'yyyy-MM-dd',
        date:'dd/MM/yyyy',
        minDate: new Date(Date.parse(this.HotelFormFields.Master.ChkInDate) + 1),
      });
  }
  searchCountryCity(CityName: any) {
    debugger;
    this.couci.model.CountryCityName = CityName;
    if (this.couci.model.CountryCityName.length >= 3) {
      this.hs.GetCCity(this.couci.model).subscribe(
        data => {
          this.CountryCityList = data.Data;

        }

      );
    }
  }

  onselectCountryCity(CCObj: any) {
    if (CCObj.name != 0) {
      (document.getElementById("CountrCityName") as HTMLInputElement).value = CCObj.CITY_NAME + " " + "(" + CCObj.COUNTRY_NAME + ")";
      localStorage.setItem('cclist', JSON.stringify(CCObj));
      //this.flag1 = true;  
      // this.flag =true;
      this.CountryCityList = [];
    }
    else {
      return false;
    }
  }
  Addrooms() {
    if (this.roomadd.length < 5) {
      this.roomadd.push({
        Adult: "",
        RoomType: "",
        Children: {
          Child: [
            {
              ChildAge: "1"
            }
          ]
        }
      }
      );

    }

  }
  Removerooms() {

    this.roomadd.pop();

  }
  // Hiderooms(count: any) {
  //   debugger;
  //   this.roomno = this.roomadd.length;
  //   this.HotelFormFields.Rooms.Room = this.roomadd;
  //   this.pepleCount = 0;
  //   for (var i = 0; i < this.roomadd.length; i++) {
  //     this.HotelFormFields.Rooms.Room[i].Adult = this.roomadd[i].Adult;
  //     this.HotelFormFields.Rooms.Room[i].RoomType = "";
  //     if (this.roomadd[i].Children.Child[0].ChildAge == "") {
  //       this.HotelFormFields.Rooms.Room[i].Children.Child[0].ChildAge = "1";
  //     }

  //     this.pepleCount = this.pepleCount + parseInt(this.roomadd[i].Adult);
  //     this.childcound = this.childcound + parseInt(this.roomadd[i].Children.Child[0].ChildAge);
  //   }
  //   this.HotelFormFields.Master.NoOfRooms = this.roomno.toString();
  //   this.HotelFormFields.Master.NoOfAdult = this.pepleCount.toString();
  //   if (this.childcound.toString() == "NaN")
  //     this.HotelFormFields.Master.NoOfChild = "";
  //   else
  //     this.HotelFormFields.Master.NoOfChild = this.childcound.toString();
  //   this.Divclose = false;

  // }

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
            if(this.roomadd[i].Adult=="")
             this.adultcount=1
             else
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
  opendiv() {
    this.Divclose = true;
  }
  closediv()
  {

      this.Divclose=false;
   }

   ModifySearch(HotelFormFields:any)  {

    
    // this.hotelservice.GetHotels(this.HotelFormFields)
     
    //     .subscribe( data =>{
   
    //         this.searchData = data;
           // this.searchData = this.searchData.filter(row => row.Segments.Segment[0].Hotels == "");
        //    this.searchData= data.Data.Hotel_Details.Hotel.filter(row => row.HID=="H!0011507");
        this.filterresult=null;
        this.searchData=null;
        //this.pagedItems=null;
  debugger;
        this.Departure=((document.getElementById("FromDate")as HTMLInputElement).value);
        
      
        this.Return=((document.getElementById("ToDate")as HTMLInputElement).value);
       
        this.CountryCityList=JSON.parse(localStorage.getItem('cclist'))
      this.HotelFormFields.Master.CountryCode=this.CountryCityList.COUNTRY_ID;
      this.HotelFormFields.Master.CountryName=this.CountryCityList.COUNTRY_NAME;
      this.HotelFormFields.Master.CityCode=this.CountryCityList.CITY_ID;
      this.HotelFormFields.Master.CityName=this.CountryCityList.CITY_NAME;
  
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
        this.ChkInDate=checkindate;
        this.ChkOutDate=chackoutdate;
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
            
            
  
           this.hvw.hotelformdata=this.HotelFormFields;
           localStorage.setItem('HotelForm',JSON.stringify(this.HotelFormFields))
           this.hs.GetHotels(this.HotelFormFields)

      .subscribe(data => {

        this.searchData = data;
        this.searchDataOrg=data;
        this.filterresult = data.Data.Hotel_Details.Hotel
        localStorage.setItem('filterresult', JSON.stringify(this.filterresult));
        let mydata = this.filterresult;

        function getmaxmin() {
          return mydata.map(any => any.PricePernight);
        }

        this.Maxprice = Math.max.apply(Math, getmaxmin());
        this.Minprice = Math.min.apply(Math, getmaxmin());
        localStorage.setItem('ResultData', JSON.stringify(this.searchData));
        this.setPage(1);
      },
        error => {
          //error
          console.log('error');
        }

      );
          //  this.hvw.serviceData =this.searchData;
          //  this.route.navigate(['/Hotel-Result']);
         debugger;
         // this.HotelFormFields.Master.ChkInDate =checkindate;
          //this.HotelFormFields.Master.ChkOutDate =chackoutdate;
      (document.getElementById("FromDate")as HTMLInputElement).placeholder=this.ChkInDate;
     // =chackoutdate;
        
      
     (document.getElementById("ToDate")as HTMLInputElement).placeholder=this.ChkOutDate;
       
    
        }

}

