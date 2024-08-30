import { Component } from '@angular/core';
import { NgOtpInputConfig } from 'ng-otp-input';
import { ProfileService } from 'src/app/Services/profile.service';
import { IntermediateService } from 'src/app/Services/intermediate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LoadingService } from 'src/app/Services/loading.service';
import { ToastrService } from 'ngx-toastr';

// Custom Validator Function
export const atLeastOneRequired: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (control instanceof FormGroup) {
  const controls = Object.keys(control.controls);

  const isAtLeastOneFieldPopulated = controls.some((controlName: string) => {
    const controlValue = control.get(controlName)?.value;
    return (
      controlValue !== null && controlValue !== '' && controlValue !== undefined
    );
  });

  return isAtLeastOneFieldPopulated ? null : { atLeastOneRequired: true };
}
return null;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public loading;
  section = 1;
  tele: any[] = [];
  emaillist:any[] =[];
  noti = 0;
  whats: any[] = [];
  smslist: any[] =[];
  dis: any[] = [];
  activeIndex = 1;
  modal: any;
  modal2:any;
  modal3:any;
  modal4:any;
  public error = '';
  public isShown:boolean =false;
  public isDisabled:boolean =false;
  type: any;
  resetprofileForm!: FormGroup;
  isError: boolean = false;

  telegram:string='telegram';
  discord:string='discord';
  whatsapp:string='whatsapp';
  email:string='email';
  sms:string='sms';


  profileForm ={
    twofaStatus:'',
    twofaType:'',
    phoneNumber:'',
    googleSecret:'',
    email:'',
    google2faVerify:'',
    qrCode:''
  };
  
  twoFaForm ={
    twofa:'',
    OTP:'',    
  }

  config :NgOtpInputConfig = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };

  resetForm = {
    email: '',
    otp: '',
  };


  atLeastOneRequired: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (control instanceof FormGroup) {
    const controls = Object.keys(control.controls);

    const isAtLeastOneFieldPopulated = controls.some((controlName: string) => {
      const controlValue = control.get(controlName)?.value;
      return (
        controlValue !== null &&
        controlValue !== '' &&
        controlValue !== undefined
      );
    });

    return isAtLeastOneFieldPopulated ? null : { atLeastOneRequired: true };
  }
  return null;
  };

  constructor( private profile:ProfileService, 
     private myservice: IntermediateService,
     private fb: FormBuilder,
     private toastr: ToastrService,
     private isloading:LoadingService) {
      this.loading = isloading;

      this.resetprofileForm = this.fb.group(
        {
          name: [''],
          email: ['', Validators.email],
          phone_number: [''],
        },
        { validators: this.atLeastOneRequired }
      );
     }

  ngOnInit() {
    this.loading.show(); 
    this.profile. profiledetails().subscribe(
      data => this.handleUserProfile(data),
      error => this.handleError(error)
    );
    this.userNotification();
     
    // this.resetprofileForm = this.fb.group(
    //   {
    //     name: [''],
    //     email: ['', Validators.email],
    //     phone_number: [''],
    //   },
    //   { validators: this.atLeastOneRequired }
    // );

    this.modal = document.getElementById("myModal");
    this.modal2 = document.getElementById("myModal2");
    this.modal3 = document.getElementById("myModal3");
    this.modal4 = document.getElementById("myModal4");


    this.emaillist = [
      {
        label: 'Personal Notification' ,code:'PN',active:false
      },
      {
        label: 'Login alerts for new device',code:'LA',active:false
      },
      {
        label: 'Signal message alerts',code:'SM',active:false
      },
      {
        label: 'Executed trades alerts',code:'ET',active:false
      },
      {
        label: 'Inbox message alerts',code:'IM',active:false
      },
      {
        label: 'Security alerts',code:'SA',active:false
      },
      {
        label: 'Promotional Discount alerts',code:'PD',active:false
      },
    ];
    this.tele = [
      {
        label: 'Personal Notification' ,code:'PN',active:false
      },
      {
        label: 'Login alerts for new device',code:'LA',active:false
      },
      {
        label: 'Signal message alerts',code:'SM',active:false
      },
      {
        label: 'Executed trades alerts',code:'ET',active:false
      },
      {
        label: 'Inbox message alerts',code:'IM',active:false
      },
      {
        label: 'Security alerts',code:'SA',active:false
      },
      {
        label: 'Promotional Discount alerts',code:'PD',active:false
      },
    ];

    this.dis = [{
      label: 'Personal Notification',code:'PN',active:false
    },
    {
      label: 'Login alerts for new device',code:'LA',active:false
    },
    {
      label: 'Signal message alerts',code:'SM',active:false
    },
    {
      label: 'Executed trades alerts',code:'ET',active:false
    },];

    this.whats = [{
      label: 'Signal message alerts',code:'SM',active:false
    },
    {
      label: 'Executed trades alerts',code:'ET',active:false
    },
    {
      label: 'Inbox message alerts',code:'IM',active:false
    },
    {
      label: 'Security alerts',code:'SA',active:false
    },
    {
      label: 'Promotional Discount alerts',code:'PD',active:false
    },];

    this.smslist = [{
      label: 'Blog Posts',code:'BP',active:false
    },
    {
      label: 'Security alerts',code:'SA',active:false
    },
    {
      label: 'Promotional Discount alerts',code:'PD',active:false
    },];
  }

  notifiClick(item:any,name:string){
    
    const data = {
      label: item.code,
      type: name,
      action: item.active,
     };
    
     
    return this.profile.updateNotification(data).subscribe(
      data=> console.log(data),
      error => this.handleError(error)
    );      
  }

  handleUserProfile(data:any){
    this.loading.hide();
    if(data.success){
      this.profileForm.twofaStatus      = data.result.twofa_status ? data.result.twofa_status : '';
      this.profileForm.twofaType        = data.result.twofa  ? data.result.twofa :'';
      this.profileForm.googleSecret     = data.result.googlesecret ? data.result.googlesecret:'';
      this.profileForm.google2faVerify  = data.result.google2fa_verify ? data.result.google2fa_verify:'';
      this.profileForm.email            = data.result.email ? data.result.email:'',
      this.profileForm.phoneNumber      = data.result.phonenumber ? data.result.phonenumber:'';
      this.profileForm.qrCode           =  data.result.googleqrimage ? data.result.googleqrimage:'';
      
      const twofastatus = this.profileForm.twofaStatus;

      if(twofastatus == '1' ){

        this.isDisabled = true;
        this.type =this.profileForm.twofaType;
     }
     else{
      this.isDisabled = false;
     }

    }
  }

  userNotification(){
    this.loading.show();
    return this.profile.userNotification().subscribe(
      data=> this.Updatenotification(data),
      error => this.handleError(error)
    );
  }
  Updatenotification(data:any){
    this.loading.hide();

    var len = data.result.length;
    if(data.success){
        for(var i=0 ; i< len ; i++ ){
          var obj = data.result[i];
          var prop =obj.properties
          var proplen =obj.properties.length
          for(var j=0 ; j<proplen; j++){
            var props = prop[j];
            if(obj.type === "whatsapp"){
                this.whats.forEach(wh => {
                  if(wh.code == props){
                    wh.active = true
                  }
                });                           
            }
            else if(obj.type === 'telegram'){
              this.tele.forEach(item => {
                if(item.code == props){
                  item.active = true
                }
              }); 
               
            }
            else if(obj.type === "email"){
              this.emaillist.forEach(item => {
                if(item.code == props){
                  item.active = true
                }
              }); 

            }
            else if (obj.type === "sms"){
              this.smslist.forEach(item => {
                if(item.code == props){
                  item.active = true
                }
              }); 
            }
            else if (obj.type === 'discord'){
              this.dis.forEach(item => {
                if(item.code == props){
                  item.active = true
                }
              }); 
            }
          }
       }
    }
  }

  twoFaSubmit(){

    const type =this.twoFaForm.twofa
    // const number =this.profileForm.phoneNumber;
    const email =this.profileForm.email;
    const QrCode =this.profileForm.qrCode;

    if(type == 'email'){
       if(email !== '' && email !== undefined){
          this.activeIndex =1;
          this.openModel();
          return this.myservice.enabletwofa(this.twoFaForm).subscribe(
            data =>  this.loading.hide(),
            error => this.handleError(error)
          );
       }
       else{
            this.toastr.error('Please Update Your Mobile Number'); 
       }
    }
    else if(type == 'google'){
        if( QrCode !== ''){
           this.isShown = true;
           this.openModel2();
           return this.myservice.enabletwofa(this.twoFaForm).subscribe(
            data=> this.loading.hide(),
            error => this.handleError(error)
          );
        }
        else {
           this.isShown =false;
           this.openModel2();
        } 
    }
    else if(type == 'none'){
        return this.myservice.disabletwofa(this.twoFaForm).subscribe(
          (data:any)=>{
            if(data.success){
              this.loading.hide();
              this.activeIndex = 2;
              this.openModel();
              this.isDisabled = false;
              this.type ='';
            }
          },
          (error)=>{
            this.loading.hide();
            this.handleError(error)
          }
        ) 
    }
    return null
  }

  twoFaotp(){

    const type =this.twoFaForm.twofa
    const OTP =this.twoFaForm.OTP
    this.loading.show();
    if(type !== '' && OTP !== ""){
        return this.myservice.verifyTwofa(this.twoFaForm).subscribe(
          data=> this.handlegoogleVerifyRes(data),
          error => this.handleError(error)
        );
    }
    else{
      this.loading.hide();
      this.toastr.error('Please Enter OTP');
    }
    return  
  }
  

  handlegoogleVerifyRes(data:any){
    this.loading.hide();
    if(data.success){
      this.activeIndex = 2;
      this.openModel();
      this.isDisabled = true;
      if(this.twoFaForm.twofa == 'mobile'){
          this.type ='email_otp'
      }
      else if(this.twoFaForm.twofa == 'google'){
        this.type = 'google_otp'
      }
    }
    else{
      this.toastr.error(data.message);
      // this.activeIndex = null;
    }
  }

  handlerestprofileotpsuccess(data:any){
    if(data.success){
      this.loading.hide();
      this.activeIndex = 2;
      this.profile.resetProfile(this.resetprofileForm.value).subscribe(
        (data) => {
          this.handleresetprofilesuccess(data);
         },
        (error) => this.handleError(error)
      );
    }
    else{
      this.toastr.error(data.message);
    }
  }

  handleresetprofilesuccess(data:any){

    if (data.success) {
      this.resetprofileForm.reset()
      } else {
        this.error = data.message
      }
  }

  twoFaotpnew(){
    const type =this.twoFaForm.twofa
      this.loading.show();
        return this.myservice.verifyTwofa(this.twoFaForm).subscribe(
          data=> this.handlerestprofileotpsuccess(data),
          error => this.handleError(error)
        );     
  }

  handleError(error:any){
    this.loading.hide();
    console.log(error);
  }
  changeNoti(num: number) {
    this.noti = num;
  }
  //  Modal 2 
  openModel() {
    this.modal.style.display = "block";
  }
   closeModel() {
    this.modal.style.display = "none";
   }
  //  Modal 2 
   openModel2() {
    this.modal2.style.display = "block";
  }
  closeModel2() {
    this.modal2.style.display = "none";
   }

    //  Modal 3 
    openModel3() {
      this.modal3.style.display = "block";
    }
    closeModel3() {
      this.modal3.style.display = "none";
     }

    //  Modal 4
    openModel4() {
      this.modal4.style.display = "block";
    }
    closeModel4() {
      this.modal4.style.display = "none";
     }

   //  Modal 1 loop 
   submit(){
    if(this.activeIndex < 2) {
      this.activeIndex++;
    }
   }
   
  handleresetsuccess(data: any) {
    if (data.success) {
      this.openModel();
      this.resetprofileForm.reset();
    } else {
      this.isError = data.message;
    }
  }

  submitForm() {
    const name = this.resetprofileForm.value.name;
    const email = this.resetprofileForm.value.email;
    const phone_no = this.resetprofileForm.value.phone_number;
    this.activeIndex = 1;

    if (phone_no != '' && phone_no !== null) {
      this.openModel4();
      // return this.profile.resetProfile(this.resetprofileForm.value).subscribe(
      //   (data) => this.handleresetsuccess(data),
      //   (error) => this.handleError(error)
      // );
    } else if (email != '' && email !== null) {
      this.openModel3();
      // return this.profile.resetProfile(this.resetprofileForm.value).subscribe(
      //   (data) => this.handleresetsuccess(data),
      //   (error) => this.handleError(error)
      // );
    } else {
      this.profile.resetProfile(this.resetprofileForm.value).subscribe(
        (data) => {
          this.profile.setUsername(name);
          this.resetprofileForm.reset()},
        (error) => this.handleError(error)
      );
    }
    return null;
  }
}
