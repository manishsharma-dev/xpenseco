import { Component, OnInit } from '@angular/core';
import { HotelviewService } from '../../services/hotelview.service';
import { HotelService } from '../../services/hotel.service'
//import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn,FormBuilder,FormGroup } from '@angular/forms';
import { HotelBookingModel } from '../../model/hotel-booking-model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hotelb',
  templateUrl: './hotelb.component.html',
  styleUrls: ['./hotelb.component.css']
})
export class HotelbComponent implements OnInit {
  DESCRIPTION: any;
  hotelname: any;
  pricepernight: any;
  ChkInDate: any;
  ChkOutDate: any;
  NoOfRoom: number = 0;
  NoOfAdult: number = 0;
  NoOfChild: number = 0;
  roomtype: any;
  discount: any;
  currency: any;
  Response: any;
  errorMessage: any;
  paxinfo: any = {}
  profilemodel: any = {}
  HotelInfo: any;
  chekindate: any;
  chekoutdate: any;
  checkinMonth: any;
  checkoutMonth: any;
  public cartitems: any = [];

  public charge: any = 0;
  public GST: any = 0;
  public Tax: any = 0;
  public TotalPrice: any = 0;
  public roomcurrency: any;
  public duration: any;
  model = new HotelBookingModel('', '', '', '', '');
  public listofPax: any = [];
  serviceData: any = {};
  hotelformdata: any = {};
  leadpax: any = {};
  userdetail: any = {};
  bookingResponse: any;
  bookingForm: any;
  price:any;
  paymentMethodType:any;
  paymentMethodType1:any;
  loginInfo:any;
  bookwithcard:any;
  bookwithCreditLimit:any;
  cLimit:any;
  balance:any;
  bookingType:any;

  PriceCal = {
      
    
    AdultCount:1,
    ChildCount:"0",
 }

 AdultMasterList={
   AdultList:{
              Title: "",
              FirstName: "",
              LastName: "",
              Room: "",
              Email: "",
              MobileNo: "",
               }
      }
  occupencyMaster = {

    OccupancyList: {
      Occupancy: [{
        AdultCount:"1",
        AdultCount1: "1",
        AdultCount2: "",
        AdultCount3: "",
        AdultCount4: "",
        AdultCount5: "",
        ChildCount:"",
        ChildCount1: "",
        ChildCount2: "",
        ChildCount3: "",
        ChildCount4: "",
        ChildCount5: "",
        AdultCountS:"1",
        ChildCountS:"",
        RoomType: "",
        ExtraBed: "",
        RoomNo: "",
        paymentMethodType:"", 
        balance:"", 
        AgentCode:"",  
        BookingType:"",
       
        Adult: [
            {
              Title: "",
              FirstName: "",
              LastName: "",
              Room: "",
              Email: "",
              MobileNo: "",

            }
          ],       
        Childs: {
          Child: [
            {
              Title: "",
              FirstName: "",
              LastName: "",
              Age: "",
              Room: "",
              Email: "",

            }
          ]
        },
      }
      ]
    },
  }

  PolicMaster = {
    Policies: {
      Policty: {
        DateFrom: "",
        DateTo: "",
        Net_Price: "",
        Gross_Price: "",
        Markup_Type: "",
        Markup_Value: "",
        Currency: "INR",
        Desc: ""

      }
    }
  }

  
  Adultdtl = [{

    Title: "",
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNo: "",
    paymentmethod:"",
    BookingType:""

  }]

  Childdtl = [{
    Title:"",
    FirstName: "",
    LastName: "",
    Age: "",
    Email: "",

  }]

  adultdt=
  {
   Title: "",
   FirstName: "",
   LastName: "",
   Room: "",
   Email: "",
   MobileNo: "",       
 }
 chlddt=
 {
  Title:"",
  FirstName: "",
  LastName: "",
  Age: "",
  Email: "",   
}

