import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-sla',
  templateUrl: './view-sla.component.html',
  styleUrls: ['./view-sla.component.css']
})
export class ViewSLAComponent implements OnInit {

  model: any = {};
  loading = false;
  checkuser:any

  constructor(private route: Router) { }

  ngOnInit() {
      debugger;
      this.checkuser=localStorage.getItem('Loginusername');
      if(this.checkuser==null) 
      {
          this.route.navigate(['/']);
      }
 }
}
