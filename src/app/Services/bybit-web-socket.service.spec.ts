import { TestBed } from '@angular/core/testing';

import { BybitWebSocketService } from './bybit-web-socket.service';

describe('BybitWebSocketService', () => {
  let service: BybitWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BybitWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
