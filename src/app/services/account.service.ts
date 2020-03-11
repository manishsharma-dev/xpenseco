import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class AccountService {
  mageinfotechApiUrl = environment;
  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  // fare : any;
   constructor(private _http: Http) { }

   getmybooking(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    return this._http.post(this.mageinfotechApiUrl+'Operation/MyBooking',data)
    .map(response => response.json())
    .catch(this.handleError);
} 

getmyledger(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post(this.mageinfotechApiUrl+'Operation/MyLedger',data)
  .map(response => response.json())
  .catch(this.handleError);
} 

agentmakepayment(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/AgentMakePayment', user);
}

agentmarkup(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/AgentAddMarkup', user);
}

getAgentMarkup(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post(this.mageinfotechApiUrl+'Operation/GetMarkup',data)
  .map(response => response.json())
  .catch(this.handleError);
} 

updateagentmarkup(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/UpdateAgentMarkup', user);
}

DeleteAgentMarkup(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post(this.mageinfotechApiUrl+'Operation/DeleteMarkup',data)
  .map(response => response.json())
  .catch(this.handleError);
} 
getBkngQueue(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetAllBookingQueue',data)
  .map(response => response.json())
  .catch(this.handleError);
}  
getCancelQueue(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetAllCancellation',data)
  .map(response => response.json())
  .catch(this.handleError);
}  
getRescheduleQueue(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetAllReschedule',data)
  .map(response => response.json())
  .catch(this.handleError);
}  
getPaymentQueue(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetAllPaymentQueue',data)
  .map(response => response.json())
  .catch(this.handleError);
} 

getCustomerInvoice(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });

  //var data = "username=" + username + "&password=" + password + "&grant_type=password";
  //debugger;
  return this._http.post(this.mageinfotechApiUrl+'Operation/GetCustomerInvoice',data)
  .map(response => response.json())
  .catch(this.handleError);
}  

EmailTicket(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/SendMail', user);
}
getTicketDetailsPrint(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });

  //var data = "username=" + username + "&password=" + password + "&grant_type=password";
  //debugger;
  return this._http.post(this.mageinfotechApiUrl+'Operation/GetTicketPrint',data)
  .map(response => response.json())
  .catch(this.handleError);
}  

getCancelTicket(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });

  //var data = "username=" + username + "&password=" + password + "&grant_type=password";
  //debugger;
  return this._http.post(this.mageinfotechApiUrl+'Operation/GetCancelTicket',data)
  .map(response => response.json())
  .catch(this.handleError);
} 

PartialCancel(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/TicketCancelRequest', user);
}
FullCancel(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/TicketCancelRequest', user);
}
RescheduleRequest(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/TicketRescheduleRequest', user);
}
private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}

}
