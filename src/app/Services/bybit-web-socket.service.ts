import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class BybitWebSocketService implements OnDestroy {
  private websocket: any;
  private ws!: WebSocket;

  private apiKey = 'xfInxkZHDfcfsE44pS';
  private apiSecret = 'uLXs4OI65pGCwgGeJNNarF3HIJfGPBIy4LZw';
  private orderBookSubject: Subject<any[]> = new Subject<any[]>();
  orderBook$ = this.orderBookSubject.asObservable();

  constructor() {
    // this.connectWebSocketOrder();
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
  }

  public connectWebSocket(symbols: any): void {
    this.websocket = new WebSocket('wss://stream.bybit.com/v5/public/spot');

    this.websocket.onopen = () => {
      const subscription = `orderbook.1.${symbols}`;
      this.websocket.send(
        JSON.stringify({ op: 'subscribe', args: [subscription] })
      );
    };

    this.websocket.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      if (message.type === 'snapshot' || message.type === 'delta') {
        this.orderBookSubject.next(message.data);
      }
    };

    this.websocket.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };
  }

  public disconnectWebSocket(): void {
    if (this.websocket) {
      this.websocket.close();
    }
  }

  // public connectWebSocketOrder(): void {
  //   this.ws = new WebSocket('wss://stream-testnet.bybit.com/v5/private');

  //   this.ws.onopen = () => {
  //     console.log('WebSocket connection opened.');

  //     const authPayload = this.generateAuthPayload();
  //     const subscribePayload = {
  //       op: 'subscribe',
  //       args: ['order'],
  //     };

  //     this.ws.send(JSON.stringify(authPayload));
  //     this.ws.send(JSON.stringify(subscribePayload));
  //   };

  //   this.ws.onmessage = (event: MessageEvent) => {
  //     const message = JSON.parse(event.data);
  //     this.handleMessage(message);
  //   };

  //   this.ws.onclose = (event: CloseEvent) => {
  //     console.log('WebSocket connection closed.', event);
  //   };

  //   this.ws.onerror = (event: Event) => {
  //     console.error('WebSocket error:', event);
  //   };
  // }

  // handleMessage(message: any) {
  //   console.log('Received message:', message);
  //   // Implement message handling logic
  // }

  // private generateAuthPayload() {
  //   const timestamp = Date.now().toString();
  //   const signPayload = `${this.apiKey}${timestamp}`;
  //   const signature = this.createHmacSha256(signPayload, this.apiSecret);

  //   return {
  //     op: 'auth',
  //     args: [this.apiKey, timestamp, signature],
  //   };
  // }

  // private createHmacSha256(message: string, secret: string) {
  //   return CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
  // }
}
