import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { FormsModule} from '@angular/forms';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { LoginComponent } from './components/login/login.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { UseraddcartComponent } from './components/useraddcart/useraddcart.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminaddproductComponent } from './components/adminaddproduct/adminaddproduct.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { AdminfeedbackstatisticsComponent } from './components/adminfeedbackstatistics/adminfeedbackstatistics.component';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';


PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    UsernavbarComponent,
    UseraddfeedbackComponent,
    AdminviewuserdetailsComponent,
    RegistrationComponent,
    AdminviewproductComponent,
    AdminnavbarComponent,
    UserviewordersComponent,
    AdminviewfeedbackComponent,
    UserviewfeedbackComponent,
    UseraddcartComponent,
    AdminviewordersComponent,
    UserviewproductComponent,
    NavbarComponent,
    AdminaddproductComponent,
    SuperadminComponent,
    AdminfeedbackstatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PlotlyModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }