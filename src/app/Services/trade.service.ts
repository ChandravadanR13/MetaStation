import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private _url: string = environment.baseUrl;

  constructor(private http: HttpClient, private Token: TokenService) { }
  getorderboook(data:any) {
    return this.http.post(`${this._url}/getorderbook`, data).pipe(catchError(this.errorHandler));
  }
  openorderboook(data:any) {
    return this.http.post(`${this._url}/openorderbook`, data).pipe(catchError(this.errorHandler));
  }
 

  errorHandler(error: HttpErrorResponse) {
    return throwError("");
  }

}
