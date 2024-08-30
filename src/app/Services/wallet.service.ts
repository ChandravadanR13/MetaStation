import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  Walletdetails(account_type:any) {
    return this.http
      .post(`${this.baseUrl}/walletassets`, {account_type:account_type})
      .pipe(catchError(this.errorHandler));
  }

    fundingWalletdetails(account_type:any,type:string) {
    return this.http
      .post(`${this.baseUrl}/fundWalletBalance`, {account_type:account_type,type:'FUND'})
      .pipe(catchError(this.errorHandler));
  }
  contractWalletdetails(account_type:any,type:string) {
    return this.http
      .post(`${this.baseUrl}/fundWalletBalance`, {account_type:account_type,type:'CONTRACT'})
      .pipe(catchError(this.errorHandler));
  }
  userWallet(account_type:any){
    return this.http
    .post(`${this.baseUrl}/getbalance`,{ account_type:account_type })
    .pipe(catchError(this.errorHandler));
  }

  assetdetails(data: any,account_type:any) {
    return this.http
      .post(`${this.baseUrl}/assetsdetails`, { asset: data,account_type:account_type })
      .pipe(catchError(this.errorHandler));
  }

  SendOtp() {
    return this.http
      .post(`${this.baseUrl}/sendotp`, [])
      .pipe(catchError(this.errorHandler));
  }

  withdrawsubmit(data: any) {
    return this.http
      .post(`${this.baseUrl}/bybitwithdraw`, data)
      .pipe(catchError(this.errorHandler));
  }

  addressGenerate(data:any) {
    return this.http
      .post(`${this.baseUrl}/getwallet`, data)
      .pipe(catchError(this.errorHandler));
  }



  depositHistory(account_type:any){
    return this.http
    .post(`${this.baseUrl}/depositHistory`,{ account_type:account_type })
    .pipe(catchError(this.errorHandler));
  }

  withdrawHistory(account_type:any){
    return this.http
    .post(`${this.baseUrl}/withdrawHistory`,{ account_type:account_type })
    .pipe(catchError(this.errorHandler));
  }

  transsubmit(data:any){
    return this.http.post(`${this.baseUrl}/transwallet`,data).pipe(catchError(this.errorHandler));
  }

    addBalance(data:any){
    return this.http
    .post(`${this.baseUrl}/depsoitMeta`,{data:data })
    .pipe(catchError(this.errorHandler));
  }

  SignalList(){
    return this.http
    .post(`${this.baseUrl}/signallist`,[])
    .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError("");
  }
}
