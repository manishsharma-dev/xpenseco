import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../../../services/agent.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  model: any = {};
  loading = false;
  public stafflist: any;
  checkuser:any
  constructor(private route: Router, private flightService: AgentService) { }

  ngOnInit() {
      debugger;
      this.model.username = localStorage.getItem('AgentCode');
      this.addstaff();
      this.checkuser=localStorage.getItem('Loginusername');
      if(this.checkuser==null) 
      {
          this.route.navigate(['/AgentLogin']);
      }
  }

  addstaff() {

      this.loading = true;
      this.flightService.getstaffdetails(this.model)
          .subscribe(data => {
              this.stafflist = data.Table;

          })
  }
}
