import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubAdminService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}


  userWallet(account_type:any){
    return this.http
    .post(`${this.baseUrl}/getbalance`,{ account_type:account_type })
    .pipe(catchError(this.errorHandler));
  }


}
