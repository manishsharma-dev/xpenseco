import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../../services/agent.service';


@Component({
  selector: 'app-ageent-registration',
  templateUrl: './ageent-registration.component.html',
  styleUrls: ['./ageent-registration.component.css']
})
export class AgeentRegistrationComponent implements OnInit {
  model: any = {};
  loading = false;
  checkuser:any
  profilelist:any
  constructor(private route: Router, private flightService: AgentService) { }

  ngOnInit() {
      debugger;
      this.model.Title="Mr";
      this.model.Gender="Male";
      this.model.State="Delhi";
      // this.model.UserID = localStorage.getItem('Loginusername');
      // this.getProfile();
      // this.model.Title="Mr";
      // this.checkuser=localStorage.getItem('Loginusername');
      // if(this.checkuser==null) 
      // {
      //     this.route.navigate(['/AgentLogin']);
      // }
  }

  // getProfile(){
  //   debugger
  //     this.loading = true;
  //     this.flightService.AgentProfile(this.model)
  //     .subscribe(data =>{
  //         this.profilelist = data.Table;
  //         this.model = this.profilelist[0];
  //     })
  // }

  AddAgent()
  {
      debugger
      this.loading = true;
      this.flightService.AgentRegister(this.model)
          .subscribe(data => {
              var id = data;
              this.model = {};
              alert("Agent has been register successfully");
              this.route.navigate(['/']);
          })
  }



}