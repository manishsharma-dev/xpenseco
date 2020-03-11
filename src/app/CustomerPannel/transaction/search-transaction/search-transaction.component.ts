import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../../services/agent.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagingService } from '../../../services/paging.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.css']
})
export class SearchTransactionComponent implements OnInit {

  model: any = {};
  loading = false;
  nvar:any
  newvar:any
  paymentList: any[]
  bookingid:any;
  servicetype:any;
  constructor(private route :Router,private flightService: AgentService,private pagerService: PagingService) {        
  }
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];
  ngOnInit() {
      debugger;
      this.model.agentID=localStorage.getItem('AgentCode');;
      this.loading = true;
      this.flightService.getTransactionDetails(this.model)
      .subscribe(data =>{
          this.paymentList = data.Table;
          this.setPage(1);
      })
  }

  SearchTransaction(){
      debugger
      this.model.agentID=localStorage.getItem('AgentCode');;
      this.loading = true;
      this.flightService.getTransactionDetails(this.model)
      .subscribe(data =>{
          this.paymentList = data.Table;
          this.setPage(1);
      })
  }
  getinfo(BookingRef: any) {
      debugger
      this.bookingid = BookingRef;
      localStorage.setItem('BookingID', JSON.stringify(this.bookingid));
      this.servicetype="Flight";
      localStorage.setItem('service',this.servicetype);
      this.route.navigate(['/Ticket']);
  }
  setPage(page: number) {
      // get pager object from service
      this.pager = this.pagerService.getPager(this.paymentList.length, page);
      // get current page of items
      this.pagedItems = this.paymentList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}