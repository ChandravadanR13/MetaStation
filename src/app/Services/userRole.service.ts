import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService implements CanActivate {

  constructor(
    private token: TokenService,
    private router: Router,
    private http: HttpClient
  ) { }
  private baseUrl = environment.baseUrl;

  canActivate(): Observable<boolean> {
    // Check if user is logged in
    if (!this.token.loggedIn()) {
      this.router.navigate(['login']);
      return of(false);
    }

    // Fetch user role from API
    return this.http.get<any>(`${this.baseUrl}/userdetails`).pipe(
      map((response: any) => {
        if (response.role === 'basic') {
          this.router.navigate(['unauthorized']);
          return false;
        }
        return true;
      }),
      catchError(() => {

        this.router.navigate(['error']);
        return of(false);
      })
    );
  }
}
