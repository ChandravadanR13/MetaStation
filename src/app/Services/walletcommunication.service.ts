import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletCommunicationService {
  
  private coinDataSubject = new BehaviorSubject<{ coin: string | null, type: string | null }>({ coin: null, type: null });
  coinData$ = this.coinDataSubject.asObservable();

  private selectedTradeTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>("spot");
  
  selectedTradeType$ = this.selectedTradeTypeSubject.asObservable();

  constructor() { }

  sendCoinData(coin: string, type: string) {
    const data = { coin, type };
    this.coinDataSubject.next(data);
  }

  setSelectedTradeType(tradeType: string) {
    this.selectedTradeTypeSubject.next(tradeType);
  }
}
