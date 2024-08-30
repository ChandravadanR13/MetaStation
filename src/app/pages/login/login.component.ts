import { Component, EventEmitter, Output, ElementRef,NgZone  } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IntermediateService } from '../../Services/intermediate.service';
import { TokenService } from '../../Services/token.service';
import { AuthService } from '../../Services/auth.service';
import { LoadingService } from '../../Services/loading.service';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';
import { environment } from '../../../environments/environment';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Web3 from "web3";

declare let window:any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router,
    private toastr: ToastrService,
    private myservice: IntermediateService,
    private Token:TokenService,
    private Auth:AuthService,
    private zone: NgZone,
    private profile:ProfileService,
    private isloading:LoadingService) {
      this.loading = isloading;
     }
 
  form ={
    email: '',
    password:'',
    rememberme:'',
    OTP:"",
    acc:"",
    type:'email'
  };

  formData ={
    userId: '',
    email: '',
    password: '',
    confirmpassword: '',
    referralid: '',
    OTP:''
  };

    emailChange ={
    email:'',
    OTP:'',
    type:'type1',
    newemail:'',
    confirmemail:'',
    newpassword:''
   }

   forget ={
    email:'',
    type:'type4',
    OTP:'',
    password:'',
    confirmpassword:'',
   }

   thirdForm ={
     email:'',
     OTP:'',
     type:'type3',
     account_recovery:'',
     orderid:''
   }

   AccoutRecoveryForm ={
      username:'',
      password:'',
      email:'',
      OTP:'',
      type:'type4',
      phoneotp:''
   }

   twofa ={
     OTP:'',
     type:''
   }
   

 public loading;
  public error =null;
  public success =null;
  private auth2: any;
  isDisabled: boolean = false;
  public hideLog: boolean = false;
  modal: any;
  modalStep2: any;
  visible = false;
  responsiveOptions: any;
  swiperData: any;
  signUp = false;
  changemail = false;
  changeEmail = false;
  options = false;
  @Output() signInEvent  = new EventEmitter<Number>;
  items: MenuItem[] = [];
  activeIndex = 1;
  recovery : number = 1;
  logingoogle:boolean =false;
  loginemail:boolean =false;
  registeremail:boolean =false;
  strFirstThree:any;
  activateOtp:boolean =false;
  resendemailotp:boolean =false;
  showloginbutton:boolean =true;
  submitted = false;
  kycstatus:any;
  web3: any;

  config :NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    placeholder: ''
  };

  accountRecovery = false;
  openAcount2=false;
  forgetpass=false;
  selectedCategories: any[] = [];
  
  categories: any[] = [
    { name: 'Someone else changed the email', key: 'A' },
    { name: 'Someone else changed the password', key: 'M' },
    { name: 'Someone else has access to the account', key: 'P' },
    { name: "I've access to my original email", key: 'R' },
    { name: "I don't have access to my original email", key: 'R' }
];

  passwordType: string = '';
  hidePassword: boolean = true;
  passwordTypeRegister: string = '';
  hidePasswordRegister: boolean = true;
  passwordTypeRegisterConfirm: string = '';
  hidePasswordRegisterConfirm: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  togglePasswordRegisterVisibility(): void {
    this.hidePasswordRegister = !this.hidePasswordRegister;
  }

  togglePasswordRegisterConfirmVisibility(): void {
    this.hidePasswordRegisterConfirm = !this.hidePasswordRegisterConfirm;
  }

  ngOnInit() {

    this.islogged();
    this.modal = document.getElementById("myModal");
    this.modalStep2 = document.getElementById("modalStep2");



    this.swiperData = [
      {
        id: '1000',
        name: 'Bitcoin',
        image: 'cr-1.png',
        date: '29 May 2022',
        msg: 'Bitcoin Seen Dropping To $22K as ear Market '
      },
      {
        id: '1000',
        name: 'Bitcoin',
        image: 'cr-2.png',
        date: '29 May 2022',
        msg: 'Cardano At $0.56, Here Are The Crucial Trading evels For '
      },

      {
        id: '1000',
        name: 'Bitcoin',
        image: 'cr-3.png',
        date: '29 May 2022',
        msg: 'XRP Consolidates, Is It Going To Retrace Now? '
      },{
        id: '1000',
        name: 'Bitcoin',
        image: 'cr-1.png',
        date: '29 May 2022',
        msg: 'Cardano At $0.56, Here Are The Crucial  evels For '
      },{
        id: '1000',
        name: 'Bitcoin',
        image: 'cr-2.png',
        date: '29 May 2022',
        msg: 'Cardano At $0.56, Here Are The Crucial Trading evels For '
      },

    ];


    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 6,
        numScroll: 6
      },
      {
        breakpoint: '1220px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '1100px',
        numVisible: 2,
        numScroll: 2
      }
    ];

    this.items = [
      {
          label: '',
          routerLink: 'personal'
      },
      {
          label: '',
          routerLink: 'seat'
      },
      {
          label: '',
          routerLink: 'payment'
      },
      {
          label: '',
          routerLink: 'confirmation'
      }
  ];

  const intervalId = setInterval(() => {
    this.checkSessionExpiry();
  }, 60000);

  }
  islogged(){
    const logged =localStorage.getItem('logged');
    if(logged){
      this.showloginbutton =false;
    }
    else{
      this.showloginbutton =true;
    }
  }

  async loadWeb3() {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        
        if(currentAccount != null){
          console.log('Current account:', currentAccount);
          this.form.acc = currentAccount;
          this.form.type ="meta";
          this.signIn();
        }

      } catch (error) {
        console.error('User denied account access:', error);
      }
    } else {
      this.toastr.error('MetaMask is not installed');
    }
    
  }

  showpopup:boolean=true;

  formVisible(){
    this.error =null
     this.visible =true; 
  }
  
  //login
  signIn() {
    this.loading.show();
    return this.myservice.login(this.form).subscribe(
      data => this.handleLoginResponse(data),
      error =>this.handleError(error)
    );
  };

 //login api response
 handleLoginResponse(data :any){
  if(data.success){
    this.loading.hide();

    const emailverify =data.result.user_details.email_verify;
    if(emailverify == 0){
      this.activateOtp =true;
    }
     this.hideLog = true;

      const token = data.result.access_token;
      const name = data.result.user_details.username;
      const twofa  =data.result.user_details.twofa;
      const twofa_status =data.result.user_details.twofa_status;
      const email =data.result.user_details.email;
      this.kycstatus = data.kycstatus.value;
      
      // if(email != ""){
      //   this.strFirstThree = email.substring(0,5);
      // } 

      //set userdetails in localstorage
        this.Token.handle(token);
        this.Token.customset(name);
        localStorage.setItem("kycstatus",this.kycstatus);
        localStorage.setItem("kycstatusadmin",data.result.user_details.kfcstatusadmin);
        localStorage.setItem("acc",data.result.user_details.acc);
        const currentTime = new Date().getTime();
        sessionStorage.setItem('lA', currentTime.toString());

     if(twofa_status =='1'){
      this.Auth.changeAuthStatus(true);
      if (twofa == 'google_otp')
      { 
        this.error =null;
        this.success =null;
        this.visible=false;
        this.logingoogle =true;    
      }
      else if(twofa == 'email_otp')
      { 
        this.error =null;
        this.success =null;
        this.visible=false;
        this.loginemail =true;  
      }
        
     }
     else{
      localStorage.setItem('logged','true');
      this.loading.hide();
      this.Auth.changeAuthStatus(true);
      this.showpopup=true;
      setTimeout(()=>{
        this.showpopup=false
       },2000);
       this.router.navigate(['/app/panel']);
      //  this.router.navigate(['/app/home']);
       this.toastr.success(data.message);
     }

    }
     else{
      this.loading.hide();
      this.toastr.error(data.message);
     }
 }
 //Login without email verify
 resendOtp(){
  this.loading.show();
  this.activateOtp =false;
   return this.myservice.sendotp(this.form).subscribe(
    data => this.handleEmailverify(data),
    error =>this.handleError(error)
  );
 }
 //after send otp 
 handleEmailverify(data:any){
  this.loading.hide();
   if(data.success){
    this.activateOtp =false;
      this.error = null;
      this.resendemailotp =true;
      this.visible =false;
   }
   else{
    this.loading.hide();
    this.toastr.error(data.message);
    this.activateOtp =true;  
   }
 }

 //otp verify
 resendOTP(){
  this.loading.show();
  return this.myservice.otpverify(this.form).subscribe(
    data => this. handleRegisterOtp(data),
    error => this.handleError(error)
  );
 }

 //2fa verify otp
 loginOTP(){
  this.loading.show();
  this.error =null;
   this.myservice.verifylogintwofa(this.twofa).subscribe(
    data=>this.handletwofaRes(data),
    error=>this.handleError(error)
   )
 }

 //otp verify result
 handletwofaRes(data:any){
  this.loading.hide();
    if(data.success){
      this.error = null;
      this.success = null;
      this.Auth.changeAuthStatus(true);
      localStorage.setItem('logged','true');
      this.showpopup=true;
      setTimeout(()=>{
        this.showpopup=false
       },2000);
       this.router.navigate(['/app/home']);
       this.toastr.success(data.message);
    }
    else{
      this.loading.hide();
      // this.error =data.message;
      this.toastr.error(data.message);
    }
 }
 navigateHome(){
  this.router.navigate(['/app/home']);
 }

