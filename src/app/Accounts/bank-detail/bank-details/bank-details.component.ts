import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Data } from "../../../providers/data/data";
import { PagingService } from '../../../services/paging.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  model: any = {};
    loading = false;
    checkuser:any

    constructor(private route: Router, private flightService: AccountService) { }

    ngOnInit() {
        debugger;
        this.checkuser=localStorage.getItem('Loginusername');
        if(this.checkuser==null) 
        {
            this.route.navigate(['/']);
        }
    }


}
