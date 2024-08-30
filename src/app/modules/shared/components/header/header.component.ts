import { Component, EventEmitter, Output, Injectable,Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { IntermediateService } from 'src/app/Services/intermediate.service';
import { ProfileService } from 'src/app/Services/profile.service';
import { WalletCommunicationService } from 'src/app/Services/walletcommunication.service';
import { UserService } from '../../../../Services/user.service';
import Web3 from 'web3';

declare let window: any;
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  commonOptions: any = [];
  items: MenuItem[] = [];
  notifications: any[] = [];
  notificationSection: number = 0;
  loggedIn: boolean = false;
  username: string = '';
  image: string | null = null;
  userRole: string | null = null;
  isNotLog: boolean = false;
  userName: string = '';
  imagesrc: string = '';
  error: string = '';
  popupVisible: boolean = false;
  CreatesubaccountForm: FormGroup;
  accountlist: any;
  selectedAccountId: any;
  accLabel: any;
  web3: any;

  @Output() toggleChange = new EventEmitter<boolean>();
  currentToggle: boolean = false;

  sendToggle() {
    this.currentToggle = !this.currentToggle;
    this.toggleChange.emit(this.currentToggle);
  }

  constructor(
    private router: Router,
    private Auth: AuthService,
    private Token: TokenService,
    private myservice: IntermediateService,
    private profile: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private communication: WalletCommunicationService,
    private userService: UserService
  ) {
    this.CreatesubaccountForm = this.fb.group({
      acc_label: ['', Validators.required],
    });
  }

  @Output() toggleSidebar = new EventEmitter<void>();
  arrowStatus: boolean = true;
  changeArrowStatus() {
    this.arrowStatus = !this.arrowStatus;
  }

  selectedOptions: any[] = [];
  checkboxOptions: any[] = [
    { label: 'Bybit' },
    // Add more options as needed
  ];

  platform = [{ name: 'Bybit' }];
  futures = [
    { name: 'Spot', code: 'spot' },
    { name: 'Futures', code: 'linear' },
  ];

  languegg = [
    { name: 'EN' },
    { name: 'FRN' },
    { name: 'RUS' },
    { name: 'GER' },
    { name: 'JAP' },
  ];
  crunncy = [
    { name: 'USD $' },
    { name: 'CNY' },
    { name: 'INR' },
    { name: 'AED' },
    { name: 'EYR' },
    { name: 'SGD $' },
    { name: 'GBP' },
    { name: 'JPY' },
  ];

  async ngOnInit() {
    //this.loadWeb3();
    this.loadUserRole();

    this.Auth.authStatus.subscribe((value) => (this.loggedIn = value));

    if (this.loggedIn) {
      this.username = localStorage.getItem('name') ?? '';
    }

    await this.profile.profiledetails().subscribe(
      (data) => this.handledata(data),
      (error) => this.handleError(error)
    );

    this.commonOptions = [
      { name: 'Sample', code: 'NY' },
      { name: 'Sample', code: 'RM' },
      { name: 'Sample', code: 'LDN' },
      { name: 'Sample', code: 'IST' },
      { name: 'Sample', code: 'PRS' },
    ];

    this.items = [
      {
        label: 'User Profile',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/app/user-profile']);
        },
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          this.router.navigate(['/app/user-profile/settings']);
        },
      },
      // {
      //   label: 'Create Account',
      //   icon: 'pi pi-user-plus',
      //   id: 'createacc',
      //   command: (event) => this.onClickMenuItem(event.item.id),
      // },
      {
        label: 'LogOut',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
          // this.router.navigate(['/login']);
        },
      },
    ];

    this.notifications = [
      {
        label: 'Spot API connection restarted. Performing sync.',
        notificationType: 'notification-bell',
        duration: '2h ago',
      },
      {
        label:
          'A market filter has been added in the Market Place. If it is disabled, the Master Traders of the selected market will be displayed.',
        notificationType: 'notification-settings',
        duration: '2h ago',
      },
      {
        label: 'Spot API connection restarted. Performing sync.',
        notificationType: 'notiiacation-lcok',
        duration: '2h ago',
      },
      {
        label: 'Spot API connection restarted. Performing sync.',
        notificationType: 'notification-bell',
        duration: '2h ago',
      },
      {
        label: 'Spot API connection restarted. Performing sync.',
        notificationType: 'notification-bell',
        duration: '2h ago',
      },
      {
        label:
          'A market filter has been added in the Market Place. If it is disabled, the Master Traders of the selected market will be displayed.',
        notificationType: 'notification-settings',
        duration: '2h ago',
      },
      {
        label: 'Spot API connection restarted. Performing sync.',
        notificationType: 'notiiacation-lcok',
        duration: '2h ago',
      },
      {
        label: 'Spot API connection restarted. Performing sync.',
        notificationType: 'notification-bell',
        duration: '2h ago',
      },
    ];

    this.profile.username$.subscribe((username) => {
      this.updateusername(username);
    });

    const storedAccountId = localStorage.getItem('selectedAccountId');
    if (storedAccountId) {
      this.selectedAccountId = storedAccountId;
    }
    //this.changeTradeType('spot')
  }

  loadUserRole() {
    this.userService.getUserRole().subscribe((role) => {
      this.userRole = role;
      this.filter();
    });
  }

  filter() {
    if (this.userRole === 'basic') {
      //this.items = this.items.filter(item => item.label !== 'User Profile'  && item.label !== 'Create Account' && item.label !== 'Settings');
      this.futures = this.futures.filter((item) => item.code !== 'linear');
    }
  }

  changeTradeType(value: any) {
    var type = value;
    this.communication.setSelectedTradeType(value);
    localStorage.setItem('type', type);
  }

  async loadWeb3() {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        console.log('Current account:', currentAccount);
      } catch (error) {
        console.error('User denied account access:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  }

  onClickMenuItem(id: string): void {
    if (id === 'createacc') {
      this.openPopup();
    }
  }

  Createsubaccount() {
    if (this.CreatesubaccountForm.valid) {
      const formData = this.CreatesubaccountForm.value;

      this.profile.createsubaccount(formData).subscribe(
        (data) => {
          this.handlesuccess(data);
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    } else {
      Object.values(this.CreatesubaccountForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
  // ngAfterViewInit(){

  // }

  updateusername(name: any) {
    this.userName = name;
  }

  handledata(data: any) {
    if (data.success) {
      this.userName = data.result.userName;
      // this.userRole  =data.result.user_role;
      this.imagesrc = data.result.profile_img;

      this.filter();
    } else {
      this.error = data.message;
    }
  }

  handleError(error: any) {
    console.log(error);
  }

  logout() {
    this.isNotLog = true;
    this.apiLogout();
    this.Token.remove();
    localStorage.removeItem('logged');
    localStorage.removeItem('selectedAccountId');
    localStorage.removeItem('accLabel');
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  apiLogout() {
    this.myservice.userlogout().subscribe();
  }

  onclickNotificationSection(val: number) {
    this.notificationSection = val;
  }

  openPopup(): void {
    this.popupVisible = true;
  }

  closePopup(): void {
    this.popupVisible = false;
  }

  handlesuccess(data: any) {
    // this.loading.hide();
    // this.isDisabled = false;

    if (data.success) {
      // this.loading.hide();
      // this.error = null;
      this.popupVisible = false;
      this.toastr.success(data.message);
    } else {
      this.toastr.error(data.message);
    }
  }

  resetForm() {
    this.CreatesubaccountForm.reset();
    this.popupVisible = false;
  }

  updateRecord(value: any) {
    localStorage.setItem('selectedAccountId', value);
    window.location.reload();
  }
}
