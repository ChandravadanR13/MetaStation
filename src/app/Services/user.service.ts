import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userRole: string | null = null;
  private userRoleObservable: Observable<string> | null = null;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserRole(): Observable<string> {
    if (this.userRole) {
      return of(this.userRole);
    } else if (this.userRoleObservable) {
      return this.userRoleObservable;
    } else {
      this.userRoleObservable = this.http.post<any>(`${this.baseUrl}/userdetails`, {}).pipe(
        map(response => response.result.user_role), // Extract the user_role from the response
        tap(userRole => {
          this.userRole = userRole;
          this.userRoleObservable = null;
        }),
        catchError(this.handleError<string>('getUserRole', 'basic'))
      );
      return this.userRoleObservable;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
