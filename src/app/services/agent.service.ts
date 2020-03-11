import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
@Injectable()
export class AgentService {
  mageinfotechApiUrl = environment;
  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  // fare : any;
   constructor(private _http: Http) { }
   staffcreate(user: any) {
    return this._http.post(this.mageinfotechApiUrl+'Operation/AddStaff', user);
}

getstaffdetails(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  return this._http.post(this.mageinfotechApiUrl+'Operation/GetAllStaff',data)
  .map(response => response.json())
  .catch(this.handleError);
}  

AgentProfile(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });
  
  return this._http.post(this.mageinfotechApiUrl+'Operation/AgentProfile',data)
  .map(response => response.json())
  .catch(this.handleError);
}   

updateagentprofile(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/AgentUpdateProfile', user);
}

getTransactionDetails(data:any) {
  let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  header.append('Access-Control-Allow-Origin', '*');
  let options = new RequestOptions({ headers: header });

 
  return this._http.post(this.mageinfotechApiUrl+'Operation/GetTransactionDetails',data)
  .map(response => response.json())
  .catch(this.handleError);
}

AgentRegister(user: any) {
  return this._http.post(this.mageinfotechApiUrl+'Operation/AgentRegistration', user);
}
private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}
checkpassword(user: any) {
  return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentCheckPassword', user);
}

changepassword(user: any) {
  return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentChangePassword', user);
}
}
