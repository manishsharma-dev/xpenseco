import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators,NgForm} from '@angular/forms'
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../../header/header.component';
import { SiteFooterComponent } from '../../site-footer/site-footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[HeaderComponent,SiteFooterComponent]
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  public UserLoginInfo: any={}; 
  model: any = {};
  loading = false;
  isLoginError: boolean = false;
  tp:any;
 
  constructor(private formBuilder: FormBuilder,private loginservice: LoginService,private route: Router) { }

  ngOnInit() {

    localStorage.removeItem('Logininfo');
    localStorage.removeItem('userdetail');
    localStorage.removeItem('Loginusername');
    localStorage.removeItem('Loginpassword');
    sessionStorage.clear();
    localStorage.clear();


    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],     
      password: ['', Validators.required]
  });
  }

   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
      this.submitted = true;
  debugger;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      else
      {

        this.model.username=this.registerForm.controls.username.value;
        this.model.password=this.registerForm.controls.password.value;
        debugger
        this.loginservice.AgentAuthentication(this.model)
        .subscribe(data =>{
            this.UserLoginInfo = data;
            
            localStorage.setItem('Logininfo', JSON.stringify(this.UserLoginInfo))
            localStorage.setItem('Loginusername', this.model.username)
            
             this.route.navigate(['/Flights']);           
        },
        (err : HttpErrorResponse)=>{
            alert("The user name or password is incorrect. !!!!");
        });
      }
      
  }
}
