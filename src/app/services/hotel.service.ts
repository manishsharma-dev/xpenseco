import { Injectable } from '@angular/core';


import { Http , Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { _throw } from 'rxjs/observable/throw';
import { filter, map, catchError } from 'rxjs/operators';
import { HotelviewService } from './hotelview.service';
//import { request } from 'http';
import { environment } from '../../environments/environment';

@Injectable()
export class HotelService {
    restApiFullUrl = environment.restApiFullUrl;
    restApiUrl = environment.restApiUrl;
    hotelAPiUrl = environment.hotelApiUrl;
    table:any={};  
   
    private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
     constructor(private _http: Http, private hvs: HotelviewService) { }
   
     GetHotels(hotelmodel:any) {
     debugger
      let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
      header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      header.append('Access-Control-Allow-Origin', '*');
      let options = new RequestOptions({ headers: header });
       
       return this._http.post(this.hotelAPiUrl+"hotel/GetHotel" ,hotelmodel, options)
       .map(response => response.json())
       .catch(this.handleError);
   
   }
   
   GetRooms(hotelmodel:any) {
       debugger
        let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
        header.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: header });
         
         return this._http.post(this.hotelAPiUrl+"hotel/GetRooms" ,hotelmodel, options)
         .map(response => response.json())
         .catch(this.handleError);
            
     
     
     }
   
   
   
   PreBook(hotelmodel:any) {
     
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
        
        return this._http.post(this.hotelAPiUrl+"Hotel/GetPreBook" ,hotelmodel, options)
        .map(response => response.json())
        .catch(this.handleError);
           
    
    
    }
   
   
   hotelbook(hotelreservation:any) {
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
    //   var data = "username=" + hotelreservation + "&password=" + userdetail + "&grant_type=password";
    
       debugger;
       return this._http.post(this.hotelAPiUrl+'Hotel/BookHotel',hotelreservation,options)
       .map(response => response.json())
       .catch(this.handleError);
   }
   
   
   
   
   // GetHotelss(GetHotelss: any) {
   //     debugger;
   //         let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
   //         header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
   //         header.append('Access-Control-Allow-Origin', '*');
   //         let options = new RequestOptions({ headers: header });
   //     debugger;
   //     return this._http.post(this.hotelAPiUrl+"hotel/GetHotel ", GetHotelss, options)
   //     .map(response => response.json())
   //     .catch(this.handleError);
   // }
   
   
   
   Getcredential(username: string,password: string) {
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
   
       var data = "username=" + username + "&password=" + password + "&grant_type=password";
       //debugger;
       return this._http.post(this.restApiUrl+'token',data)
       .map(response => response.json())
       .catch(this.handleError);
   }       
   
   
   signupuser(data:any) {
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
   
       //var data = "username=" + username + "&password=" + password + "&grant_type=password";
       //debugger;
       return this._http.post(this.restApiFullUrl+'HotelOperation/SignupHotel',data)
       .map(response => response.json())
       .catch(this.handleError);
   }       
   
   
   
   
   changepassword(data:any) {
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
   
       //var data = "username=" + username + "&password=" + password + "&grant_type=password";
       //debugger;
       return this._http.post(this.restApiFullUrl+'HotelOperation/userupdate',data)
       .map(response => response.json())
       .catch(this.handleError);
   }       
   
   
   updateb2c(data:any) {
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
   
       //var data = "username=" + username + "&password=" + password + "&grant_type=password";
       //debugger;
       return this._http.post(this.restApiFullUrl+'HotelOperation/TEXB2CProfile_Update',data)
       .map(response => response.json())
       .catch(this.handleError);
   }     
   
   
   
   
   
   getuserlogindetail(data:any) {
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
   
       //var data = "username=" + username + "&password=" + password + "&grant_type=password";
       //debugger;
       return this._http.post('restapi.sourcemytrip.com/api/HotelOperation/getuserlogindetail',data)
       .map(response => response.json())
       .catch(this.handleError);
   }       
   
   
   
   hotelbookingsummary(data:any) {
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
   
       //var data = "username=" + username + "&password=" + password + "&grant_type=password";
       //debugger;
       return this._http.post(this.restApiFullUrl+'HotelOperation/HotelBookingSummary',data)
       .map(response => response.json())
       .catch(this.handleError);
   }       
   
   
   private extractData(res: Response) {
       let body = res.json();
       return body || {};
   }
   
   
   
   
   private handleError(error: any) {
       let errMsg = (error.message) ? error.message :
           error.status ? `${error.status} - ${error.statusText}` : 'Server error';
       console.error(errMsg);
       return Observable.throw(errMsg);
   }
   
   
   
   
   // private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
   // constructor(private http: Http) { }
   
   // getCountries() {
   //     return this.http.get('http://localhost:35679/api/GetCountryCity')
   //         .toPromise()
   //         .then(res => <any[]>res.json().data)
   //         .then(data => { return data; });
   // }
   
   GetCCity(countrycity:any) {
     debugger;
       let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
       header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
       header.append('Access-Control-Allow-Origin', '*');
       let options = new RequestOptions({ headers: header });
        
        return this._http.post(this.restApiFullUrl+"HotelOperation/GetCountryCity" ,countrycity,options)
        .map(response => response.json())
        .catch(this.handleError);
           
    
    
    }
   
   }
   
   function mapGetData(response: Response): any[] {
       //     //throw new Error('ups! Force choke!');
       
       //     // The response of the API has a results
            // property with the actual results
            return response.json();
        }
   
   
   
   function mapPostData(response: Response): any {
       if (response.ok) {
           return response.json().d;
       }
       else {
           return "error";
       }
       
   }
   