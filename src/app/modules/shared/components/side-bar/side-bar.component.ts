import {
  Component,
  HostListener,
  ElementRef,
  Renderer2,
  ViewChild,
  Input
} from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';
import { UserService } from '../../../../Services/user.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.01s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.01s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SideBarComponent {
  @Input() toggle: boolean = false;
  spanStatus: boolean = true;
  showSpan() {
    this.spanStatus = true;
  }
  hideSpan() {
    this.spanStatus = false;
  }

  items: any[] = [];
  public getScreenWidth: any;
  public getScreenHeight: any;
  responsive: boolean = false;
  activeIndex: number = 0;
  userRole: string | null = null;
  box: any;
  showpop: boolean = false;
  showpopHistory: boolean = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private profile: ProfileService,
    private userService: UserService
  ) {}
  hide(type: string) {
    if (type == 'his') {
      this.showpopHistory = !this.showpopHistory;
    } else if (type == 'mark') {
      this.showpop = !this.showpop;
    }
  }
  async ngOnInit() {
    this.box = document.getElementsByClassName('popup');

    this.setUserRole();

    this.items = [
      {
        label: 'Home',
        icon: '../../../assets/home.svg',
        routerLink: '/app/home',
        activeIndex: 0,
        activeButton: 'btn1',
      },
      {
        label: 'Dashboard',
        icon: '../../../assets/Dashboard Icon.svg',
        routerLink: '/app/dashboard',
        activeIndex: 1,
        activeButton: 'btn2',
      },
      {
        label: 'Marketplace',
        icon: '../../../assets/MarketPlace Icon.svg',
        routerLink: '/app/marketplace',
        activeIndex: 2,
        activeButton: 'btn3',
      },
      {
        label: 'Panel',
        icon: '../../../assets/Panel Icon.svg',
        routerLink: '/app/panel',
        activeIndex: 3,
        activeButton: 'btn4',
      },
      {
        label: 'Wallet',
        icon: '../../../assets/Wallet Icon.svg',
        routerLink: '/app/wallets',
        activeIndex: 4,
        activeButton: 'btn5',
      },
    ];

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.onWindowResize();
  }

  async setUserRole() {
    try {
      this.userService.getUserRole().subscribe((role) => {
        this.userRole = role;
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  setActiveIndex(nextIndex: number) {
    this.activeIndex = nextIndex;
  }

  handleError(error: any) {
    console.log(error);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;

    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth > 1000) {
      this.responsive = true;
    } else {
      this.responsive = false;
    }
  }

  ClickedOut(event: any) {
    //debugger;
    console.log(event);
    if (event.target.className === 'ng-tns-c63-0') {
      this.activeIndex = 0;
    }
  }

  activeButton: string = '';

  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
  }

  navigate(str: string) {
    if (str === 'deposit') {
      this.router.navigate(['app/history/deposit']);
    } else if (str === 'withdraw') {
      this.router.navigate(['app/history/withdraw']);
    }
  }
}
