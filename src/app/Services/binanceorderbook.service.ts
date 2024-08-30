import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class BinanceOrderBookService {
  private socket!: Socket;

  constructor() { }

  connect(symbol: string, depth: string): Observable<any> {
    return new Observable(observer => {
      this.socket = io('wss://stream.binance.com:9443/ws');

      this.socket.on('connect', () => {
        const messageJSON = {
          method: 'SUBSCRIBE',
          params: [`${symbol.toLowerCase()}@aggTrade`, `${symbol.toLowerCase()}@depth`],
          id: 1
        };
        this.socket.send(JSON.stringify(messageJSON));
      });

      this.socket.on('depth', data => {
        alert(data);
        observer.next(data);
      });

      this.socket.on('disconnect', () => {
        observer.complete();
      });

      this.socket.on('error', error => {
        observer.error(error);
      });

      return () => {
        if (this.socket) {
          this.socket.disconnect();
        }
      };
    });
  }
}

