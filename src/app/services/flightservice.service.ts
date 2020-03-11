import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { data } from '../providers/data/search-result-data';
import { environment } from '../../environments/environment';
@Injectable()
export class FlightserviceService {
  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  // fare : any;
  restApiFullUrl = environment.restApiFullUrl;
  flightApiUrl = environment.flightApiUrl;
   constructor(private _http: Http) { }

   GetFlights(name : any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    let body =
        {
            "AuthenticationData": {
                "ClientID": "SMT",
                "ClientType": "Direct/API",
                "Service": "Flight"
            },
            "Request": {
                "Origin": "LKO",
                "Destination": "MAA",
                "DepartureDate": "12 June 2018",
                "ReturnDate": "13 June 2018",
                "AdultCount": "1",
                "ChildCount": "0",
                "InfantCount": "0",
                "SeniorCount": "0",
                "Type": "Domestic",
                "JourneyType": "OneWay",
                "PreferredCabinClass": "Economy",
                "PromotionalPlanType": "Normal",
                "Currency": "INR",
                "ClientName":"Skysafar"
            }
        };
    return this._http.post(this.flightApiUrl+"Flight/GetFlight", name)
        .map(response => response.json())
        .catch(this.handleError);
}

private handleError(error: any) {
  let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}

GetFlihtsFareRule(fare: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    
    return this._http.post(this.flightApiUrl+"Flightfarerule/GetFlight", fare)
        .map(response => response.json())
        .catch(this.handleError);
}


GetFlihtsPrice(fare: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    
    return this._http.post(this.flightApiUrl+"Flightprice/GetFare", fare)
        .map(response => response.json())
        .catch(this.handleError);
}

GetFlightsMealBaggs(fare: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    
    return this._http.post(this.flightApiUrl+"Flightmeal/GetFlight", fare)
        .map(response => response.json())
        .catch(this.handleError);
}

checkCreditLimit(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post(this.restApiFullUrl+'Operation/CheckCreditLimit',data)
    .map(response => response.json())
    .catch(this.handleError);
}

userAuthentication(userName:any, password:any) {
  var data = "username=" + userName + "&password=" + password + "&grant_type=password";
  var reqHeader = new Headers({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
  
  let options = new RequestOptions({ headers: reqHeader });
  return this._http.post('http://flightapi.sourcemytrip.com/token', data) 
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
  return this._http.post(this.flightApiUrl+'B2CProfile/GetUserInfo', user)
                .map(table=>JSON.parse((<any>table)._body))
                  .catch(this.handleError);

}
GetFlihtsBookDetails(authreq: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
  
    return this._http.post(this.flightApiUrl+"FlightBooking/GetFlightBooking", authreq, options)
        .map(response => response.json())
        .catch(this.handleError);
}

getCustomerInvoice(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post(this.restApiFullUrl+'Operation/GetCustomerInvoice',data)
    .map(response => response.json())
    .catch(this.handleError);
} 
EmailTicket(user: any) {
    return this._http.post(this.restApiFullUrl+'Operation/SendMail', user);
  }

  getCurrency() {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    return this._http.post(this.restApiFullUrl+'Operation/GetAllCurrency',data)
    .map(response => response.json())
    .catch(this.handleError);
} 
queryReferesh(model:any) {
    // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
     var reqHeader = new Headers({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
     
     let options = new RequestOptions({ headers: reqHeader });
     return this._http.post(this.restApiFullUrl+'Operation/queryReferesh', model) 
     .map(user => {
         // login successful if there's a jwt token in the response
         if (user && (<any>user)._body) {
             // store user details and jwt token in local storage to keep user logged in between page refreshes
             localStorage.setItem('currentUser', JSON.stringify({
                 timestamp: new Date(),
                 user:user}));
             var da = JSON.parse((<any>user)._body);
         }

         return user;
     });
   }
}
