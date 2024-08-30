import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  screenWidth = new Subject<any>();
  constructor() { }
}
