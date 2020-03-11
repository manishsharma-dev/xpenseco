import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  constructor(private _http: Http) { }
  restApiFullUrl = environment.restApiFullUrl;
  AgentAuthentication(model:any) {
    // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
     var reqHeader = new Headers({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
     
     let options = new RequestOptions({ headers: reqHeader });
     return this._http.post(this.restApiFullUrl+'Operation/agentlogin', model) 
     .pipe(map(user => {
         // login successful if there's a jwt token in the response
         if (user && (<any>user)._body) {
             // store user details and jwt token in local storage to keep user logged in between page refreshes
             localStorage.setItem('currentUser', JSON.stringify({
                 timestamp: new Date(),
                 user:user}));
             var da = JSON.parse((<any>user)._body);
         }

         return user;
     }));
   }
}
