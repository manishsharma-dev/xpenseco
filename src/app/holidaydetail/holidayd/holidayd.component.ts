import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../services/holiday.service';
import {BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpParams, HttpHeaders } from '@angular/common/http';
import { PagerService } from '../../services/page.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from "@angular/core";
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-holidayd',
  templateUrl: './holidayd.component.html',
  styleUrls: ['./holidayd.component.css']
})
export class HolidaydComponent implements OnInit {
  model:any={};
  roomone:boolean=true;
  roomtwo:boolean=false;
  roomthree:boolean=false;
  noofroom:number;
    searchData:any;
    public CartItems:any=[];
    cardata:any[];
    cartdata1:any[];
    travelMonth:any=[];
    travelDay:any=[];
    travelYear:any=[];
    actualprice:any;
    price:any=0;
    price1:any=0;
    price2:any=0;
    PriceCal = {
        
      DepartureCity:"--Please select--",
      AdultCount:1,
      ChildWCount:"0",
      Childwoutbed:"0",
      Infant:"0",
      NoOfRooms:"1",
      SelectdYear:"--Select Year--",
      selectdMonth:"--Select Month--",
      selectedDay:"-- Select Day --",
      mobile:"",
      email:"",
      condition:""   
    }
  
    HolidayDetail = {
      PackageId:"",   
      Currency:"",
      ConversationRate:""
          
       }      
  
  
    adultCount:any=0;
    CWBCount:any=0;
    CNBCount:any=0;
    InfantCount:any=0;
  
    adultCount1:any=0;
    CWBCount1:any=0;
    CNBCount1:any=0;
    InfantCount1:any=0;
  
    adultCount2:any=0;
    CWBCount2:any=0;
    CNBCount2:any=0;
    InfantCount2:any=0;
  
    adultCount3:any=0;
    CWBCount3:any=0;
    CNBCount3:any=0;
    InfantCount3:any=0;
    
    TotalPaxCount:any=0;
    Roomcount:any=1;
    TotalPrice:any=0;
    BalanceAmount:any=0;
    minimumDip:any=0;
  
    getday:any
    curday:any
    currm:any;
    ServiceList:any=[];
    CityList:any=[];
    checkedList:any=[];
    totalUCost:any=0;
    chkvalue:any
    currID:any;
    shortDescription:any;
    longDescription:any;
    visShort:boolean=true;
    constructor(private hservice:HolidayService,  private route: Router) { }
  
    ngOnInit() {
     debugger
      this.PriceCal.SelectdYear="--Select Year--";
      this.PriceCal.selectdMonth="-- select Month--";
      this.PriceCal.selectedDay="--Travel Day--";
  
      this.model.noofroom="1";
  
      this.model.roomType1="Single";
      this.model.Adult1="1";
      this.model.CWB1="NA";
      this.model.CNB1="NA";
      this.model.Infant1="NA";
  
      this.model.roomType2="Single";
      this.model.Adult2="1";
      this.model.CWB2="NA";
      this.model.CNB2="NA";
      this.model.Infant2="NA";
  
      this.model.roomType3="Single";
      this.model.Adult3="1";
      this.model.CWB3="NA";
      this.model.CNB3="NA";
      this.model.Infant3="NA";
  
      this.getday = new Date();
  
      
      var pkgId = JSON.parse(localStorage.getItem('pkgdtl'))
  
      this.HolidayDetail.PackageId=pkgId[0].PackageId;
      this.HolidayDetail.ConversationRate=pkgId[0].ConversionRate;
      this.HolidayDetail.Currency=pkgId[0].Currency;
      
      this.hservice.GetHolidayDtl(this.HolidayDetail)
      
      .subscribe( data =>{
        
          this.searchData = data[0].Data;
          var sd= this.searchData.ShortDesc.substring( 0,250 );
          this.shortDescription=sd+"......";
          this.longDescription=this.searchData.ShortDesc;
         var tempdat=this.searchData.TravelDates.split(',')
         var tempM;
         var tempday;
         var tempyear;
         for(var i=0;i<tempdat.length;i++)
         {
           var tempdate=tempdat[i];
           var dconv1=tempdate.split('/');         
           var orginalyear=dconv1[2];
          if(tempyear!=orginalyear)
          {
            tempyear=orginalyear;
           
           this.travelYear.push(tempyear);
            
          }
         }
  
         var uniquevalue = [];
          for (let sa of this.searchData.UpgradeHotel) {          
              uniquevalue.push(sa.CityName)         
          }
  
         let unique_array = []
         for (let i = 0; i < uniquevalue.length; i++) {
           debugger;
           if (unique_array.indexOf(uniquevalue[i]) === -1) {
             unique_array.push(uniquevalue[i]);
           }
  
         }
  
         this.CityList=unique_array;
         this.TotalPrice=this.searchData.Costing;
         this.BalanceAmount =(this.searchData.Costing)-parseInt(this.searchData.MiminumDeposit);
         this.minimumDip=this.searchData.MiminumDeposit;
          localStorage.setItem('PackageData', JSON.stringify(this.searchData));
         this.ServiceList= JSON.parse(localStorage.getItem("ResultData"));     
      },
              error => {
                  //error
                  console.log('error');
              }
          );    
    }
  
