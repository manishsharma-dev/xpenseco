import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Data } from "../../../providers/data/data";
import { PagingService } from '../../../services/paging.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  model: any = {};
  loading = false;
  checkdd: boolean = true;
  checkuser:any

  constructor(private route: Router, private acService:AccountService, private _FB: FormBuilder) { }

  ngOnInit() {
      this.model.paymentMode = "Cheque";
      this.model.bankAccount = "Cash Deposit";
      debugger;
      this.model.createdBy = localStorage.getItem('Loginusername');
      this.checkuser=localStorage.getItem('Loginusername');
      if(this.checkuser==null) 
      {
          this.route.navigate(['/AgentLogin']);
      }
  }

  makepayment() {
debugger
      this.loading = true;
      this.model.createdBy=localStorage.getItem('AgentCode');
      this.acService.agentmakepayment(this.model)
          .subscribe(data => {
              var id = data;
              this.model = {};
              alert("Payment has been addedd successfully");
              //this.route.navigate(['/AgentLogin']);
          })
  }

  drop() {
      if (this.model.paymentMode == "Cash Deposit") {
          this.checkdd = false;
      }
      else
      {
          this.checkdd = true;;
      }
  }
}