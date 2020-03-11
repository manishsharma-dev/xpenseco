import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../../../services/agent.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@Angular/Common/http';
@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {
  oldpsw: any ;
  checkuser:any;
  wrong:boolean=false;
 
  model: any = {};
  loading = false;
  SelectedFile: File = null;
  SelectedFile1:File=null;
  SelectedFile2:File=null;
  constructor(private route: Router, private flightService: AgentService, private http: HttpClient) { }

  ngOnInit() {
      debugger;
      this.checkuser = localStorage.getItem('Loginusername');
      if (this.checkuser == null) {
          this.route.navigate(['/']);
      }
  }
  onFileSelected2(event:any) {
      debugger
      this.SelectedFile = this.model.myPan.name;
      this.SelectedFile1 =  this.model.myAadhar.name;
      this.SelectedFile2 =  this.model.myGST.name;
  }
  onUpload() {
      debugger
      this.http.post('assets/images', this.SelectedFile.name);
      this.http.post('assets/images', this.SelectedFile1.name);
      this.http.post('assets/images', this.SelectedFile2.name);
      this.model.myPan= this.SelectedFile.name;
      this.model.myAadhar=this.SelectedFile.name;
      this.model.myGST=this.SelectedFile2.name;
          // this.flightService.AddDocument(this.model)
          // .subscribe(data =>{
          //     var id = data;
          //     alert("Document has been uploaded successfully");
          //    //this.route.navigate(['/AgentLogin']);
          // })

  }
  
  checkpsw()
  {
      debugger    
      this.model.Email=localStorage.getItem('Loginusername');
      this.flightService.checkpassword(this.model)
      .subscribe(data =>
      {
          var id = JSON.parse((<any>data)._body);;
          var psw=id.Table[0].Password;
          if(this.model.OldPassword==psw)
          {
              this.oldpsw=psw;
              this.wrong=false;
          }
          else
          {
             this.wrong=true;
          }
      })
  }
  changepassword()
  {
      debugger
      if (this.oldpsw == this.model.OldPassword)
      {
          if (this.model.NewPassword == this.model.ConfirmPassword) 
          {
              this.loading = true;
              this.flightService.changepassword(this.model)
              .subscribe(data =>
              {
                  var id = data;
                  this.model={};
                  alert("Password has been changed successfully");
                  this.route.navigate(['/AgentLogin']);
              })
          }
          else 
          {
              alert("Confirm password not match !!!!")
          }
      }
      else
      {
          alert("Old password not match !!!!")
      }
  }
}
