import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class KycVerifyService implements CanActivate {
  canActivate(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ):
    | boolean
    | import('@angular/router').UrlTree
    | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    if (this.Token.loggedIn()) {
      const kycstatus = localStorage.getItem('kycstatus');
      const kycstatusadmin = localStorage.getItem('kycstatusadmin');
      
      if (kycstatusadmin == '1') {
        if (kycstatus == '0') {
          this.router.navigate(['app/user-profile'], {
            queryParams: { sectionId: 1 },
          });
        } else if (kycstatus == '1') {
          return true;
        }
        return true;
      } else {
        return true;
      }
    }
    return false;
  }

  constructor(private Token: TokenService, private router: Router) {}
}
