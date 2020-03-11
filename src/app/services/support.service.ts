import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
@Injectable()
export class SupportService {
  mageinfotechApiUrl = environment;
  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  // fare : any;
   constructor(private _http: Http) { }

   groupbooking(user: any) {
    return this._http.post(this.mageinfotechApiUrl+'Operation/GroupBooking', user);
}
addcreditrequest(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/CreditRequest', user);
}
addsupportrequest(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/SupportRequest', user);
}
}
