import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IntermediateService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(data :any) {
    return this.http.post(`${this.baseUrl}/register`, data)
  }

  login(data:any){
    return this.http.post(`${this.baseUrl}/login`,data)
  }
  userlogout(data=[]) {
    return this.http.post(`${this.baseUrl}/logout`, data)
  }

  getprofileDetails() {
    return this.http.post(`${this.baseUrl}/getprofile`,[])
  }

  emailChange(data:any){
    return this.http.post(`${this.baseUrl}/troublesignin`,data)
  }
  forgetpassword(data:any){
    return this.http.post(`${this.baseUrl}/troublesignin`,data)
  }
  otpverify(data:any){
    return this.http.post(`${this.baseUrl}/verifyotp`,data)
  }
  updatepassword(data:any){
    return this.http.post(`${this.baseUrl}/forgotpassword`,data)
  }
  updateemail(data:any){
    return this.http.post(`${this.baseUrl}/Verifynewemail`,data)
  }
  enabletwofa(data:any){
    return this.http.post(`${this.baseUrl}/enableTwofa`,data);
  }
  disabletwofa(data:any){
    return this.http.post(`${this.baseUrl}/disableTwoFactor`,[]);
  }
  verifyTwofa(data:any){
    return this.http.post(`${this.baseUrl}/validateOTP`,data);
  }
  verifylogintwofa(data:any){
    return this.http.post(`${this.baseUrl}/twofalogin`,data);
  }
  sendotp(data:any){
    return this.http.post(`${this.baseUrl}/resendOtp`,data);
  }
  

}
