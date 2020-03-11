
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightserviceService } from '../../services/flightservice.service';
import { HotelService } from '../../services/hotel.service';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  model: any = {};  
  bookingResponse:any;
  IsPackage:boolean=false;
  IsHotel:boolean=false;
  IsPackagetrue:boolean=false;
  duration:any;
  DateTime:any;
   BookingRef:any
  ServiceType:any;
  ticketDetails: any[]
  segmentDetails:any[]
  ticket:any;
  constructor(private hs: HotelService,private flightService: FlightserviceService) { }

  ngOnInit() {
    debugger;
    if(localStorage.getItem("cartItems")!=null)
    localStorage.removeItem("cartItems");
 
    this.bookingResponse=JSON.parse(localStorage.getItem("bookingresponse"));
    this.BookingRef=this.bookingResponse.BookingRefNo;
    if(this.bookingResponse.PackageId!=null)
    {
      this.IsPackage=true;
      this.IsHotel=false;
      this.ServiceType="Package";
    }
    if(this.bookingResponse.Master!=null)
    {
      this.IsPackage=false;
      this.IsHotel=true;
      this.ServiceType="Hotel";
      let date1 = new Date(this.bookingResponse.Master.ChkInDate).getDay();
      let date2 = new Date(this.bookingResponse.Master.ChkOutDate).getDay();
      let days =  date2-date1;
      this.duration= days-1;
    }
    //ardthfyu
    // this.model.BookingRef=this.BookingRef;
    // this.model.ServiceType=this.ServiceType;
    // this.flightService.getTicketDetails(this.model)
    //         .subscribe(data => {
    //             this.ticketDetails = data.Table;   
    //             this.ticket =this.ticketDetails[0];
    //             if(this.bookingResponse.PackageId!=null)
    //               {
    //                 this.IsHotel=false;
    //                 this.IsPackage=true;
    //               }   
    //               else
    //               {
    //                 this.IsHotel=true;
    //                 this.IsPackage=false;
    //               }    
    //         })
    //hgvghvghv
  }

  printTicket(): void {
    debugger;
    //this.DisplayPrint = true;
     let printContents, popupWin;
     printContents = document.getElementById('print-Ticket').innerHTML;

     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
     popupWin.document.open();
     popupWin.document.write(`
       <html>
         <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1">

         <!-- Bootstrap CSS -->
         <link rel="stylesheet" href="./assets/hcss/bootstrap.min.css">
         <link rel="stylesheet" href="./assets/hcss/style.css">
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

         <title>Invoice</title>

         </head>
     <body onload="window.print();window.close()">${printContents}

     <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
     <script src="./assets/Admin/js/bootstrap.min.js"></script>
     <script src="./assets/Admin/js/jquery.min.js"></script>
     </body>
       </html>`
     );
     popupWin.document.close();
 }


 Invoice(): void {
  debugger;
   let printContents, popupWin;
   printContents = document.getElementById('Ticket-Invoice').innerHTML;

   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
   popupWin.document.open();
   popupWin.document.write(`
     <html>
       <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">

       <!-- Bootstrap CSS -->
       <link rel="stylesheet" href="./assets/hcss/bootstrap.min.css">
       <link rel="stylesheet" href="./assets/hcss/style.css">
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

       <title>Invoice</title>

       </head>
   <body onload="window.print();window.close()">${printContents}

   <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
   <script src="./assets/Admin/js/bootstrap.min.js"></script>
   <script src="./assets/Admin/js/jquery.min.js"></script>
   </body>
     </html>`
   );
   popupWin.document.close();
}
  ViewMail() {
    debugger
    if (this.IsHotel == true) {
      this.model.txtEmail = this.bookingResponse.OccupancyList.Occupancy[0].Adults[0].Adult[0].Email;
      this.model.ticketType = "Hotel Invoice";
      this.model.mailcontent = document.getElementById("print-Ticket").innerHTML;
    }
    else {
      this.model.txtEmail = this.bookingResponse.OccupancyList.Email;
      this.model.ticketType = "Package Invoice";
      this.model.mailcontent = document.getElementById("itinaryhtmlforemailPkg").innerHTML;
    }
    this.flightService.EmailTicket(this.model)
      .subscribe(data => {
        this.IsPackagetrue = true;
        this.IsPackage = false;
      })
  }   
}
