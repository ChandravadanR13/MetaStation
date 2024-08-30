import { Component, HostListener } from '@angular/core';
import { ShareServiceService } from './modules/shared/share-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meta-station';

  constructor( private shareServiceService : ShareServiceService) {}

  ngOnInit() {

  }


}
