import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
    ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '@services';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!!this.authService.getToken()){
          return true;
      }

    return this.authService.isLogged.pipe( map(logged => {
      const redirectUrl = next.url;
      console.log('LOGGED URL::: ', this.route.snapshot.url.join(''));
        // debugger
        console.log('[LoggedInGuard] init 1.1... logged: ', logged);
      if (!logged) { // @todo retirada negação para teste '!'

          // this.authService.login();
            /*this.router.navigateByUrl(
                this.router.createUrlTree(
                    ['/'], { // @TODO testar o redirecionamento.
                      queryParams: {
                        redirectUrl
                      }
                    }
                )
            );*/
              this.authService.login();
            return false;
          }
      return true;
        })
    );
    // return true;
  }

}
