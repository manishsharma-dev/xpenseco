import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../../../services/agent.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  model: any = {};
  loading = false;
  checkuser: any
  
  constructor(private route: Router, private flightService: AgentService) { }

  ngOnInit() {
      debugger;
      this.model.CreatedBy = localStorage.getItem('AgentCode');
      this.model.Title = "Mr";
      this.model.Gender = "Male";
      this.model.State = "Delhi";
      this.checkuser=localStorage.getItem('Loginusername');
      if (this.checkuser == null) {
          this.route.navigate(['/']);
      }
  }
  addstaff() {
      debugger
      this.loading = true;
      this.flightService.staffcreate(this.model)
          .subscribe(data => {
              var id = data;
              this.model = {};
              alert("Staff has been addedd successfully");
              this.route.navigate(['/StaffList']);
          })
  }
}