    onChange(deviceValue:any) {
      this.travelMonth.length=0;
      var tempdat=this.searchData.TravelDates.split(',')
         var tempM;
         var tempyear;
         debugger;
         var moth = new Date();
        var month=moth.getMonth();
        var curMonth=month+1;
        this.currm=curMonth;
  
        var cYear=moth.getFullYear(); 
  
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
              if(parseInt(tempM)>=curMonth)
              {
                this.travelMonth.push(tempM);
              }
              else if(parseInt(orginalyear)>cYear)
              {
                this.travelMonth.push(tempM);
              }
  
            }
            
          }
  
         }
  }
  
  onCheckboxChange(m:any,Cost:any) {
    debugger;
    var iids="pkgprice"+m;
    var list=JSON.parse(localStorage.getItem("PackageData"));
    this.checkedList=[]
    this.totalUCost=0;
    for(var i=1 ; i <= list.UpgradeHotel.length; i++) {
      debugger;
      var id="pkgprice"+i;
      var chkvalue=(document.getElementById(id) as HTMLInputElement).checked ;
        if(chkvalue==true)
        {
          this.checkedList.push((document.getElementById(id) as HTMLInputElement).value);
        this.currID=(document.getElementById(id) as HTMLInputElement).checked; 
        }
      }
  
  for(var j=0;j<this.checkedList.length;j++)
        {
          debugger;
            this.totalUCost=parseInt(this.totalUCost)+parseInt(this.checkedList[j]);
        }
        if((document.getElementById(iids) as HTMLInputElement).checked==true)
        {
        this.TotalPrice=parseInt(this.TotalPrice)+parseInt(Cost);
        this.searchData.Costing=parseInt(this.searchData.Costing)+parseInt(Cost)
        }
        if((document.getElementById(iids) as HTMLInputElement).checked==false)
        {
        this.TotalPrice=parseInt(this.TotalPrice)-parseInt(Cost);
        this.searchData.Costing=parseInt(this.searchData.Costing)-parseInt(Cost)
        }
  console.log(this.checkedList);
  }
  
  onCheckboxChangeTour(m:any,TourCost:any) {
    debugger;
    var iids="pkgtoutprice"+m;
    var list=JSON.parse(localStorage.getItem("PackageData"));
    this.checkedList=[]
    this.totalUCost=0;
    for(var i=1 ; i <= list.AddOn.length; i++) {
      debugger;
      var id="pkgtoutprice"+i;
      var chkvalue=(document.getElementById(id) as HTMLInputElement).checked ;
        if(chkvalue==true)
        {
          this.checkedList.push((document.getElementById(id) as HTMLInputElement).value);
        this.currID=(document.getElementById(id) as HTMLInputElement).checked; 
        }
      }
  for(var j=0;j<this.checkedList.length;j++)
        {
          debugger;
            this.totalUCost=parseInt(this.totalUCost)+parseInt(this.checkedList[j]);
        }
        if((document.getElementById(iids) as HTMLInputElement).checked==true)
        {
        this.TotalPrice=parseInt(this.TotalPrice)+parseInt(TourCost);
        this.searchData.Costing=parseInt(this.searchData.Costing)+parseInt(TourCost)
        }
        if((document.getElementById(iids) as HTMLInputElement).checked==false)
        {
        this.TotalPrice=parseInt(this.TotalPrice)-parseInt(TourCost);
        this.searchData.Costing=parseInt(this.searchData.Costing)-parseInt(TourCost)
        }
  console.log(this.checkedList);
  }
  
  
  onChangeM(month:any) {
    debugger;
    this.travelDay.length=0;
    var tempdat=this.searchData.TravelDates.split(',')
       var tempM;
       var tempyear;
       var tempDay;
       var moth = new Date();
       var montht=moth.getUTCMonth();
       var tmon=montht+1;
       var cYear=moth.getFullYear(); 
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
          this.curday=document.getElementById("dayofm").innerText;       
          debugger;
          if(orginalyear==selYear && orginalMonth==month)
          {
            if(parseInt(tempDay)>=parseInt(this.curday)  )
            {
              
              this.travelDay.push(tempDay);
             
            }
            else if(parseInt(orginalyear)==cYear && orginalMonth>tmon)
            this.travelDay.push(tempDay);
            else if(parseInt(orginalyear)>cYear)
            this.travelDay.push(tempDay);
  
          }        
        }
       }
  }
    AddToCart(pId:any)
    {
      debugger;
       
      var n:number=1;
      var  now, expiration, data = false;
      
        if(localStorage.getItem('PackageData').length>0)
        {  
          var getDayArray = JSON.parse(localStorage.getItem('PackageData')) 
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
            localStorage.setItem("cartItems",JSON.stringify(this.CartItems));
           
          }
        else{
          n=n+1;
               
          localStorage.setItem("cartItems",JSON.stringify(this.CartItems));
          localStorage.setItem("counter", n.toString());
        }
        
         
        }
        this.route.navigate(['/Cart']);
      }
  
              
  holidayPrebooking()  { 
   debugger;
    this.searchData.Costing=this.TotalPrice;
    this.searchData.AdultCount=this.adultCount;
    this.searchData.ChildWCount=this.CWBCount;
    this.searchData.Childwoutbed=this.CNBCount;
    this.searchData.Infant=this.InfantCount;
    this.searchData.TravelDates=this.PriceCal.SelectdYear+"-"+this.PriceCal.selectdMonth+"-"+this.PriceCal.selectedDay;
    this.searchData.MinimumDiposit=this.minimumDip;
    this.searchData.NoOfRooms=this.noofroom;
    //count=1;
    var GuestCount=this.adultCount+this.CWBCount+this.CNBCount;
    
    
  
    if(this.PriceCal.SelectdYear=="--Select Year--")
    {
      alert("Departure Year required..");
      return false;
  
    }
    if(this.PriceCal.selectdMonth=="-- select Month--")
    {
      alert("Departure Month required..");
      return false;
    }
    if(this.PriceCal.selectedDay=="--Travel Day--")
    {
      alert("Departure Travel Day required..");
      return false;
    }
    if(this.model.noofroom==1 && GuestCount>4)
    {
        alert("total Numnber of Guest should not greater than 4");
        return false;
    }
    else if(this.noofroom==2 && GuestCount>8)
    {
      alert("total Numnber of Guest should not greater than 8");
        return false;
    }
    else if(this.model.noofroom==3 && GuestCount>12)
    {
      alert("total Numnber of Guest should not greater than 12");
        return false;
    }  
    localStorage.setItem('PackageData', JSON.stringify(this.searchData));
    ((document.getElementById("book-popup") as HTMLInputElement).hidden) = true;
    this.route.navigate(['/Holiday-Booking']);      
  }
  
  calculatePrice(model:any)
  {
     debugger;
    if(this.price==null)
    this.price=this.searchData.Costing;
    else
    this.searchData.Costing=this.price;
    var finalPrice=0;
  
    finalPrice=((parseFloat(this.price)*this.PriceCal.AdultCount)
        + parseFloat(this.searchData.CNB)* parseInt(this.PriceCal.Childwoutbed)
        + parseFloat(this.searchData.CWB)*parseInt(this.PriceCal.ChildWCount)
        +  parseFloat(this.searchData.Infant)*parseInt(this.PriceCal.Infant));
  
        this.searchData.Costing=finalPrice;
        this.searchData.AdultCount=this.adultCount;
        this.searchData.ChildWCount=this.CWBCount;
        this.searchData.Childwoutbed=this.CNBCount;
        this.searchData.Infant=this.InfantCount;
        this.searchData.TravelDates=this.PriceCal.SelectdYear+"-"+this.PriceCal.selectdMonth+"-"+this.PriceCal.selectedDay;
        //count=1;
        localStorage.setItem('PackageData', JSON.stringify(this.searchData));
        // localStorage.setItem('count', JSON.stringify(count));
        // localStorage.setItem('actualprice', this.actualprice);
  }
  roomchange()
  {
    debugger
    if(this.model.noofroom==1)
    {
  this.roomone=true;
  this.roomtwo=false;
  this.roomthree=false;
    }
    else if(this.model.noofroom==2)
    {
      this.roomone=true;
      this.roomtwo=true;
      this.roomthree=false;
  
    }
    else if(this.model.noofroom==3)
    {
      this.roomone=true;
      this.roomtwo=true;
      this.roomthree=true;
  
    }
  }
  Adultprice1()
  {
    debugger;
    
    if(this.model.Adult1>0)
      this.adultCount1=parseInt(this.model.Adult1);
      if(this.adultCount1>0)
         this.price=this.searchData.Twin*this.adultCount1;
  
      if(this.model.CWB1!="NA")
      this.CWBCount1=parseInt(this.model.CWB1);
      if(this.model.CWB1=="NA")
      this.CWBCount1=0;
      if(this.CWBCount1>0 && this.searchData.CWB)
      this.price=this.price+(this.searchData.CWB*this.CWBCount1);
  
  
      if(this.model.CNB1!="NA")
      this.CNBCount1=parseInt(this.model.CNB1);
      if(this.model.CNB1=="NA")
      this.CNBCount1=0
      if(this.CNBCount1>0 && parseInt(this.searchData.CNB)>0)
      this.price=this.price+(parseInt(this.searchData.CNB)*this.CNBCount1);
  
      if(this.model.Infant1!="NA")
      this.InfantCount1=parseInt(this.model.Infant1);
      if(this.model.Infant1=="NA")
      this.InfantCount1=0
      if(this.InfantCount1>0 && parseInt(this.searchData.Infant)>0)
      this.price=this.price+(this.searchData.Infant*this.InfantCount1);
  
      this.TotalPrice=this.price;
      this.minimumDip=parseFloat(this.searchData.MiminumDeposit)*parseFloat(this.adultCount1);
       this.BalanceAmount=this.TotalPrice-parseFloat(this.minimumDip);
       
      this.TotalPaxCount=this.TotalPaxCount+this.adultCount1+this.CWBCount1+this.CNBCount1+this.InfantCount1;
      this.adultCount=this.adultCount1;
      this.CWBCount=this.CWBCount1;
      this.CNBCount=this.CNBCount1;
      this.InfantCount=this.InfantCount1;
  }
  
  Adultprice2()
  {
    debugger;
    this.noofroom=2;
      //this.adultCount=this.model.Adult2;
      this.adultCount2=parseInt(this.model.Adult2);
      if(this.adultCount2>0)
      this.price1=parseInt(this.searchData.Twin)*this.adultCount2;
  
  
  
      if(this.model.CWB2!="NA")
      this.CWBCount2=parseInt(this.model.CWB2);
      if(this.model.CWB2=="NA")
      this.CWBCount2=0;
      if(this.CWBCount2>0 && parseInt(this.searchData.CWB)>0)
      this.price1=this.price1+(parseInt(this.searchData.CWB)*this.CWBCount2);
  
  
      if(this.model.CNB2!="NA")
      this.CNBCount2=parseInt(this.model.CNB2);
      if(this.model.CNB2=="NA")
      this.CNBCount2=0;
      if(this.CNBCount2>0 && parseInt(this.searchData.CNB)>0)
      this.price1=this.price1+(parseInt(this.searchData.CNB)*this.CNBCount2);
  
      if(this.model.Infant2!="NA")
      this.InfantCount2=this.InfantCount2+parseInt(this.model.Infant2);
      if(this.model.Infant2=="NA")
      this.InfantCount2=0;
      
      if(this.InfantCount2>0 && parseInt(this.searchData.Infant)>0)
      this.price1=this.price1+(parseInt(this.searchData.Infant)*this.InfantCount2);
       
      this.TotalPrice=this.TotalPrice+this.price1;
     // this.BalanceAmount =this.BalanceAmount+this.price1;
      this.BalanceAmount =(this.BalanceAmount+this.price1)-parseInt(this.searchData.MiminumDeposit);
    this.minimumDip=this.minimumDip+parseInt(this.searchData.MiminumDeposit);
      this.TotalPaxCount=this.TotalPaxCount+this.adultCount2+this.CWBCount2+this.CNBCount2+this.InfantCount2;
  
      this.adultCount=this.adultCount+this.adultCount2;
      this.CWBCount=this.CWBCount+this.CWBCount2;
      this.CNBCount=this.CNBCount+this.CNBCount2;
      this.InfantCount=this.InfantCount+this.InfantCount2;
  }
  
  Adultprice3()
  {
    this.noofroom=3;
    this.adultCount3=this.adultCount3+parseInt(this.model.Adult3);
    if(this.adultCount3>0 && parseInt(this.searchData.Twin)>0)
    this.price2=this.price2+(parseInt(this.searchData.Twin)*this.adultCount3);
  
  
    if(this.model.CWB3!="NA")
    this.CWBCount3=parseInt(this.model.CWB3);
    if(this.model.CWB3=="NA")
    this.CWBCount3=0;
    
    if(this.CWBCount3>0 && parseInt(this.searchData.CWB)>0)
    this.price2=this.price2+(parseInt(this.searchData.CWB)*this.CWBCount3);
  
  
    if(this.model.CNB3!="NA")
    this.CNBCount3=parseInt(this.model.CNB3);
    if(this.model.CNB3=="NA")
    this.CNBCount3=0;
    
  
    if(this.CNBCount3>0 && parseInt(this.searchData.CNB)>0)
    this.price2=this.price2+(this.searchData.CNB*this.CNBCount3);
  
    if(this.model.Infant3!="NA")
    this.InfantCount3=this.InfantCount3+parseInt(this.model.Infant3);
    if(this.InfantCount3>0 && this.searchData.Infant)
    this.price2=this.price2+(this.searchData.Infant*this.InfantCount3);
  
    this.TotalPrice=this.TotalPrice+this.price2;
    this.BalanceAmount =(this.BalanceAmount+this.price2)-parseInt(this.searchData.MiminumDeposit);
    this.minimumDip=this.minimumDip+parseInt(this.searchData.MiminumDeposit);
    this.TotalPaxCount=this.TotalPaxCount+this.adultCount3+this.CWBCount3+this.CNBCount3+this.InfantCount3;
  
      this.adultCount=this.adultCount+this.adultCount3;
      this.CWBCount=this.CWBCount+this.CWBCount3;
      this.CNBCount=this.CNBCount+this.CNBCount3;
      this.InfantCount=this.InfantCount+this.InfantCount3;
  }
  showhidedetails()
  {
  this.visShort=false;
  }
  }
  