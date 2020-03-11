import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
@Injectable()
export class AirportService {

  private header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' });
  // fare : any;
  mageinfotechApiUrl = environment;
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
    return this._http.post("http://expapi.mageinfotech.com/api/Flight/GetFlight", name)
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

GetFlihtsFareCheck(fare: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    
    return this._http.post("http://expapi.mageinfotech.com/api/Flightprice/GetFare", fare)
        .map(response => response.json())
        .catch(this.handleError);
}
GetFlihtsFareRule(fare: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    
    return this._http.post("http://expapi.mageinfotech.com/api/Flightfarerule/GetFlight", fare)
        .map(response => response.json())
        .catch(this.handleError);
}

 //search(): Promise<FlightSearch> {
//    return Promise.resolve(JSON.stringify(data));
//};
//slowSearch(): Promise<FlightSearch> {
//    return new Promise(resolve => {
//        // Simulate server latency with 2 second delay
//        setTimeout(() => resolve(this.search()), 2000);
//    });
//};
GetFlihtsBookDetails(authreq: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
  
    return this._http.post("http://expapi.mageinfotech.com/api/FlightBooking/GetFlightBooking", authreq, options)
        .map(response => response.json())
        .catch(this.handleError);
}
create(user: any) {
    return this._http.post('http://expapi.mageinfotech.com/api/B2CProfile/Register', user);
}
agentcreate(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/SignupAgent', user);
}
staffcreate(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AddStaff', user);
}
agentmakepayment(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentMakePayment', user);
}
agentmarkup(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentAddMarkup', user);
}
updateagentmarkup(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/UpdateAgentMarkup', user);
}
AgentRegister(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentRegistration', user);
}

updateagentprofile(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentUpdateProfile', user);
}

checkpassword(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentCheckPassword', user);
}

changepassword(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentChangePassword', user);
}

groupbooking(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GroupBooking', user);
}
addcreditrequest(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/CreditRequest', user);
}
addsupportrequest(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/SupportRequest', user);
}
getAgentMarkup(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetMarkup',data)
    .map(response => response.json())
    .catch(this.handleError);
}  

DeleteAgentMarkup(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/DeleteMarkup',data)
    .map(response => response.json())
    .catch(this.handleError);
}  
getstaffdetails(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetAllStaff',data)
    .map(response => response.json())
    .catch(this.handleError);
}  
getmybooking(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/MyBooking',data)
    .map(response => response.json())
    .catch(this.handleError);
} 
AgentProfile(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/AgentProfile',data)
    .map(response => response.json())
    .catch(this.handleError);
}   
TripInfoDetails(authreq: any) {
    return this._http.post('http://expapi.mageinfotech.com/api/B2CProfile/GetBookingInfo', authreq)
    .map(table=>JSON.parse((<any>table)._body));
}
userAuthentication(userName:any, password:any) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new Headers({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    
    let options = new RequestOptions({ headers: reqHeader });
    return this._http.post('http://expapi.mageinfotech.com/token', data) 
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
AgentAuthentication(model:any) {
   // var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new Headers({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    
    let options = new RequestOptions({ headers: reqHeader });
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/agentlogin', model) 
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
  getAirPortJSON(): Observable<any> {
    return this._http.get("./assets/js/airportcode.json")
                    .map(Airport => {
                        // login successful if there's a jwt token in the response
                        if (Airport) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('CountryAirport', JSON.parse(JSON.stringify({
                                user:Airport})));
                            // var da = JSON.parse(user._body);
                        }
            
                        return Airport;
                    })
                    .catch(this.handleError);

}

GetAirportList(countrycity: any)  {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    return this._http.post("http://expapi.mageinfotech.com/api/Flight/GetAiportCityList", countrycity, options)
        .map(response => response.json())
        .catch(this.handleError);
}
SelectAirportList(AirportCode: any)  {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    return this._http.post("http://expapi.mageinfotech.com/api/Flight/GetAiportCityList", AirportCode, options)
        .map(response => response.json())
        .catch(this.handleError);
}
getUserInfo(user:any): Observable<any> {
    return this._http.post('http://expapi.mageinfotech.com/api/B2CProfile/GetUserInfo', user)
                  .map(table=>JSON.parse((<any>table)._body))
                    .catch(this.handleError);

}
Getcredential(username:any,password:any,ClientId:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    var data = "username=" + username + "&password=" + password + "&ClientId="+ClientId+"&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/token',data)
    .map(response => response.json())
    .catch(this.handleError);
}  
getTicketDetails(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetTicket',data)
    .map(response => response.json())
    .catch(this.handleError);
}  
getTicketDetailsPrint(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetTicketPrint',data)
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
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetCustomerInvoice',data)
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
getCancelTicket(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

    //var data = "username=" + username + "&password=" + password + "&grant_type=password";
    //
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetCancelTicket',data)
    .map(response => response.json())
    .catch(this.handleError);
}  
PartialCancel(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/TicketCancelRequest', user);
}
FullCancel(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/TicketCancelRequest', user);
}
RescheduleRequest(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/TicketRescheduleRequest', user);
}
EmailTicket(user: any) {
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/SendMail', user);
}
getTransactionDetails(data:any) {
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });

   
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/GetTransactionDetails',data)
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
    return this._http.post('http://reshotelapi.mageinfotech.com/api/Operation/CheckCreditLimit',data)
    .map(response => response.json())
    .catch(this.handleError);
}

GetFlihtsPrice(fare: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    
    return this._http.post("http://reshotelapi.mageinfotech.com/api/Flightprice/GetFare", fare)
        .map(response => response.json())
        .catch(this.handleError);
}

GetFlightsMealBaggs(fare: any) {
    
    let header = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    header.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: header });
    
    
    return this._http.post("http://expapi.mageinfotech.com/api/Flightmeal/GetFlight", fare)
        .map(response => response.json())
        .catch(this.handleError);
}

}
