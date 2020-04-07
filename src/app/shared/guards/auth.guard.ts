import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService:AuthService,
    private _route:Router
  ){

  }
  canActivate(): Observable<boolean>{
    return this._authService.userData.pipe(
      map(user => {
        if(!user){
          //redirect to Login Page
          this._route.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
  
}
