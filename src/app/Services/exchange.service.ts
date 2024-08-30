import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

pairdetails(){
    return this.http.post(`${this.baseUrl}/gettradepairs`,[]).pipe(catchError(this.errorHandler));
}

errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}
