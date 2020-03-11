import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Data } from "../../../providers/data/data";
import { PagingService } from '../../../services/paging.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-markup',
  templateUrl: './add-markup.component.html',
  styleUrls: ['./add-markup.component.css']
})
export class AddMarkupComponent implements OnInit {
  model: any = {};
  loading = false;
  fixed: boolean = true;
  percentage: boolean = false;
  percentage1: boolean = false;
  percentage2: boolean = false;
  percentage3: boolean = false;
  percentage4: boolean = false;
  admarkup: boolean = true;
  viewmarkup: boolean = false;
  markuplistedit: any;
  markuplist: any[];
  AddData: boolean = true;
  UpdateData: boolean = false;
  checkuser: any;
  IsFlight:boolean=false;

  constructor(private route: Router, private flightService: AccountService) { }

  ngOnInit() {
      this.model.Category = "Flights Domestic"
      this.model.Carrier = "All"
      this.model.MarkupType = "Fixed"
      this.model.ServiceType="Hotel"
      debugger;       
      this.model.CreatedBy = localStorage.getItem('Loginusername');
      var userInfo=JSON.parse(localStorage.getItem('Logininfo'));
      var udata=JSON.parse((<any>userInfo)._body);
      var usrDattest=udata.Data[0];
      this.checkuser = usrDattest;       
      this.model.AgentCode = this.checkuser.AgentCode;        
      if(this.checkuser.Country=="India")
         this.model.Currency="INR";
      else
      this.model.Currency="USD";

      if (this.checkuser == null) {
          this.route.navigate(['/AgentLogin']);
      }
  }

  addmarkup() {
      debugger;
     this.loading = true;        
      this.flightService.agentmarkup(this.model)
          .subscribe(data => {
              var id = data;
              alert("Markup has been addedd successfully");
              this.model.Flat = "";
              this.model.BaseFare = "";
              this.model.YQ = "";
              this.model.TAX = "";
              //this.route.navigate(['/AgentLogin']);
          })
  }

  GetService()
  {
      if(this.model.ServiceType=="Flight")        
      this.IsFlight=true;
      else
      this.IsFlight=false;

      if(this.viewmarkup)
      {
          this.view();
      }
  }
  drop() {
      if (this.model.MarkupType == "Fixed") {
          this.fixed = true;
          this.percentage = false;
          this.percentage1 = false;
          this.percentage2 = false;
          this.percentage3 = false;
          this.percentage4 = false;
      }
      else if (this.model.MarkupType == "Percentage") {
          this.fixed = false;
          this.percentage = true;
          this.percentage1 = true;
          this.percentage2 = true;
          this.percentage3 = true;
          this.percentage4 = true;
      }
  }
  add() {
      this.viewmarkup = false;
      this.admarkup = true;
  }
  view() {
      debugger
      this.loading = true;
      this.flightService.getAgentMarkup(this.model)
          .subscribe(data => {
              this.markuplist = data.Table;
          })
      this.viewmarkup = true;
      this.admarkup = false;
  }
  edit(autoid: any) {
      debugger;
      if(this.IsFlight)
      {
      this.markuplistedit = this.markuplist.filter(any => any.autoID === autoid);
      this.model = this.markuplistedit[0];
      this.viewmarkup = false;
      this.admarkup = true;
      this.AddData = false;
      this.UpdateData = true;
      if (this.model.MarkupType == "Fixed") {
          this.fixed = true;
          this.percentage = false;
          this.percentage1 = false;
          this.percentage2 = false;
          this.percentage3 = false;
          this.percentage4 = false;
      }
      else if (this.model.MarkupType == "Percentage") {
          this.fixed = false;
          this.percentage = true;
          this.percentage1 = true;
          this.percentage2 = true;
          this.percentage3 = true;
          this.percentage4 = true;
      }
  }
  else
  {
      this.markuplistedit = this.markuplist.filter(any => any.ID === autoid);
      this.model = this.markuplistedit[0];
      this.viewmarkup = false;
      this.admarkup = true;
      this.AddData = false;
      this.UpdateData = true;
  }
}
  updatemarkup() {

      this.loading = true;
      this.flightService.updateagentmarkup(this.model)
          .subscribe(data => {
              var id = data;
              alert("Markup has been updated successfully");
              this.viewmarkup = true;
              this.admarkup = false;
              //this.route.navigate(['/AgentLogin']);
          })
  }
  delete(autoid: any) {
      debugger
      this.markuplistedit = this.markuplist.filter(any => any.autoID === autoid);
      this.model = this.markuplistedit[0];

      this.loading = true;
      this.flightService.DeleteAgentMarkup(this.model)
          .subscribe(data => {
              this.markuplist = data.Table;
              alert("Markup has been deleted successfully");
          })

  }
}
