import { Component, OnInit } from '@angular/core';
import {HotelviewService } from '../../services/hotelview.service';
import { HotelService } from '../../services/hotel.service';
import { Router, ActivatedRoute } from '@angular/router';
import {BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { parse } from 'querystring';
@Component({
  selector: 'app-hoteld',
  templateUrl: './hoteld.component.html',
  styleUrls: ['./hoteld.component.css']
})
export class HoteldComponent implements OnInit {

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
  DESCRIPTION:any;
  hotelname:any;
  searchData:any;
  pricepernight :any;
  ChkInDate:any;
  ChkOutDate:any;
  NoOfRoom:any;
  NoOfAdult:any;
  roomtype:any;
  modelprebook:any={}
  Response: any;
  errorMessage: string = '';
  hotelDes:any;
  hotelFacilites:any;
  model:any;
  newVar:any;
  returnVar:any;
  destination:any;
  roomno:number;
  datepickerconfig:Partial<BsDatepickerConfig>;
  datepickerconfigto:Partial<BsDatepickerConfig>;
   preBookData:any;
   cartData:any;
   Departure:any;
   Return:any;
   roomarray:any=[];
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

  couci={ model:
    {
      CountryCityName:''
    }
  }
    public CountryCityList: any={}; 
    public CountryCityN = '';

    public CartItems:any=[];
    cardata:any[];
    cartdata1:any[];
    listofRooms:any;
    pepleCount:number;
    childcound:number;
    Divclose:boolean=false;
//Get Room Details

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
      NoOfRooms: "1",
      NoOfAdult: "1",
      NoOfChild: "0",
      NoOfChild1: "0",
      NoOfChild2: "0",
      NoOfChild3: "0",
      NoOfChild4: "0",
      ClientId:"",
      FirstName:"",
      AgentyId:""
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
   Hotel:{  
      HIndex:"",
      HID:"",
      IncomingOfficeCode:"",
      AvailToken:"",
      CID:""
   },
   Rooms:{  
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



 constructor(private hvw : HotelviewService,private hs :HotelService, private route: Router) { 
debugger;
     
       // this.searchData= data.Data.Hotel_Details.Hotel.filter(row => row.HID=="H!0011507");
     
       this.datepickerconfig=Object.assign({},
        { 
          showWeekNumbers:false, 
          containerClass:'theme-dark-blue',
          // dateInputFormat:'YY/MM/DD',
           //date:'yyyy-MM-dd',
           date:'dd/MM/yyyy',
           minDate: new Date(Date.now())
        });
   
 }

 ngOnInit() {

    var formfield = JSON.parse(localStorage.getItem('HotelRoomRQ'))
    var tempcount = JSON.parse(localStorage.getItem('HotelForm'))
    this.destination=formfield.Master.CityName+','+formfield.Master.CountryName;
    this.ChkInDate=formfield.Master.ChkInDate;
    this.ChkOutDate=formfield.Master.ChkOutDate;
    this.pepleCount=tempcount.Master.NoOfAdult;
    this.roomno=tempcount.Master.NoOfRooms;
    this.childcound=tempcount.Master.NoOfChild;
  debugger;
    this.hs.GetRooms(formfield)
    
        .subscribe( data =>{
   debugger;
            this.searchData = JSON.parse(data);            
            this.childcound=tempcount.Master.NoOfChild;
            this.searchData.Master.NoOfAdult=tempcount.Master.NoOfAdult;
            this.searchData.Master.NoOfRooms=tempcount.Master.NoOfRooms;
            this.searchData.Master.NoOfChild=tempcount.Master.NoOfChild;
            this.searchData.Master.ClientId="";
            this.searchData.Master.FirstName="";
            
            localStorage.setItem('PreBookRQ',JSON.stringify(this.searchData))
            this.hotelDes=this.searchData.Hotel.Hdes;
            this.hotelFacilites=this.searchData.HFacilities
           // this.searchData = this.searchData.filter(row => row.Segments.Segment[0].Hotels == "");
          
        },
                error => {
                    //error
                    console.log('error');
                }
  
            );
 debugger;
                
      this.hs.PreBook(JSON.parse(localStorage.getItem('PreBookRQ')))
      .subscribe( data =>{
        debugger;
                 this.preBookData = JSON.parse(data);
               
             },
                     error => {
                         //error
                         console.log('error');
                     }
       
                 );
     
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
          setToDate()
          {
           this.datepickerconfigto=Object.assign({},
             { 
              showWeekNumbers:false, 
               containerClass:'theme-dark-blue',
               date:'dd/MM/yyyy',
                minDate:new Date( Date.parse(this.HotelFormFields.Master.ChkInDate)+1),
             });
           }
        
hotelPrebooking(rid:any)  {  
     debugger;
     this.searchData = JSON.parse(localStorage.getItem('PreBookRQ')); 
     var tempFilterRoom;
    
     for(var i=0;i< this.roomno;i++)
     {
         tempFilterRoom=this.searchData.Hotel.Rooms.Room.filter(row=>row.RIndex===rid); 
         this.roomarray.push(tempFilterRoom[0]);//+tempFilterRoom;
     }
 
    this.searchData.Hotel.Rooms.Room= this.roomarray;
   
 
  //this.searchData.Hotel.Rooms.Room=tempFilterRoom;
  
  localStorage.setItem('PreBookRQ',JSON.stringify(this.searchData))
          this.route.navigate(['/hotel-booking']);      
      }
      searchCountryCity(CityName:any){
        debugger;
        this.couci.model.CountryCityName=CityName;
        if(this.couci.model.CountryCityName.length>=3)
        {
        this.hs.GetCCity(this.couci.model).subscribe(
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

  AddToCart(rrId:any)
  {
    debugger;
     
    var n:number=1;
    var  now, expiration, data = false;
    
      if(localStorage.getItem('PreBookRQ').length>0)
      { 
       
        var getDayArray = JSON.parse(localStorage.getItem('PreBookRQ')) 
       var tempFilterRoom=getDayArray.Hotel.Rooms.Room.filter(row=>row.RIndex===rrId); 
       getDayArray.Hotel.Rooms.Room=tempFilterRoom;
        this.CartItems.push(getDayArray);                 
       
        if(localStorage.getItem("counter")!=undefined)
        n=parseInt(localStorage.getItem("counter"));
        if(n>1)
        {
          debugger;
          n=n+1;
          localStorage.setItem("counter", n.toString());
          this.cardata = JSON.parse(localStorage.getItem('cartItems'));
          this.cartdata1=this.CartItems;     
          this.CartItems=  this.cardata.concat(this.cartdata1); 
          //this.CartItems.Master.ClientId=0;
          //this.CartItems.Master.FirstName="";    
          localStorage.setItem("cartItems",JSON.stringify(this.CartItems));
         
        }
      else{
        n=n+1;
        //this.CartItems.Master.ClientId=0;
        //this.CartItems.Master.FirstName="";  
               localStorage.setItem("cartItems",JSON.stringify(this.CartItems));
        localStorage.setItem("counter", n.toString());
      }
      
       
      }
      this.route.navigate(['/Cart']);
    }
    Addrooms(){
      if(this.roomadd.length<5)
      {
         this.roomadd.push({  
          Adult:"",
          RoomType:"",
          Children:{  
             Child:[  
                {  
                   ChildAge:"1"
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
    // Hiderooms(count:any)
    // {
    //   debugger;
    //     this.roomno=this.roomadd.length;
    //     this.HotelFormFields.Rooms.Room =this.roomadd;
    //      this.pepleCount=0;
    //     for(var i=0;i<this.roomadd.length;i++)
    //     {
    //       this.HotelFormFields.Rooms.Room[i].Adult=this.roomadd[i].Adult;
    //       this.HotelFormFields.Rooms.Room[i].RoomType="";
    //       if(this.roomadd[i].Children.Child[0].ChildAge=="")
    //       {
    //         this.HotelFormFields.Rooms.Room[i].Children.Child[0].ChildAge="1";
    //       }
       
    //       this.pepleCount= this.pepleCount+parseInt(this.roomadd[i].Adult);
    //     this.childcound=this.childcound+parseInt(this.roomadd[i].Children.Child[0].ChildAge);
    //     }
    //     this.HotelFormFields.Master.NoOfRooms=this.roomno.toString();
    //     this.HotelFormFields.Master.NoOfAdult=this.pepleCount.toString();
    //     if(this.childcound.toString()=="NaN")
    //     this.HotelFormFields.Master.NoOfChild="";
    //     else
    //     this.HotelFormFields.Master.NoOfChild=this.childcound.toString();
    //     this.Divclose=false;
    
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

   GetHotels(HotelFormFields:any)  {
    
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
            
            
  
           this.hvw.hotelformdata=this.HotelFormFields;
           localStorage.setItem('HotelForm',JSON.stringify(this.HotelFormFields))
            this.hvw.serviceData =this.searchData;
            this.route.navigate(['/Hotel-Result']);
         
     
    
        }

        ModifySearch(HotelFormFields:any)  {

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
              
                 this.hvw.hotelformdata=this.HotelFormFields;
                 localStorage.setItem('HotelForm',JSON.stringify(this.HotelFormFields))
                 
                 this.route.navigate(['/Hotel-Result']);
          
              }
    
          
}