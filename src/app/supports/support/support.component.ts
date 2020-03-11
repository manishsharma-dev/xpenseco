import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportService } from '../../services/support.service';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  model: any = {};
    loading = false;
    group: boolean = true;
    credit: boolean = false;
    request: boolean = false;
    constructor(private route: Router, private flightService: SupportService) { }

    ngOnInit() {
        this.model.JourneyType = "Domestic";
        this.model.Trip = "One Way";
        this.model.Origin = "Select Origin";
        this.model.Destination = "Select Destination";
        this.model.Flexible = "Select Days";
        this.model.Flexibility = "Select Days";
        this.model.PreferClass = "All";
        this.model.PreferAirline = "All";
        this.model.service = "Flight Booking";
        this.model.SupportRegarding = "Balance Deducted";
        this.model.Agent=localStorage.getItem('AgentCode');
        this.model.AgenID=localStorage.getItem('AgentCode');
        debugger;
        this.model.CreatedBy = localStorage.getItem('Loginusername');
        this.model.AgentId = this.model.CreatedBy;
        if(this.model.CreatedBy==null) 
        {
            this.route.navigate(['/AgentLogin']);
        }
    }

    grouprequest() {
        this.group = true;
        this.credit = false;
        this.request = false;
    }
    creditrequest() {
        this.group = false;
        this.credit = true;
        this.request = false;
    }
    supportrequrst() {
        this.group = false;
        this.credit = false;
        this.request = true;
    }
    addbooking() {

        debugger
        if(this.model.Origin == "Select Origin" || this.model.Destination == "Select Destination"
         || this.model.Flexible == "Select Days" || this.model.Flexibility == "Select Days"
          || this.model.StartDate==null || this.model.ReturnDate==null || this.model.NoOfPassenger==null ||
          this.model.Remark=="")
        {
            alert("Please fill the all fields !!!!");
        }
        else
        {
        this.loading = true;
        this.flightService.groupbooking(this.model)
            .subscribe(data => {
                var id = data;               
                alert("Booking has been addedd successfully");
            })
        }
    }
    addcredit()
    {
        debugger
        if(this.model.AmoutnRequired==null || this.model.AdRemark==null)
        {
            alert("Please fill the all fields !!!!");
        }
        else
        {
        this.loading = true;
        this.flightService.addcreditrequest(this.model)
            .subscribe(data => {
                var id = data;
                alert("Credit request has been addedd successfully");
            })
        }
    }
    addsupport()
    {
        debugger
        this.loading = true;
        this.flightService.addsupportrequest(this.model)
            .subscribe(data => {
                var id = data;
                alert("Support request has been addedd successfully");
            })
    }
}


