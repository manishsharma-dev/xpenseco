import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './agent-login/login/login.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { HeaderComponent } from './header/header.component';
const routes: Routes = [
  {
    path: 'Flights',
    loadChildren: './flight/flight.module#FlightModule'
  },
  {
    path: 'FlightResult',
    loadChildren: './flight-search/flight-search.module#FlightSearchModule'
  },
  {
    path: 'FlightBooking',
    loadChildren: './flight-booking/flight-booking.module#FlightBookingModule'
  },
  {
    path: 'ReviewBooking',
    loadChildren: './review-bookings/review-bookings.module#ReviewBookingsModule'
  },
  {
    path: 'int-result',
    loadChildren: './int-result/int-result.module#IntResultModule'
  },
  {
    path: 'Int-Booking',
    loadChildren: './int-booking/int-booking.module#IntBookingModule'
  },
  {
    path: 'MyBooking',
    loadChildren: './Accounts/mbooking/mbooking.module#MBookingModule'
  },
  {
    path: 'MyLedger',
    loadChildren: './Accounts/mledger/mledger.module#MLedgerModule'
  },
  {
    path: 'MakePayment',
    loadChildren: './Accounts/mpayment/mpayment.module#MPaymentModule'
  },
  {
    path: 'AddMarkup',
    loadChildren: './Accounts/markup/markup.module#MarkupModule'
  },
  {
    path: 'Queue',
    loadChildren: './Accounts/queues/queues.module#QueuesModule'
  },
  {
    path: 'Reports',
    loadChildren: './Accounts/report/report.module#ReportModule'
  },
  {
    path: 'BankDetails',
    loadChildren: './Accounts/bank-detail/bank-detail.module#BankDetailModule'
  },
  {
    path: 'ViewSLA',
    loadChildren: './Accounts/sla/sla.module#SLAModule'
  },
  {
    path: 'Support',
    loadChildren: './supports/supports.module#SupportsModule'
  },
  {
    path: 'Agent-Registration',
    loadChildren: './registration/registration.module#RegistrationModule'
  },
  {
    path: 'Agent-Registration',
    loadChildren: './registration/registration.module#RegistrationModule'
  },
  {
    path: 'FlightResults',
    loadChildren: './dome-return/dome-return.module#DomeReturnModule'
  },
  {
    path: 'Ticket',
    loadChildren: './Accounts/tickets/tickets.module#TicketsModule'
  },
  {
    path: 'CustomerInvoice',
    loadChildren: './Accounts/invoice/invoice.module#InvoiceModule'
  },
  {
    path: 'TicketPrint',
    loadChildren: './Accounts/print/print.module#PrintModule'
  },
  {
    path: 'CancelRequest',
    loadChildren: './Accounts/cancel/cancel.module#CancelModule'
  },
  {
    path: 'Reschedule',
    loadChildren: './Accounts/res/res.module#ResModule'
  },
  {
    path: 'ThankYou',
    loadChildren: './thank-you/thank-you.module#ThankYouModule'
  },
  {
    path: 'hotel',
    loadChildren: './hotel/hotel.module#HotelModule'
  },
  {
    path: 'Hotel-Result',
    loadChildren: './hotels/hotels.module#HotelsModule'
  },
  {
    path: 'Hotel-Detail',
    loadChildren: './hoteldetail/hoteldetail.module#HoteldetailModule'
  },
  {
    path: 'hotel-booking',
    loadChildren: './hotelbooking/hotelbooking.module#HotelbookingModule'
  },
  {
    path: 'Holiday',
    loadChildren: './holiday/holiday.module#HolidayModule'
  },
  {
    path: 'Holiday-Result',
    loadChildren: './holidayresult/holidayresult.module#HolidayresultModule'
  },
  {
    path: 'Holiday-Detail',
    loadChildren: './holidaydetail/holidaydetail.module#HolidaydetailModule'
  },
  {
    path: 'Holiday-Booking',
    loadChildren: './holidaybooking/holidaybooking.module#HolidaybookingModule'
  },
  {
    path: 'admin-area',
    loadChildren: './admin-area/admin-area.module#AdminAreaModule'
   },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
//   {
// path:"",
// redirectTo:"Flights",
// pathMatch:"full"
//   },
  {
    path: '',
    component: SiteFooterComponent
  },
  {
    path: '',
    component: HeaderComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, ReactiveFormsModule]
})
export class AppRoutingModule { }
