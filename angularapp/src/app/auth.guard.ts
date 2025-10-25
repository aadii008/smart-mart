import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router){}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data['roles'] as Array<string>;
    const userRole = localStorage.getItem('role');
 
    if(allowedRoles.includes(userRole ?? '')){
      return true;
    }
    else{
      this.router.navigate(["/error"]);
      return false;
    }
  }
}