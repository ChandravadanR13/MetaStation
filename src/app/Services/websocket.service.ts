import { Injectable } from "@angular/core";
import { Observable, Subject,EMPTY} from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
// import * as Rx from "rxjs/Rx";

@Injectable()

export class WebsocketService {
  private socketUrl: any = environment.websocketurl;
  private websocket: any;

  /** Get only single mesage from socket.**/

  public GetSingleInstanceStatus(): Observable < any > {
    this.websocket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr@1000ms');

    return new Observable(observer => {
      this.websocket.onopen = (evt:any) => {
      };

      this.websocket.onmessage = (evt:any) => {
        observer.next(JSON.parse(evt.data)); 
       // this.websocket.close(); // Optionally close the WebSocket after receiving a message
      };

      this.websocket.onerror = (error:any) => {
        observer.error(error); 
      };

      this.websocket.onclose = () => {
        observer.complete(); 
      };

      // Cleanup logic when the observable is unsubscribed
      return () => {
        if (this.websocket.readyState === WebSocket.OPEN) {
          this.websocket.close();
        }
      };
    });
  }
  errorHandler(error:any) {
    console.log(error)
    return throwError ("");
  }
}