import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { Observable,throwError,from,Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import axios, { Method } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private usernameSubject = new Subject<string>();
  username$ = this.usernameSubject.asObservable();
  private baseUrl = environment.baseUrl;
  private apiUrl = 'https://api.binance.com/api/v3/ticker/24hr';
  getfav: any;

  constructor(private http: HttpClient, private Token: TokenService) {}

  profiledetails() {
    return this.http
      .post(`${this.baseUrl}/userdetails`, [])
      .pipe(catchError(this.errorHandler));
  }
  profileupdate(data: any) {
    return this.http
      .post(`${this.baseUrl}/profileupdate`, data)
      .pipe(catchError(this.errorHandler));
  }

  sendEmail(data: any) {
    console.log(data);

    return this.http
      .post(`${this.baseUrl}/contactprofileupdate`, data)
      .pipe(catchError(this.errorHandler));
  }

  sendotp(data: any) {
    return this.http
      .post(`${this.baseUrl}/contactVerify`, data)
      .pipe(catchError(this.errorHandler));
  }

  //fav
  storefav(data: any) {
    return this.http
      .post(`${this.baseUrl}/storefavorites`, data)
      .pipe(catchError(this.errorHandler));
  }

  currency(data: any) {
    return this.http
      .post(`${this.baseUrl}/currency_preferences`, data)
      .pipe(catchError(this.errorHandler));
  }
  kycDetails() {
    return this.http
      .post(`${this.baseUrl}/kycdetails`, [])
      .pipe(catchError(this.errorHandler));
  }
  kycUpdate(data: any) {
    return this.http
      .post(`${this.baseUrl}/updatekyc`, data)
      .pipe(catchError(this.errorHandler));
  }
  socialnetwork(data: any) {
    return this.http
      .post(`${this.baseUrl}/socialmedia`, data)
      .pipe(catchError(this.errorHandler));
  }
  updateNotification(data: any) {
    return this.http
      .post(`${this.baseUrl}/updatenotification`, data)
      .pipe(catchError(this.errorHandler));
  }
  userNotification() {
    return this.http
      .post(`${this.baseUrl}/notificationdata`, [])
      .pipe(catchError(this.errorHandler));
  }
  resetProfile(data: any) {
    return this.http
      .post(`${this.baseUrl}/userdetails-update`, data)
      .pipe(catchError(this.errorHandler));
  }
  setUsername(username: string) {
    this.usernameSubject.next(username);
  }
  allticker(data: any) {
    console.log({ pair: data });
    return this.http
      .post(`${this.baseUrl}/gettradepairs/${data}`, [])
      .pipe(catchError(this.errorHandler));
  }

  getFavorites(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-favorites`);
  }

  // tickerpriceupdate(): Observable<any> {
  //   let config: axios.AxiosRequestConfig = {
  //     method: 'get' as Method,  // Explicitly set the type to 'get'
  //     maxBodyLength: Infinity,
  //     url: 'https://api.binance.com/api/v3/ticker/24hr',
  //     headers: {},
  //   };

  //   return from(axios.request(config));
  // }

  trade(data: any) {
    return this.http
      .post(`${this.baseUrl}/markettrade`, data)
      .pipe(catchError(this.errorHandler));
  }

  stoplimitbuytrade(data: any) {
    return this.http
      .post(`${this.baseUrl}/buystoplimit`, data)
      .pipe(catchError(this.errorHandler));
  }

  stoplimitselltrade(data: any) {
    return this.http
      .post(`${this.baseUrl}/sellstoplimit`, data)
      .pipe(catchError(this.errorHandler));
  }

  positionList(account_type: any, symbol: any) {
    // console.log(
    //   this.http.post(`${this.baseUrl}/positionList`, {
    //     account_type: account_type,
    //     coin: symbol,
    //   })
    // );
    return this.http
      .post(`${this.baseUrl}/positionList`, {
        account_type: account_type,
        coin: symbol,
      })
      .pipe(catchError(this.errorHandler));
  }

  openorders(data: any, account_type: any) {
    return this.http
      .post(`${this.baseUrl}/bybitopenorders`, {
        category: data,
        account_type: account_type,
      })
      .pipe(catchError(this.errorHandler));
  }

  openhistroy(data: any, account_type: any) {
    return this.http
      .post(`${this.baseUrl}/bybitorderhistroy`, {
        category: data,
        account_type: account_type,
      })
      .pipe(catchError(this.errorHandler));
  }

  closedtrades(data: any, account_type: any) {
    return this.http
      .post(`${this.baseUrl}/bybitclosedorders`, {
        category: data,
        account_type: account_type,
      })
      .pipe(catchError(this.errorHandler));
  }

  alltrades(data: any, account_type: any) {
    return this.http
      .post(`${this.baseUrl}/bybittradehistory`, {
        category: data,
        account_type: account_type,
      })
      .pipe(catchError(this.errorHandler));
  }
  closepositionorder(params: any) {
    return this.http
      .post(`${this.baseUrl}/bybitcloseposition`, params) // Directly pass `params` here
      .pipe(catchError(this.errorHandler));
  }

  canceltrade(
    symbol: string,
    linkid: any,
    id: any,
    category: any,
    account_type: any
  ) {
    return this.http
      .post(`${this.baseUrl}/bybitcancelorder`, {
        symbol: symbol,
        orderLinkId: linkid,
        category: category,
        orderId: id,
        account_type: account_type,
      })
      .pipe(catchError(this.errorHandler));
  }

  createsignal(data: any) {
    return this.http
      .post(`${this.baseUrl}/createsignal`, data)
      .pipe(catchError(this.errorHandler));
  }

  createsubaccount(label: any) {
    return this.http
      .post(`${this.baseUrl}/Createsubaccount`, label)
      .pipe(catchError(this.errorHandler));
  }

  accountlist() {
    return this.http
      .post(`${this.baseUrl}/usersubaccountlist`, [])
      .pipe(catchError(this.errorHandler));
  }

  setcurrentaccount(subuid: any) {
    return this.http
      .post(`${this.baseUrl}/setcurrentaccount`, { subuid: subuid })
      .pipe(catchError(this.errorHandler));
  }

  stopLoss(data: any) {
    return this.http
      .post(`${this.baseUrl}/stopLoss`, data)
      .pipe(catchError(this.errorHandler));
  }

  takeProfit(data: any) {
    return this.http
      .post(`${this.baseUrl}/takeProfit`, data)
      .pipe(catchError(this.errorHandler));
  }

  getTplist(side: string, symbol: any, id: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/takeprofitlist`, {
        side: side,
        symbol: symbol,
        subuid: id,
      })
      .pipe(catchError(this.errorHandler));
  }

  childtrade(side: string, symbol: any, id: any) {
    const data = { side: side, symbol: symbol, id: id };
    return this.http
      .post(`${this.baseUrl}/tpslList`, data)
      .pipe(catchError(this.errorHandler));
  }

  updateSlxTp(data: any) {
    return this.http
      .post(`${this.baseUrl}/updateslxtp`, data)
      .pipe(catchError(this.errorHandler));
  }

  updateSLXPrice(data: any) {
    return this.http
      .post(`${this.baseUrl}/slxtrigger`, data)
      .pipe(catchError(this.errorHandler));
  }

  setLeverage(symbol: any, leverage: any, subuid: any) {
    const data = { leverage: leverage, symbol: symbol, subuid: subuid };
    return this.http
      .post(`${this.baseUrl}/setLeverage`, data)
      .pipe(catchError(this.errorHandler));
  }

  getLeverage(symbol: any) {
    return this.http
      .post(`${this.baseUrl}/getLeverage`, { symbol: symbol })
      .pipe(catchError(this.errorHandler));
  }

  upgradeUser(label: any) {
    return this.http
      .post(`${this.baseUrl}/upgradeUser`, { label: label })
      .pipe(catchError(this.errorHandler));
  }

  cancelOrder(type: string, id: any) {
    const data = { orderid: id, type: type };
    return this.http
      .post(`${this.baseUrl}/cancelOrder`, data)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status || 'Server error');
  }
}