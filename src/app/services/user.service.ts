import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  mageinfotechApiUrl = environment;
  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  // fare : any;
   constructor(private _http: Http) { }

   checkCreditLimit(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //debugger;
    return this._http.post(this.mageinfotechApiUrl+'Operation/CheckCreditLimit',data)
    .map(response => response.json())
    .catch(this.handleError);
}

userAuthentication(userName:any, password:any) {
  var data = "username=" + userName + "&password=" + password + "&grant_type=password";
  var reqHeader = new Headers({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
  
  let options = new RequestOptions({ headers: reqHeader });
  return this._http.post('http://flight.mageinfotech.com/token', data) 
  .map(user => {
      if (user && (<any>user)._body) {
            localStorage.setItem('currentUser', JSON.stringify({
              timestamp: new Date(),
              user:user}));
          var da = JSON.parse((<any>user)._body);
      }

      return user;
  });
}

getUserInfo(user:any): Observable<any> {
  return this._http.post('http://flight.mageinfotech.com/api/B2CProfile/GetUserInfo', user)
                .map(table=>JSON.parse((<any>table)._body))
                  .catch(this.handleError);

}

private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}
}