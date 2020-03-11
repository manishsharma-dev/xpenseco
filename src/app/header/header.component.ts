import { Component, OnInit } from '@angular/core';
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name: 'round'})
@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  transform(value: number): number {
    return Math.round(value);
}  
  
hidehead:boolean=false
checkuser:any
login:boolean=false
userdata: any[];
climit:any;
due:any;
balance:any;
_body:any[];
sky:boolean=true;
app:boolean=false;
agentcode:any;
commission:boolean=false;
// availableLimit:any;
totalUsedCLimit:any;

  constructor() { }

  ngOnInit() {

        this.userdata = JSON.parse(localStorage.getItem('Logininfo'));
        //var udata = JSON.parse((<any>this.userdata)._body);
        // var credit = udata.Data[0];
        // this.climit = credit.CreditLimit;
        // this.agentcode = credit.AgentCode;
        // this.availableLimit=(parseFloat(credit.CreditLimit)-parseFloat(credit.CreditLimitUse))
        // this.totalUsedCLimit=parseFloat(credit.CreditLimitUse);
        localStorage.setItem('AgentCode', this.agentcode)
  }

}
