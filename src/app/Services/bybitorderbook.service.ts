import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class OrderbookService {
  private socket: Socket;

  constructor() {
    // Connect to the Bybit WebSocket server with CORS options
    this.socket = io('wss://stream.bybit.com/v5/public/spot', {
    });
  }
 
  subscribeOrderBook(symbol: string, depth: number, callback: (message: any) => void) {
    this.socket.emit('subscribe', `orderbook.${depth}.${symbol}`);
    this.socket.on(`orderbook.${depth}.${symbol}`, (message: any) => {
      callback(message);
    });
    
  }

  disconnect() {
    this.socket.disconnect();
  }
}