//google login
 googleSignIn() {
  (<any>window)['googleSDKLoaded'] = () => {
    console.log('Google SDK Loaded');
    (<any>window)['gapi'].load('auth2', () => {
      this.zone.run(() => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '363441929127-tihlv130kg9acf3mmo0itdu4ctim5m4n.apps.googleusercontent.com',
          // client_id: '498193022448-gb2na1hmb13r8modis57mh51osc8rp3q.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
          response_type: 'token',
          include_granted_scopes: 'true',
          state: 'pass-through value',
          redirect_uri:"http://localhost:4200/app/home",
        });
        this.setupSignInListener();
      });
    });
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
    fjs?.parentNode?.insertBefore(js, fjs);
  })(document, 'script', 'google-jssdk');
}

 setupSignInListener() {
  this.auth2.attachClickHandler(document.getElementById('googleSignInButton'), {},
    (googleUser: any) => {
      let profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    },
    (error: any) => {
      console.log(JSON.stringify(error, undefined, 2));
    }
  );
  }

 //register
  registerOnSubmit() {
    this.loading.show();
    this.isDisabled = true; 
    return this.myservice.register(this.formData).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
 //register api response
  handleResponse(data:any) {
    this.loading.hide();
    this.isDisabled = false;
    if (!data.success) {   
      // this.error = data.message;
      this.toastr.error(data.message);
    } else {
      this.loading.hide();
      this.error =null;
      // this.success = data.message;
      this.toastr.success(data.message);
      this.signUp = false;
      this.registeremail =true; 
      (<HTMLFormElement>document.getElementById("signupForm")).reset();
    }
  }
  //register email otp send
  resOTP(){
    this.loading.show();
    return this.myservice.otpverify(this.formData).subscribe(
      data => this. handleRegisterOtp(data),
      error => this.handleError(error)
    );
  }

  //after otp verify
  handleRegisterOtp(data:any){
    this.loading.hide();
    if(data.success){
      this.success = data.message;
      this.error = null;
      this.visible =true; 
      this.registeremail =false; 
      this.resendemailotp =false;
    }
    else{
      this.loading.hide();
      this.error = data.message;
    }
  }
  handleError(error:any) {
    this.loading.hide();
    console.log(error);
  }

  openModel() {
    this.loading.hide();
    this.modal.style.display = "block";
  }
   closeModel() {
    this.loading.hide();
    this.modal.style.display = "none";
   }
   openStep2Model() {
    this.loading.hide();
    this.modal.style.display = "none";
    this.modalStep2.style.display = "block";
   }
   closeStep2Model() {
    this.modalStep2.style.display = "none";
   }
 
   //third Model
   Reason(){
    for (const category of this.categories ) {
      if (category.selected) {
        if(this.activeIndex < 4) {  
          this.loading.hide();    
          this.activeIndex++;
        }
        this.thirdForm.account_recovery =category.name;
      }
    } 
   }
   thirdEmail() { 
    this.loading.show();    
      return this.myservice.emailChange(this.thirdForm).subscribe(
        data =>this.handleThirdRes(data),
        error => this.handleError(error)        
      ); 
    }
   thirdotp(){
    this.loading.show();
    return this.myservice.otpverify(this.thirdForm).subscribe(
      data =>this.handleOTPRes(data),
      error =>this.handleError(error)
    )
   }
   handleThirdRes(data:any){
    this.loading.hide();
    if(data.success){
      this.thirdForm.orderid = data.result.orderid;
      this.error = null;
      this.activeIndex++;
    }
    else{
      this.loading.hide();
      this.error = data.message;
    }  
   }
   handleOTPRes(data:any){
    this.loading.hide();
      if(data.success){
        this.error = null;
        if(this.activeIndex < 6) {
          this.error = null;
          this.activeIndex =4;
        } 
      }
      else{
        this.loading.hide();
        this.error = data.message;
      }
   }
   clickNext() {
    if(this.activeIndex < 4) {  
      this.loading.hide();    
      this.activeIndex++;
    }
   }
  
   //If you can access your original email type1
   openChangeEmail() {
    this.loading.hide();
    this.activeIndex =1;    
    this.signUp = false;
    this.options = false;
    this.changeEmail = true;
   }

   handleEmailChange(){
    if(this.activeIndex < 6) {
      this.error = null;
      this.activeIndex++;
    } 
    this.loading.show();
     return this.myservice.emailChange(this.emailChange).subscribe(
      error =>this.handleError(error)
     );
   }

   emailVerify(){
    this.submitted = true;
    this.loading.show();
    return this.myservice.otpverify(this.emailChange).subscribe(
      data =>this.handleEmailVerify(data),
      error =>this.handleError(error)
    ); 
   }

   handleEmailVerify(data:any){
    this.success = null;
    this.loading.hide();
      if(data.success){
        if(this.activeIndex < 6) {
          this.error = null;
          this.activeIndex++;
        } 
      }
      else{
        this.error = null;
        this.error = data.message;
      }
   } 

   addEmail(){
    this.loading.show();
    return this.myservice.updateemail(this.emailChange).subscribe(
      data=>this.handleEmailUpdate(data),
      error =>this.handleError(error)
    );    
   }

   handleEmailUpdate(data:any){
    this.loading.hide();
     if(data.success){
      if(this.activeIndex < 6) {
        this.error = null;
        this.activeIndex++;
      } 
     }
     else{
      this.loading.hide();
      this.error = null;
      this.error = data.message;
     }
   }

   //type 2
   //Forget password 
   forgetPassword(){
    this.loading.show();
    return this.myservice.forgetpassword(this.forget).subscribe(
      data =>this.ForgetPasswordres(data),
      error =>this.handleError(error)
    );
   }

   ForgetPasswordres(data:any){
    this.loading.hide();
    if(data.success){
      this.error = null;
      if(this.activeIndex < 6) {
        this.activeIndex++;
      } 
    }
    else{
      this.loading.hide();
      this.error = null;
      this.error = data.message;
    } 
   }
   
   onOtp() {
    this.loading.show();
    return this.myservice.otpverify(this.forget).subscribe(
      data =>this.handleOtpverify(data),
      error =>this.handleError(error)
    ); 
  }

  handleOtpverify(data:any){
    if(data.success){
      this.loading.hide();
      this.error = null;
      if(this.activeIndex < 6) {
        this.activeIndex++;
      }  
    }
    else{
      this.loading.hide();
      this.error = null;
      this.error = data.message;
    }
  }

  changePassword(){
    this.loading.show();
    return this.myservice.updatepassword(this.forget).subscribe(
      data =>this.handlePasswordChange(data),
      error =>this.handleError(error)
    );
  }

  handlePasswordChange(data:any){
     if(data.success){
      this.loading.hide();
      this.error = null;
      if(this.activeIndex < 6) {
        this.activeIndex++;
      }  
     }
     else{
      this.loading.hide();
      this.error = null;
      this.error = data.message;
    }
  }

   openOptions(){
    this.visible = false;
    this.options = true;
   }

   openChangeMail(){
    this.signUp = false;
    this.options = false;
    this.changeEmail = true;
   }

  //type 4 

  AccoutRecovery(){
    if(this.recovery < 4) {
      this.recovery++;
    }
  }

  emailRecovery(){
    this.loading.show();
    return this.myservice.forgetpassword(this.AccoutRecoveryForm).subscribe(
      data =>this.AccountRecoveryRes(data),
      error =>this.handleError(error)
    );
  }

  recoveryOtp(){
    this.loading.show();
    return this.myservice.otpverify(this.AccoutRecoveryForm).subscribe(
      data =>this.handleRecoveryOtp(data),
      error =>this.handleError(error)
    ); 
  }

  handleRecoveryOtp(data:any){
    if(data.success){
      if(this.recovery < 4) {
        this.loading.hide();
        this.recovery++;
      }
    }
    else{
      this.error = null;
      this.error = data.message;
    }

  }

  AccountRecoveryRes(data:any){
     if(data.success){
      this.loading.hide();
      if(this.recovery < 4) {
        this.recovery++;
      }
     }
     else{
      this.error = null;
      this.error = data.message;
      this.loading.hide();
     }
  }

   clickRecovery() {
    if(this.recovery < 4) {
      this.recovery++;
    }
   }

   openAcountRecovery() {
    this.activeIndex =1; 
    this.signUp = false;
    this.accountRecovery = true;
   }
   openAcount(){
    this.activeIndex =1; 
    this.signUp = false;
    this.openAcount2= true;
   }
   forgetpasss(){
    this.error = null;
    this.success =null;
    this.activeIndex =1; 
    this.signUp = false;
    this.forgetpass=true;
   }

  onOtpChange() {
    console.log(this.forget.OTP);
  }
  
   //  FAQ

   public according = [
    {
      id: 1,
      Headers: "How does supply and demand work in the cryptocurrency market?",
      decription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    },
    {
      id: 2,
      Headers: "How to start trading in cryptocurrencies?",
      decription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    },
    {
      id: 3,
      Headers: "How do I make money by trading cryptocurrencies?",
      decription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    },
    {
      id: 4,
      Headers: "How to trade in cryptocurrencies in a safe way?",
      decription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    },
    {
      id: 5,
      Headers: "How does supply and demand work in the cryptocurrency market?",
      decription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    },
    {
      id: 6,
      Headers: "What do I need to know before investing in cryptocurrency?",
      decription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    },
    {
      id: 7,
      Headers: "How to trade in cryptocurrencies in a safe way?",
      decription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta",
    },
  ];

  // close & open icon 
  customExpandIcon = 'pi pi-plus';
  customcollaps ='pi pi-times';

 isSessionExpired() {
  const lastActivityTimestamp = sessionStorage.getItem('lA');
  if (lastActivityTimestamp) {
      const lastActivityTime = new Date(lastActivityTimestamp).getTime();
  
      const currentTime = new Date().getTime();
      
      const sessionTimeoutDuration = 12 * 60 * 60 * 1000; 
      
      if (currentTime - lastActivityTime > sessionTimeoutDuration) {
          return true;
      }
  }
  
  return false;
}

 checkSessionExpiry() {
  if (this.isSessionExpired()) {
      console.log('Session has expired');
  } else {
      console.log('Session is active');
  }
}
  
}
