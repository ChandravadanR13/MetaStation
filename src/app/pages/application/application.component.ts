import { Component, HostListener,ViewChild  } from '@angular/core';
import { SideBarComponent } from 'src/app/modules/shared/components/side-bar/side-bar.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent {
  @ViewChild(SideBarComponent, { static: true })
  sideBarComponent!: SideBarComponent;

  hideChildSpan() {
    this.sideBarComponent.hideSpan();
  }
  showChildSpan() {
    this.sideBarComponent.showSpan();
  }

  sharedToggle: boolean = false;

  onToggleChange(newToggle: boolean) {
    this.sharedToggle = newToggle;
  }

  public getScreenWidth: any;
  public getScreenHeight: any;
  responsive: boolean = false;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;

    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth > 1180) {
      this.responsive = true;
      this.showChildSpan();
    } else {
      this.responsive = false;
      this.isSidebarHidden = false;
    }
  }

  // ram added fro sidebar hide start
  isSidebarHidden = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
    if (this.isSidebarHidden) {
      this.hideChildSpan();
    } else {
      this.showChildSpan();
    }
  }

  // ram added fro sidebar hide end
}
