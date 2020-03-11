import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../services/holiday.service';
import {BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute,Params } from '@angular/router';
import {HttpParams, HttpHeaders } from '@angular/common/http';
import { PagerService } from '../../services/page.service';
import { parse } from 'babylon';
import { sample } from 'rxjs/operators';
import { Pipe, PipeTransform } from "@angular/core";
@Component({
  selector: 'app-holidayr',
  templateUrl: './holidayr.component.html',
  styleUrls: ['./holidayr.component.css']
})
export class HolidayrComponent implements OnInit {
  filterresult : any[];
  searchData:any;
  public CountryCityList: any={};   
  newVar:any;
  CountryCityName:any;
  countryCName:any;
  ccList:any={};
  Maxprice : number;
 Minprice : number;
 listOfCities: any[];
 ListOfTheme:any[];
 isDesc: boolean = false;
 column: string = 'CategoryName';
 direction: number;
 ServiceList:any[];
 //{queryParams:{value:''}} 
 
 couci={ model:
    {
      CountryCityName:''
    }
  }
  public packagedemodel: any = {};
  public packageList:any={};
  HolidayFormFields = {
    PackageSearchReq:{  
        CityName:"delhi",
        CityId:"2720",
        CountryName:"",
        CountryId:"88",
        Duration:"0",
        PackageType:"",
        DateOfTravel:"" ,
        AdultCount:"1",
        ChildWCount:"0",
        ChildWithoutBed:"0",
        Infant:"0",
        HolidayType:""    
        
     }      
}

