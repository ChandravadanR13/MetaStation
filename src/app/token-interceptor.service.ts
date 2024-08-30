import { Injectable,Injector } from '@angular/core';
import{ HttpInterceptor } from '@angular/common/http';
import { TokenService } from './Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req:any,next:any){
    let authService = this.injector.get(TokenService);
    let tokenzedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.get()} `
      }
    })
    return next.handle(tokenzedReq); 
  }
}
