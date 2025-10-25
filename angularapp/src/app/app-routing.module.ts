import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminaddproductComponent } from './components/adminaddproduct/adminaddproduct.component';
import { HomeComponent } from './components/home/home.component';
import { AdminviewproductComponent } from './components/adminviewproduct/adminviewproduct.component';
import { ErrorComponent } from './components/error/error.component';
import { UseraddcartComponent } from './components/useraddcart/useraddcart.component';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';
import { AdminviewuserdetailsComponent } from './components/adminviewuserdetails/adminviewuserdetails.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { UserviewproductComponent } from './components/userviewproduct/userviewproduct.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { AuthGuard } from './auth.guard';
import { AdminfeedbackstatisticsComponent } from './components/adminfeedbackstatistics/adminfeedbackstatistics.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"admin/:userId/products",component:AdminaddproductComponent,canActivate: [AuthGuard], data: { roles: ['ADMIN','SUPER_ADMIN'] }},
  {path: "error",component: ErrorComponent},
  {path:"user/:userId/feedbacks/addfeedback",component:UseraddfeedbackComponent,canActivate: [AuthGuard], data: { roles: ['USER'] }},
  {path:"user/:userId/feedbacks",component:UserviewfeedbackComponent,canActivate: [AuthGuard], data: { roles: ['USER'] }},
  {path:"admin/:userId/feedbacks",component:AdminviewfeedbackComponent,canActivate: [AuthGuard], data: { roles: ['ADMIN','SUPER_ADMIN'] }},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent},
  {path:"home",component:HomeComponent},
  {path:'cart/:id', component: UseraddcartComponent,canActivate: [AuthGuard], data: { roles: ['USER'] }},
  {path:'generalcart',component:UseraddcartComponent,canActivate: [AuthGuard], data: { roles: ['USER'] }},

  {path:"admin/:userId/orders",component:AdminviewordersComponent,canActivate: [AuthGuard], data: { roles: ['ADMIN','SUPER_ADMIN'] }},
  {path:"admin/:userId/products/viewProducts",component:AdminviewproductComponent,canActivate: [AuthGuard], data: { roles: ['ADMIN','SUPER_ADMIN'] }},
  {path:"admin/:userId/users",component:AdminviewuserdetailsComponent,canActivate: [AuthGuard], data: { roles: ['ADMIN','SUPER_ADMIN'] }},
  {path:"user/:userId/orders",component:UserviewordersComponent,canActivate: [AuthGuard], data: { roles: ['USER'] }},
  {path:"user/:userId/products/viewProducts",component:UserviewproductComponent},
  {path:"viewProducts",component:UserviewproductComponent},
  {path:"user/:userId/products/viewProducts/:category",component:UserviewproductComponent,canActivate: [AuthGuard], data: { roles: ['USER'] }},
  {path:"unknown/products/:category",component:UserviewproductComponent},
  {path: "superadmin", component: SuperadminComponent,canActivate: [AuthGuard], data: { roles: ['SUPER_ADMIN'] }},
  {path: "feedback-statistics", component: AdminfeedbackstatisticsComponent,canActivate: [AuthGuard], data: { roles: ['ADMIN','SUPER_ADMIN'] }},
  {path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
