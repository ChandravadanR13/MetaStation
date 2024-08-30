import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private baseUrl = environment.baseUrl;
  private iss ={
    login: environment.baseUrl+'/login',
    register: environment.baseUrl +'/register',
    refreshdata: environment.baseUrl +'/refreshdata',

  }
  constructor(
    private http: HttpClient
  ) { }

  handle(token:any){
    this.set(token);
    
  }
  set(data:any){
    localStorage.setItem("token",data);
  }
  customset(name:any){
    localStorage.setItem('name',name);
  }
  customget(name:any) {
    return localStorage.getItem(name);
  }
  get(){
    return localStorage.getItem('token');
  }
  decode(payload:any){
    if(!payload){
      return 
    }
    const standardBase64String = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(standardBase64String));
  }

  getUserDetails(){
    const token = this.get();
    if(token){
      const payload = token.split('.')[1];
      return this.decode(payload);
    }else{
      return false;
    }
  }
  
  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  isValid(){
    const token = this.get();
    if (token){
      const payload = this.payload(token); 
      if (payload){  
          if (Date.now() > payload.exp * 1000) { 
            console.log('Token has expired');
            this.remove();
            return false;            
          } 
          return true;        
      }
      return false;
    }
    return false;
  }

  isValidtwofa(){
    const token = this.get();
    if (token){
      const payload = this.payload(token);
      if (payload){
        const ValidUrl =  Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
        if (ValidUrl){
          if (payload.tfa != 'sari') {
            return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  payload(token:any){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  loggedIn(){
    return this.isValid();
  }
  currentUserValue(){
    return localStorage.getItem("currentUser");
  }
refreshToken() {

  this.http.post(`${this.baseUrl}/refreshdata`, []).pipe(
    catchError(this.errorHandler)
  ).subscribe(
    data => this.handleRefeshtoken(data),
    error => this.handlerefreshError(error)
  );

  return this.isValidtwofa();
}
  handleRefeshtoken(token:any) {
    this.handle(token.result.access_token);
  }
  handlerefreshError(error:any){
    return false;
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError("Server error");
  }
}
