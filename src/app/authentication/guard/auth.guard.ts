import {AuthService} from "../service/auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |
    UrlTree {
    if (this.auth.isLogged()) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url, message: 'Pre získanie prístupu sa musíte prihlásiť!'}});
    return false;
  }

}
