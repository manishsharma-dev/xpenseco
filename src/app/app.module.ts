import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './agent-login/login/login.component';
import { logWarnings } from 'protractor/built/driverProviders';
import{LoginService} from './services/login.service';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { ShareModule } from './share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  
    SiteFooterComponent,

  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FilterPipeModule,
    ShareModule,
    BsDatepickerModule.forRoot(),
    
    BrowserAnimationsModule

    
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
