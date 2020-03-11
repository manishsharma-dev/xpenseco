import { Component,Compiler} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'travelfare';

  userdata:any[]
  islogin:boolean;
  redirectUrl: string;
  
  constructor(private _compiler: Compiler) {
  
   
    }
  ngOnInit() {

    
   }
}