 // pager object
 pager: any = {};
 // paged items
 pagedItems: any[];
 EmptyMessage:boolean=false;
 EmptyTheme:boolean=false;
  constructor(private hservice:HolidayService,  private route: Router,private pagerService: PagerService,private prm:ActivatedRoute) {


    
   }

 
  ngOnInit() {
    debugger;
    //let param=new Params(window.location.search);
    var param=this.prm.snapshot.queryParams["city"]
if(param)
{
 this.HolidayFormFields.PackageSearchReq.CityName=param;
 this.HolidayFormFields.PackageSearchReq.CityId='0';
 this.HolidayFormFields.PackageSearchReq.CountryName='';
 this.HolidayFormFields.PackageSearchReq.CountryId='0';
 this.HolidayFormFields.PackageSearchReq.Duration='';
 this.HolidayFormFields.PackageSearchReq.PackageType='';
 this.HolidayFormFields.PackageSearchReq.DateOfTravel='';
 this.HolidayFormFields.PackageSearchReq.AdultCount='1'; 
 this.hservice.GetPackage(this.HolidayFormFields)
    
 .subscribe( data =>{
     debugger;
     this.searchData = data[0].Data;
     this.filterresult =data[0].Data
     localStorage.setItem('filterresult', JSON.stringify(this.filterresult));
     let mydata = this.filterresult;
     
     function getmaxmin(){
       return mydata.map(any => any.Costing);
     }
     
     this.Maxprice = Math.max.apply(Math,getmaxmin());
     this.Minprice = Math.min.apply(Math,getmaxmin());
     localStorage.setItem('ResultData',JSON.stringify(this.searchData));
     var uniquevalue = [];
      
        debugger;
        for (let sa of this.searchData)
        {
          uniquevalue = sa.Cities.split(',');
         // uniquevalue.push(uniquevalue);
        }
        let unique_array = []
        for (let i = 0; i < uniquevalue.length; i++) {
          debugger;
          if (unique_array.indexOf(uniquevalue[i]) === -1) {
            unique_array.push(uniquevalue[i]);
          }

        }

        this.listOfCities = unique_array
        var uniqtheme = [];
        debugger;
        for (let sa of this.searchData)
        {
          uniqtheme.push(sa.HolidayTheme);
        }
        let hTheme_array = []
        for (let i = 0; i < uniqtheme.length; i++) {
          debugger;
          if (hTheme_array.indexOf(uniqtheme[i]) === -1) {
            hTheme_array.push(uniqtheme[i]);
          }
        }
        this.ListOfTheme = hTheme_array
        this.setPage(1);
 });

}

debugger;
if(!param)
{
    var formfield = JSON.parse(localStorage.getItem('HolidayForm'))
    this.hservice.GetPackage(formfield)
    
    .subscribe( data =>{
        debugger;
        this.searchData = data[0].Data;
        this.filterresult =data[0].Data
        localStorage.setItem('filterresult', JSON.stringify(this.filterresult));
        let mydata = this.filterresult;
        
        function getmaxmin(){
          return mydata.map(any => any.Costing);
        }
        
        this.Maxprice = Math.max.apply(Math,getmaxmin());
        this.Minprice = Math.min.apply(Math,getmaxmin());
        localStorage.setItem('ResultData',JSON.stringify(this.searchData));
        var uniquevalue = [];
      
        debugger;
        for (let sa of this.searchData)
        {
          uniquevalue= sa.City;
         // uniquevalue.push(uniquevalue);
        }
        let unique_array = []
        for(let i = 0; i < uniquevalue.length; i++) {
          debugger;
          if (unique_array.indexOf(uniquevalue[i]) === -1) {
            unique_array.push(uniquevalue[i]);
          }

        }

        this.listOfCities = unique_array
        var uniqtheme = [];
        debugger;
        for (let sa of this.searchData)
        {
          uniqtheme.push(sa.HolidayTheme);
        }
        let hTheme_array = []
        for (let i = 0; i < uniqtheme.length; i++) {
          debugger;
          if (hTheme_array.indexOf(uniqtheme[i]) === -1) {
            hTheme_array.push(uniqtheme[i]);
          }
        }
        this.ListOfTheme = hTheme_array
        
        this.setPage(1);
    });

  }
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

    setPage(page: number) {
      // get pager object from service
      
        this.pager = this.pagerService.getPager(this.searchData.length, page);

      // get current page of items
      
        this.pagedItems = this.searchData.slice(this.pager.startIndex, this.pager.endIndex + 1);
        localStorage.setItem('pagedItems', JSON.stringify(this.pagedItems));
      //   else{

      //     this.pager = this.pagerService.getPager(this.searchData[0].Data.length, page);

      // // get current page of items
      //   this.pagedItems = this.searchData[0].Data.slice(this.pager.startIndex, this.pager.endIndex + 1);
      //   }
  }
 getPackageDtl(pkgId:any)
 {

  this.filterresult=JSON.parse(localStorage.getItem("ResultData"));
  this.filterresult=this.filterresult.filter(row=>row.PackageId===pkgId); 
  debugger;
  localStorage.setItem('pkgdtl', JSON.stringify(this.filterresult));
  this.route.navigate(['/Holiday-Detail']);
 }


 myOnChange(mydata:any)
 {
   debugger;
   this.filterresult =JSON.parse( localStorage.getItem('filterresult'));
   this.searchData = this.filterresult.filter(row => row.Costing >= mydata.from && row.Costing <= mydata.to);
      
   // this.searchData=this.filterresult;
      this.setPage(1);
  }

  FilterByDeuration(min:any,max:any)
  {
    debugger
    this.filterresult =JSON.parse( localStorage.getItem('filterresult'));
    this.searchData = this.filterresult.filter(row =>parseInt(row.duration) >= min && parseInt(row.duration) <= max);
      if(this.searchData.length==0)
      {
        this.EmptyMessage=true;
      }
      else
      {
        this.EmptyMessage=false;
      }
       this.setPage(1);
  }

  FilterByPackageTheme(ptheme:any,val:any)
  {
    debugger;
    this.filterresult =JSON.parse( localStorage.getItem('filterresult'));
    if(ptheme != '' && val.target.checked === true)
    {
      this.searchData = this.filterresult.filter(row =>row.HolidayTheme == ptheme);
      if(this.searchData.length==0)
      {
        this.EmptyMessage=true;
      }
      else
      {
        this.EmptyMessage=false;
      }
    }
    else
    {
      this.searchData=this.filterresult;
    }

    this.setPage(1);
  }

  FilterByCity(city:any,val:any)
  {
    debugger;
    this.filterresult =JSON.parse( localStorage.getItem('filterresult'));
    if(city != '' && val.target.checked === true)
    {
      this.searchData = this.filterresult.filter(row=>row.Cities.indexOf(city)>-1)
   
  }
    else
    {
      this.searchData=this.filterresult;
    }
    
    this.setPage(1);
  }

  sort(property:any){
    debugger;
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
    this.filterresult =JSON.parse( localStorage.getItem('filterresult'));
    // if(this.isDesc)
    // {
    //   if(property=='PackageName')
    //   {
    //     this.searchData = this.filterresult.sort(row => row.PackageName === "desc")
    //   }

    // }
  }

RemoveFilter()
{
  this.filterresult = JSON.parse( localStorage.getItem('filterresult'));
}
  }


