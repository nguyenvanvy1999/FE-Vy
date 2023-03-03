import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/autentication.service';
import { URL_LOGIN } from '../../../../../../do-an/ngx-admin/src/app/common/constants/url.constant';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  checkAuth: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    const isLoggedIn = this.authenticationService.isLoggedIn();
    // Not check auth yet
    if (!this.checkAuth) {
      if (isLoggedIn) {
        this.checkAuth = true;
        return of(true);
      }
      this.backToLogin();
      return of(false);
    }

    if (this.checkAuth) {
      return of(true);
    }
  }

  private backToLogin() {
    this.authenticationService.resetAuth();
    this.checkAuth = false;
    this.router.navigate([URL_LOGIN]);
  }
}