  constructor(private hvs: HotelviewService, private hs: HotelService, private route: Router, private formBuilder: FormBuilder) {

    this.bookingForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required]]

    });

    console.log(this.bookingForm);


  }

  ngOnInit() {
    debugger;
    if (localStorage.getItem("Logininfo") != null) {
      var loginclient = JSON.parse(localStorage.getItem("Logininfo"));
      var udata = JSON.parse((<any>loginclient)._body);
      var credit = udata.Data[0];
        
      this.loginInfo=credit;
      this.paxinfo.ClientId = loginclient.AgentCode;
      this.paxinfo.FirstName = loginclient.FirstName;
      //this.paxinfo.Email_Id=JSON.parse(JSON.stringify(loginemail));
    }
    debugger;
    if (localStorage.getItem("cartItems") == null) {
      this.HotelInfo = JSON.parse(localStorage.getItem('PreBookRQ'))
      let datecheckinObj = new Date(Date.parse(this.HotelInfo.Master.ChkInDate))
      this.chekindate = datecheckinObj.getUTCDate();
      this.checkinMonth = datecheckinObj.getMonth() + 1;
      let datecheckoutObj = new Date(Date.parse(this.HotelInfo.Master.ChkOutDate))
      this.chekoutdate = datecheckoutObj.getUTCDate();
      this.checkoutMonth = datecheckoutObj.getMonth() + 1;
      this.NoOfAdult = parseInt(this.HotelInfo.Master.NoOfAdult)
      this.NoOfChild = parseInt(this.HotelInfo.Master.NoOfChild)
      this.NoOfRoom = parseInt(this.HotelInfo.Master.NoOfRooms)
      let date1 = (datecheckinObj).getDay();
      let date2 = (datecheckoutObj).getDay();

      this.duration = date2 - date1;
      for (let rm of this.HotelInfo.Hotel.Rooms.Room) {
        this.charge = this.charge + parseFloat(rm.Net_Price);
        if(rm.ServiceTax==null)
        rm.ServiceTax==0
        if(rm.Tax==null)
        rm.Tax=0

        this.GST = this.GST + parseFloat(rm.ServiceTax);
        this.Tax = Math.round(this.Tax + parseFloat(rm.Tax)+(parseFloat(rm.Gross_Price)-parseFloat(rm.Net_Price)));
        this.TotalPrice = Math.round(this.TotalPrice + parseFloat(rm.Gross_Price));
        this.roomcurrency = rm.Gross_Currency;
      }
    }
    else {

      this.cartitems = JSON.parse(localStorage.getItem("cartItems"));
      debugger;
      for (let hr of this.cartitems) {
        if (hr.Hotel != undefined) {
          this.NoOfAdult = this.NoOfAdult + parseInt(hr.Master.NoOfAdult)
          this.NoOfChild = this.NoOfChild + parseInt(hr.Master.NoOfChild)
          this.NoOfRoom = this.NoOfRoom + parseInt(hr.Master.NoOfRooms)
          for (let rm of hr.Hotel.Rooms.Room) {
            this.charge = this.charge + parseFloat(rm.Net_Price);
              if(rm.ServiceTax==null)
                rm.ServiceTax=0
                if(rm.Tax==null)
                rm.Tax=0
        
            this.GST = this.GST + parseFloat(rm.ServiceTax);
            this.Tax =Math.round( this.Tax + parseFloat(rm.Tax)+(parseFloat(rm.Gross_Price)-parseFloat(rm.Net_Price)));
            // parseFloat(rm.Tax);
            this.TotalPrice = Math.round(this.TotalPrice + parseFloat(rm.Gross_Price));
          }
        }
        if (hr.PackageId != undefined) {
          this.TotalPrice = Math.round(this.TotalPrice + parseFloat(hr.Costing));
        }
        if (hr.SightSeeingId != undefined) {
          this.TotalPrice = Math.round(this.TotalPrice + parseFloat(hr.AdultFare));
        }
      }



    }

     this.addAdult();
     if (this.NoOfChild.toString() != "NaN") {
       this.addChild();
     }

  }


  HotelBooking(paxlist: any) {
    debugger
    this.paymentMethodType=this.Adultdtl[0].paymentmethod;
    this.bookingType=this.Adultdtl[0].BookingType;
    // this.listofPax.push(JSON.stringify(paxlist));

    if (((document.getElementById("txtFirstName") as HTMLInputElement).value) == "" || ((document.getElementById("txtLastName") as HTMLInputElement).value) == "" || ((document.getElementById("txtEmailaddress") as HTMLInputElement).value) == "" || ((document.getElementById("txtMobileNo") as HTMLInputElement).value) == "") {
      alert("Please fill passenger details !!!!")
    }
    
    else if(this.paymentMethodType == "")
    {
      alert("Payment method must be chacked !!!!")
    }
    else {

      if(this.paymentMethodType=="CreditLimit")
      {
         this.cLimit=this.loginInfo.CreditLimit;
         if(this.loginInfo.CreditLimitUse==null)
           this.loginInfo.CreditLimitUse=0;
         this.balance=(parseFloat(this.loginInfo.CreditLimit)-parseFloat(this.loginInfo.CreditLimitUse))
      }
      if(parseFloat(this.balance)>=parseFloat(this.TotalPrice))
      {
         this.bookwithCreditLimit="yes";
         this.bookwithcard="No"; 
     }
     else
     {
       if(confirm("Do you want to book with Card ?"))
       {
         this.bookwithcard="yes";
         this.bookwithCreditLimit="No";
       }
     }

      
        this.cartitems = JSON.parse(localStorage.getItem("cartItems"));
        if (localStorage.getItem("cartItems") == null) {
          var orgSearchReq=JSON.parse(localStorage.getItem("HotelForm"));
          let i: number = 0;
          let n = 0;
          this.cartitems = JSON.parse(localStorage.getItem("PreBookRQ"));
          this.occupencyMaster.OccupancyList.Occupancy[0].AdultCount = this.cartitems.Master.NoOfAdult;
          this.occupencyMaster.OccupancyList.Occupancy[0].ChildCount = this.cartitems.Master.NoOfChild;
          for (var r = 0; r < this.NoOfRoom; r++) {
          if(r==0)
            {
              this.occupencyMaster.OccupancyList.Occupancy[0].AdultCount1=orgSearchReq.Rooms.Room[r].Adult;
              this.occupencyMaster.OccupancyList.Occupancy[0].ChildCount1=orgSearchReq.Master.NoOfChild1;
            }
            if(r==1)
            {
              this.occupencyMaster.OccupancyList.Occupancy[0].AdultCount2=orgSearchReq.Rooms.Room[r].Adult;
              this.occupencyMaster.OccupancyList.Occupancy[0].ChildCount2=orgSearchReq.Master.NoOfChild2;
            }
            if(r==2)
            {
              this.occupencyMaster.OccupancyList.Occupancy[0].AdultCount3=orgSearchReq.Rooms.Room[r].Adult;
              this.occupencyMaster.OccupancyList.Occupancy[0].ChildCount3=orgSearchReq.cartitems.NoOfChild3;
            }
            if(r==3)
            {
              this.occupencyMaster.OccupancyList.Occupancy[0].AdultCount4=orgSearchReq.Rooms.Room[r].Adult;
              this.occupencyMaster.OccupancyList.Occupancy[0].ChildCount4=orgSearchReq.Master.NoOfChild4;
            }
            if(r==4)
            {
              this.occupencyMaster.OccupancyList.Occupancy[0].AdultCount5=orgSearchReq.Rooms.Room[r].Adult;
              this.occupencyMaster.OccupancyList.Occupancy[0].ChildCount5=orgSearchReq.Rooms.Room[r].Children.Child;
            }
          }
          
          this.occupencyMaster.OccupancyList.Occupancy[0].RoomType = this.cartitems.Master.RoomType;
          this.occupencyMaster.OccupancyList.Occupancy[0].ExtraBed = this.cartitems.Master.ExtraBed;
          this.occupencyMaster.OccupancyList.Occupancy[0].RoomNo = this.cartitems.Master.NoOfRooms;
          this.cartitems.Master.ClientId = this.paxinfo.ClientId;
          this.occupencyMaster.OccupancyList.Occupancy[0].paymentMethodType= this.paymentMethodType;
          this.occupencyMaster.OccupancyList.Occupancy[0].balance= this.balance;
          //this.cartitems.Master.ClientName=this.paxinfo.FirstName;
          var temAdltCount = 0;
          var lasindex = 0;
          //For Adult start
          for (var j = 0; j < this.NoOfRoom; j++) {

            if (temAdltCount < this.cartitems.Master.NoOfAdult) {
              temAdltCount = temAdltCount + 1;
              if (this.cartitems.Master.NoOfAdult == 1) {
                if (temAdltCount == this.cartitems.Master.NoOfAdult) {
                  var tempOcc = this.Adultdtl;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].Title = tempOcc[j].Title;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].FirstName = tempOcc[j].FirstName;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].LastName = tempOcc[j].LastName;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].Email = tempOcc[j].Email;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].MobileNo = tempOcc[j].MobileNo;

                  //this.occupencyMaster.OccupancyList.Occupancy[j].Adults=this.Adultdtl.slice(lasindex,temAdltCount);
                  this.cartitems.OccupancyList = this.occupencyMaster.OccupancyList;
                  this.cartitems.adultmaster=this.Adultdtl;
                  lasindex = n;
                }
              }
              else {
                //  this.occupencyMaster.OccupancyList.Occupancy.pop();
                var ad=0;
                 for(var a = n; a < this.cartitems.Master.NoOfAdult; a++)
                 {
                //if (temAdltCount == this.cartitems.Master.NoOfAdult - 1) {
                 // var a=this.NoOfAdult-1;  
                   this.adultdt.Title=this.Adultdtl[a].Title;
                   this.adultdt.FirstName=this.Adultdtl[a].FirstName;
                   this.adultdt.LastName = this.Adultdtl[a].LastName;
                   this.adultdt.Email = this.Adultdtl[a].Email;
                   this.adultdt.MobileNo = this.Adultdtl[a].MobileNo;  
                   
                   this.occupencyMaster.OccupancyList.Occupancy[j].Adult[a]=this.adultdt;
                  //ad=ad+1;
                   //  else
                  //  {
                  //   this.occupencyMaster.OccupancyList.Occupancy[j].Adult[a]=this.adultdt;
                  //  }

                  //  this.cartitems.OccupancyList=this.occupencyMaster.OccupancyList;

                   //this.cartitems.OccupancyList.Occupancy[j].Adult[a]=this.adultdt;// this.occupencyMaster.OccupancyList;//Occupancy[j].Adult.push(this.adultdt);
                    //this.cartitems.OccupancyList.Occupancy[j].Adult.push(this.adultdt);
                    // this.occupencyMaster.OccupancyList.Occupancy[j].Adult[a].Title = this.Adultdtl[a].Title;
                    // this.occupencyMaster.OccupancyList.Occupancy[j].Adult[a].FirstName = this.Adultdtl[a].FirstName;
                    // this.occupencyMaster.OccupancyList.Occupancy[j].Adult[a].LastName = this.Adultdtl[a].LastName;
                    // this.occupencyMaster.OccupancyList.Occupancy[j].Adult[a].Email = this.Adultdtl[a].Email;
                    // this.occupencyMaster.OccupancyList.Occupancy[j].Adult[a].MobileNo = this.Adultdtl[a].MobileNo;
                    n = n + 1;
                  }
               this.cartitems.OccupancyList=this.occupencyMaster.OccupancyList;
               this.cartitems.adultmaster=this.Adultdtl;
              //  for(var f=0;f<this.NoOfAdult;f++)
              //  {
              //   this.occupencyMaster.OccupancyList.Occupancy[j].Adult[f].Title = this.Adultdtl[f].Title;
              //    this.occupencyMaster.OccupancyList.Occupancy[j].Adult[f].FirstName = this.Adultdtl[f].FirstName;
              //    this.occupencyMaster.OccupancyList.Occupancy[j].Adult[f].LastName = this.Adultdtl[f].LastName;
              //    this.occupencyMaster.OccupancyList.Occupancy[j].Adult[f].Email = this.Adultdtl[f].Email;
              //    this.occupencyMaster.OccupancyList.Occupancy[j].Adult[f].MobileNo = this.Adultdtl[f].MobileNo;
              //  }
              
                //else
                  //this.occupencyMaster.OccupancyList.Occupancy=this.Adultdtl.slice(lasindex,temAdltCount);
                  //this.cartitems.OccupancyList.push(this.occupencyMaster.OccupancyList.Occupancy[j].Adult);
                  //lasindex = n;
                //}
              //}
              
            }
           
          }
        
         // this.cartitems.OccupancyList.Occupancy[0].push(tempOcc);
          //End
          //Start Child start
          var temChildCount = 0;
          var lasindexChild = 0;
          let l=0
          if(this.cartitems.Master.NoOfChild>0)
          {
           for (var k = l; k < this.cartitems.Master.NoOfChild; k++) {

            if (temChildCount < this.cartitems.Master.NoOfChild) {
              temChildCount = temChildCount + 1;
              if (this.cartitems.Master.NoOfChild == 1) {
                if (temChildCount == this.cartitems.Master.NoOfChild) {
                  var tempchild = this.Childdtl;
                  
                  
                  //var len=this.occupencyMaster.OccupancyList.Occupancy.length;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Childs.Child[k].Title=   tempchild[k].Title;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Childs.Child[k].FirstName = tempchild[k].FirstName;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Childs.Child[k].LastName = tempchild[k].LastName;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Childs.Child[k].Email = tempchild[k].Email;
                  this.occupencyMaster.OccupancyList.Occupancy[0].Childs.Child[k].Age = tempchild[k].Age;
                  this.cartitems.OccupancyList.ChildList=this.Childdtl
                  //this.occupencyMaster.OccupancyList.Occupancy[j].Adults=this.Adultdtl.slice(lasindex,temAdltCount);
                  //tempOcc.push(tempchd);
                  //debugger;
                  //this.cartitems.OccupancyList.Occupancy[0].Childs.Child.push(this.occupencyMaster.OccupancyList.Occupancy[0].Childs);//this.occupencyMaster.OccupancyList;
                  lasindexChild = k;
                }
              }
              else {
                for(var c = n; c < this.NoOfChild; c++)
                {
               //if (temAdltCount == this.cartitems.Master.NoOfAdult - 1) {
                // var a=this.NoOfAdult-1;  
                  this.chlddt.Title=this.Childdtl[a].Title;
                  this.chlddt.FirstName=this.Childdtl[a].FirstName;
                  this.chlddt.LastName = this.Childdtl[a].LastName;
                  this.chlddt.Email = this.Childdtl[a].Email;
                  this.chlddt.Age = this.Childdtl[a].Age;  
                }
                  lasindexChild = k;
                //}

                this.cartitems.OccupancyList.ChildList=this.Childdtl
              }
            }
            l = l + 1;

          }
        }
      }
          //END
          
          this.cartitems.Policies = this.PolicMaster.Policies;
          
          i = i + 1;
        }

        else {
          let i: number = 0;
          let len = this.cartitems.length;
          let n = 0;
          debugger;

          for (let temp of this.cartitems) {
            if (!temp.PackageId && !temp.SightSeeingId) {
              if (i < len) {
                this.occupencyMaster.OccupancyList.Occupancy[i].AdultCount = temp.Master.NoOfAdult;
                this.occupencyMaster.OccupancyList.Occupancy[i].ChildCount = temp.Master.NoOfChild;
                this.occupencyMaster.OccupancyList.Occupancy[0].AdultCountS = this.PriceCal.AdultCount.toString();
                this.occupencyMaster.OccupancyList.Occupancy[0].ChildCountS = this.PriceCal.ChildCount.toString();
                this.occupencyMaster.OccupancyList.Occupancy[i].RoomType = temp.Master.RoomType;
                this.occupencyMaster.OccupancyList.Occupancy[i].ExtraBed = temp.Master.ExtraBed;
                this.occupencyMaster.OccupancyList.Occupancy[i].RoomNo = temp.Master.NoOfRooms;
                this.occupencyMaster.OccupancyList.Occupancy[0].paymentMethodType= this.paymentMethodType;
                this.occupencyMaster.OccupancyList.Occupancy[0].balance= this.balance;
                this.occupencyMaster.OccupancyList.Occupancy[0].AgentCode = this.paxinfo.ClientId;
                this.occupencyMaster.OccupancyList.Occupancy[0].BookingType= this.bookingType;
                //this.cartitems.Master.ClientId=this.paxinfo.ClientId;
                //this.cartitems.Master.FirstName=this.paxinfo.FirstName;
               
                var temAdltCount = 0;
                var lasindex = 0;
                for (var j = n; j < this.NoOfAdult; j++) {

                  if (temAdltCount < temp.Master.NoOfAdult) {
                    temAdltCount = temAdltCount + 1;
                    if (temp.Master.NoOfAdult == 1) {
                      if (temAdltCount == temp.Master.NoOfAdult) {
                        var tempOcc = this.Adultdtl.slice(lasindex, temAdltCount);
                        this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].Title = tempOcc[j].Title;
                        this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].FirstName = tempOcc[j].FirstName;
                        this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].LastName = tempOcc[j].LastName;
                        this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].Email = tempOcc[j].Email;
                        this.occupencyMaster.OccupancyList.Occupancy[0].Adult[j].MobileNo = tempOcc[j].MobileNo;

                        //this.occupencyMaster.OccupancyList.Occupancy[j].Adults=this.Adultdtl.slice(lasindex,temAdltCount);
                        temp.OccupancyList = this.occupencyMaster.OccupancyList;
                        lasindex = n;
                      }
                    }
                    else {
                      //if (temAdltCount == temp.Master.NoOfAdult - 1) {

                        var tempOcc = this.Adultdtl.slice(lasindex, temAdltCount);
                        //this.occupencyMaster.OccupancyList.Occupancy[i].Adult=this.Adultdtl;
                        // this.occupencyMaster.OccupancyList.Occupancy[i].Adults[j].Adult[j].Title = tempOcc[j].Title;
                        // this.occupencyMaster.OccupancyList.Occupancy[i].Adults[j].Adult[j].FirstName = tempOcc[j].FirstName;
                        // this.occupencyMaster.OccupancyList.Occupancy[i].Adults[j].Adult[j].LastName = tempOcc[j].LastName;
                        // this.occupencyMaster.OccupancyList.Occupancy[i].Adults[j].Adult[j].Email = tempOcc[j].Email;
                        // this.occupencyMaster.OccupancyList.Occupancy[i].Adults[j].Adult[j].MobileNo = tempOcc[j].MobileNo;

                        //this.occupancyListtemp.Occupancy[j].Adults=this.Adultdtl.slice(lasindex,temAdltCount);
                        temp.OccupancyList = this.occupencyMaster.OccupancyList;
                        lasindex = n;
                      //}
                    }
                  }
                  n = n + 1;
                }

                temp.Policies = this.PolicMaster.Policies;
                i = i + 1;
              }
            }
            else {
              temp.OccupancyList = this.Adultdtl.slice(0);
            }
          }
        }
        if(this.bookwithcard=="yes")
        {
          let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
          window.location.href = 'http://airpay.mageinfotech.com/sendtoairpay.aspx?'+'buyerEmail='+ this.Adultdtl[0].Email+'&&'+'buyerPhone='+this.Adultdtl[0].MobileNo
          +'&&'+'buyerFirstName='+this.Adultdtl[0].FirstName+'&&'+'buyerLastName='+this.Adultdtl[0].LastName+'&&'+'amount='+this.TotalPrice+'&&'+'orderid='+random+'&&'+'currency='+this.roomcurrency;
        }
        debugger;
        //this.cartitems.AdultCount
        this.leadpax=this.listofPax;
        if(this.bookwithCreditLimit=="yes" || this.bookwithcard=="yes")
        {
          this.cartitems.Master.AgentCode=this.paxinfo.ClientId;

        this.hs.hotelbook(this.cartitems)
          .subscribe(data => {
            this.bookingResponse = data;
            localStorage.setItem("bookingresponse", this.bookingResponse);
            this.route.navigate(['/ThankYou']);
          },
            error => {
              //error
              console.log('error');
            }

          );
        }
        else
        {
          alert("You have not selected right booking opetion!");
         
        }
      }
    }
    postdata(paxinfo: any) {


      this.hvs.leadpax = this.paxinfo;
      this.hs.hotelbook(this.hvs)


        .subscribe(
          data => {


          },


          () => {

          });
    }

    addAdult() {

      for (var i = 1; i < this.NoOfAdult; i++) {
        this.Adultdtl.push({
          Title: "Mr.",
          FirstName: "Ranjit",
          LastName: "kumar",
          Email: "",
          MobileNo: "",
          paymentmethod:"",
          BookingType:""
        });
      }
    }
    addChild() {

      for (var i = 0; i < this.NoOfChild - 1; i++) {
        this.Childdtl.push({
          Title:"Master",
          FirstName: "A",
          LastName: "kumar",
          Age: "",
          Email: ""

        });
      }
    }

calculatePrice(model:any)
{
   debugger;
 if(localStorage.getItem("cartItems")!=null)
 { 
  this.cartitems = JSON.parse(localStorage.getItem("cartItems"));
      for(let temp of this.cartitems)
      {   
        if(temp.SightSeeingId!=undefined)
        {
        if(this.price==null)
        this.price=temp.AdultFare;
        else
          temp.AdultFare=this.price;
        var finalPrice=0;

        finalPrice=((parseFloat(this.price)*this.PriceCal.AdultCount)
            + parseFloat(temp.ChildFare)* parseInt(this.PriceCal.ChildCount));
          
            temp.AdultFare=finalPrice;
            temp.AdultCount=this.PriceCal.AdultCount;
            temp.ChildWCount=this.PriceCal.ChildCount;
          this.TotalPrice= this.TotalPrice + parseFloat( temp.AdultFare)
          this.TotalPrice=this.TotalPrice-this.price;
            //count=1;
            //localStorage.setItem('SightData', JSON.stringify(this.SightSeeingInfo));
        }
      }
    }   
 }

}