import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Data } from "../../../providers/data/data";
import { PagingService } from '../../../services/paging.service'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-myledger',
  templateUrl: './myledger.component.html',
  styleUrls: ['./myledger.component.css']
})
export class MyledgerComponent implements OnInit {

  model: any = {};
    loading = false;
    checkuser:any
    myledger:any;
    zero:boolean=false;
    constructor(private route: Router, private aserrvice: AccountService,private pagerService: PagingService, private _FB: FormBuilder) { }
    private allItems: any[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    ngOnInit() {
        debugger;
        this.model.agentID = localStorage.getItem('AgentCode');
        this.checkuser = localStorage.getItem('Loginusername');
        if (this.checkuser == null) {
            this.route.navigate(['/AgentLogin']);
        }
        this.aserrvice.getmyledger(this.model)
        .subscribe(data => {
            this.myledger = data.Table;
            this.setPage(1);
        }
    )}     
    getdata()
    {
        debugger;
        this.aserrvice.getmyledger(this.model)
        .subscribe(data => {
            this.myledger = data.Table;
            if(this.myledger.length==0)
            {
                this.zero = true;
            }
            else {
                this.setPage(1);
                this.zero = false;
            }
        })
    } 
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.myledger.length, page);
        // get current page of items
        this.pagedItems = this.myledger.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}   