import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.TokenService.loggedIn());
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(value:boolean){
    console.log('behave')
    this.loggedIn.next(value);
  }
  constructor(private TokenService: TokenService) { }
}
