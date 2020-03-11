import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../../../services/agent.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  public model: any = {};
  loading = false;
  public profilelist:any;
  checkuser:any
  constructor(private route :Router,private flightService: AgentService) { }

  ngOnInit() {
      debugger;
      this.model.UserID = localStorage.getItem('Loginusername');
      this.getProfile();
      this.model.Title="Mr";
      this.checkuser=localStorage.getItem('Loginusername');
      if(this.checkuser==null) 
      {
          this.route.navigate(['/']);
      }
  }

  getProfile(){
    debugger
      this.loading = true;
      this.flightService.AgentProfile(this.model)
      .subscribe(data =>{
          this.profilelist = data.Table;
          this.model = this.profilelist[0];
      })
  }

  updatprofile()
  {
      debugger
      this.loading = true;
      this.flightService.updateagentprofile(this.model)
          .subscribe(data => {
              var id = data;
              alert("Details has been updated successfully");
          })
  }
}