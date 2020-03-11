import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Type } from '@angular/compiler/src/core';
import { HolidayService } from '../../services/holiday.service';
import {BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  datepickerconfig:Partial<BsDatepickerConfig>;
  datepickerconfigto:Partial<BsDatepickerConfig>;
  
  public CountryCityList: any={};   
  newVar:any;
  CountryCityName:any;
  countryCName:any;
  ccList:any={};
  model:any;
  Divclose:boolean=true;
  couci={ model:
    {
      CountryCityName:''
    }
  }
  
  years:any=[];
  monthmaxval:any=12;  
  currencyList:any;
  private mm : string ;
months:any= [];

  public packagedemodel: any = {};
  public packageList:any={};
  HolidayFormFields = {
    PackageSearchReq:{  
        CityName:"delhi",
        CityId:"2720",
        CountryName:"",
        CountryId:"88",
        Duration:"1",
        PackageType:"",
        DateOfTravel:"" ,
        AdultCount:"1",
        ChildWCount:"0",
        ChildWithoutBed:"0",
        Infant:"0",
        HolidayType:"",
        Year:"",
        month:"",
        Currency:"",
        
     }      
}
  constructor(private hservice:HolidayService,private route: Router) { 
    // this.datepickerconfig=Object.assign({},
    //   { 
    //     showWeekNumbers:false, 
    //     containerClass:'theme-dark-blue',
    //     // dateInputFormat:'YY/MM/DD',
      
    //   dateInputFormat: 'MMM'
    //   });
    //   debugger;

    this.getDates();
    //this.getMonth(); 
   

  }
  getMonth(){
    debugger;
    var yr=parseInt(this.HolidayFormFields.PackageSearchReq.Year);
    var today = new Date();
    var year=today.getFullYear();
    var mm=today.getUTCMonth()+1;
    var tempmm = today.getMonth()+1;     
    
    if(yr==year)
    {
      this.months=[];
      var tempMonth:any=[];
      for(var i=mm;i<=12;i++)
      {
        if(i==1)
        {
          this.months.push('Jan')
        }
        else if(i==2)
        {
          this.months.push('Feb')
        }
        else if(i==3)
        {
          this.months.push('March')
        }
        else if(i==4)
        {
          this.months.push('April')
        }
        else if(i==5)
        {
          this.months.push('May')
        }
        else if(i==6)
        {
          this.months.push('Jun')
        }
        else if(i==7)
        {
          this.months.push('July')
        }
        else if(i==8)
        {
          this.months.push('Aug')
        }
        else if(i==9)
        {
          this.months.push('Sept')
        }
        else if(i==10)
        {
          this.months.push('Oct')
        }
        else if(i==11)
        {
          this.months.push('Nov')
        }
        else if(i==12)
        {
          this.months.push('Desc')
        }
        //this.months.push(i);
      }
        
    }
    else if(yr>year)  
    {
      this.months=[];
      for(var i=1;i<=12;i++)
      {
        if(i==1)
        {
          this.months.push('Jan')
        }
        else if(i==2)
        {
          this.months.push('Feb')
        }
        else if(i==3)
        {
          this.months.push('March')
        }
        else if(i==4)
        {
          this.months.push('April')
        }
        else if(i==5)
        {
          this.months.push('May')
        }
        else if(i==6)
        {
          this.months.push('Jun')
        }
        else if(i==7)
        {
          this.months.push('July')
        }
        else if(i==8)
        {
          this.months.push('Aug')
        }
        else if(i==9)
        {
          this.months.push('Sept')
        }
        else if(i==10)
        {
          this.months.push('Oct')
        }
        else if(i==11)
        {
          this.months.push('Nov')
        }
        else if(i==12)
        {
          this.months.push('Desc')
        }
      }
    }
    }
  getDates() {
    var date = new Date();
    var currentYear = date.getFullYear();

    //set values for year dropdown
    for (var i = 0; i <= 100; i++) {
      this.years.push(currentYear + i);
    }

   
  }


  checkuser:any
  ngOnInit() {
    this.hservice.GetPackageList().subscribe(
      data => {
        this.packageList = data[0].Data;
        this.hservice.getCurrency()
        .subscribe(data => {
            this.currencyList = data.Table;
        })
      }
    );
  }
  searchCountryCity(CityName:any){
    debugger;
    this.couci.model.CountryCityName=CityName;
    if(this.couci.model.CountryCityName.length>=3)
    {
    this.hservice.GetCCity(this.couci.model).subscribe(
      data=>{
          this.CountryCityList = data[0].Data;
      }
  );
}
}

onselectCountryCity(CCObj:any) {  
  debugger;   
if (CCObj.name != 0) {  
  (document.getElementById("CountrCityName")as HTMLInputElement).value = CCObj.CityName +" "+ "("+CCObj.Countryname +")";
  (document.getElementById("CityId")as HTMLInputElement).value = CCObj.CityId;
  (document.getElementById("CityName")as HTMLInputElement).value = CCObj.CityName;
  (document.getElementById("CountryId")as HTMLInputElement).value = CCObj.CountryId;
  (document.getElementById("CountryName")as HTMLInputElement).value = CCObj.Countryname;
  
  
  
  localStorage.setItem('cclist',JSON.stringify(CCObj));   
  //this.flag1 = true;  
 // this.flag =true;
  this.CountryCityList = [];
}  
else {  
  return false;  
} 
}

GetHoliday(HolidayFormFields:any)  {  
debugger;
        
       this.HolidayFormFields.PackageSearchReq.CityId=((document.getElementById("CityId")as HTMLInputElement).value);
       this.HolidayFormFields.PackageSearchReq.CityName=((document.getElementById("CityName")as HTMLInputElement).value);
       this.HolidayFormFields.PackageSearchReq.CountryId=((document.getElementById("CountryId")as HTMLInputElement).value);
       this.HolidayFormFields.PackageSearchReq.CountryName=((document.getElementById("CountryName")as HTMLInputElement).value);
       if(this.HolidayFormFields.PackageSearchReq.month=="Jan")
       this.HolidayFormFields.PackageSearchReq.month="01";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Jan")
       this.HolidayFormFields.PackageSearchReq.month="01";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Feb")
       this.HolidayFormFields.PackageSearchReq.month="02";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="April")
       this.HolidayFormFields.PackageSearchReq.month="04";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="May")
       this.HolidayFormFields.PackageSearchReq.month="05";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Jun")
       this.HolidayFormFields.PackageSearchReq.month="06";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="July")
       this.HolidayFormFields.PackageSearchReq.month="07";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Aug")
       this.HolidayFormFields.PackageSearchReq.month="08";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Sept")
       this.HolidayFormFields.PackageSearchReq.month="09";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Oct")
       this.HolidayFormFields.PackageSearchReq.month="10";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Nov")
       this.HolidayFormFields.PackageSearchReq.month="11";
       
       if(this.HolidayFormFields.PackageSearchReq.month=="Desc")
       this.HolidayFormFields.PackageSearchReq.month="12";
       
       if(document.getElementById("Currency")!=null)
       this.HolidayFormFields.PackageSearchReq.Currency=((document.getElementById("Currency")as HTMLInputElement).value);
        else
        this.HolidayFormFields.PackageSearchReq.Currency="INR";

       localStorage.setItem('HolidayForm',JSON.stringify(this.HolidayFormFields))
       this.route.navigate(['/Holiday-Result']);
       
   
  
      }

      HideAdult()
      {
       debugger;
          this.Divclose=false;
    
      }


}
