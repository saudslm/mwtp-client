import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthFmanagerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
    if( localStorage.getItem("userToken") && localStorage.getItem("userRole") == "finance_manager" )
      return true;
    this.router.navigate(['/login']);
    return false;
  }
}
