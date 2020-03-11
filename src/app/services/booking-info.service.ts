import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
@Injectable()
export class BookingInfoService {
  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  // fare : any;
  mageinfotechApiUrl = environment
   constructor(private _http: Http) { }
  
   GetFlihtsBookDetails(authreq: any) {
    debugger;
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
  
    return this._http.post("http://flight.mageinfotech.com/api/FlightBooking/GetFlightBooking", authreq, options)
        .map(response => response.json())
        .catch(this.handleError);
}

private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}

EmailTicket(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/SendMail', user);
}


  }
