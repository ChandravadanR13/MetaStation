import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ProfileService } from 'src/app/Services/profile.service';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/Services/token.service';
import { environment } from 'src/environments/environment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { LoadingService } from 'src/app/Services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { data } from 'jquery';

@Component({
  selector: 'app-manage-user-profile',
  templateUrl: './manage-user-profile.component.html',
  styleUrls: ['./manage-user-profile.component.scss'],
  providers: [MessageService],
})
export class ManageUserProfileComponent {
  [x: string]: any;
  // showDialog: boolean = false;
  loading: Observable<boolean>; // Define loading as an Observable<boolean>
  formSubmitted: boolean = false;
  emailOTPValue: string = '';
  showDialog: boolean = false;
  showEmailDialog: boolean = false;
  showMobileDialog: boolean = false;
  // error: string = '';
  contactForm: FormGroup;
  emailForm: FormGroup;
  emotp: FormGroup;
  contactotp: FormGroup;

  items: MenuItem[] = [];
  sectionId: number = 0;
  commonOptions: any[] = [];
  idType: any[] = [];
  genderOptions: any[] = [];
  ingredient: any;
  messages1: Message[] = [];

  messages2: Message[] = [];
  mageSrc: string = '';
  showpopup: boolean = false;
  modal: any;
  kycStatus: any;
  kycText: any;
  UserKycStatus: any;
  imageUrl: string | null = null;
  userFeeRole :string | null = null;
  userRole : string | null = null;
  showImageCropper = false;
  imageSrc: string = '';
  frontImage: File | undefined;
  backImage: File | undefined;
  showForm: boolean = true;

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    profileimg: new FormControl('', [Validators.required]),
  });

  imageChangedEvent: any = '';
  croppedImage: any = '';
  // emotp: any;

  constructor(
    private messageService: MessageService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private profile: ProfileService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.emotp = this.fb.group({
      emailOTP: ['', Validators.required],
    });

    this.contactotp = this.fb.group({
      contact_otp: ['', Validators.required],
    });

    this.loading = this.loadingService.isLoading;
    this.contactForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    // Initialize email form
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  baseUrl = environment.baseUrl;
  userdata: any = [];
  public error: boolean = false;
  isDisabled: boolean = false;

  fileChangeEvent(event: any): void {
    this.showImageCropper = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: any): void {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64Image = fileReader.result as string;
      this.croppedImage = base64Image;
      this.myForm.patchValue({ profileimg: base64Image });
    };

    fileReader.readAsDataURL(event.blob);
  }

  toggleImageCropper() {
    this.showImageCropper = !this.showImageCropper;
  }

  submit() {
    console.log(this.myForm);
    // return;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http
      .post<any>(this.baseUrl + '/profileupdate', this.myForm.value, {
        headers: headers,
      })
      .subscribe((res: any) => {
        let imageUrl = res.result;
        localStorage.setItem('imageurl', imageUrl);
        window.location.reload();
      });
  }

  profileForm = {
    userName: '',
    acc: '',
    logtype: '',
    phoneNumber: '',
    email: '',
    secondaryEmail: '',
    country: '',
    companyName: '',
    comapanyLocation: '',
    taxRule: '',
    timeZone: '',
    link: '',
    companyLocation: '',
    kyc_status: '',
    kyc_text: '',
  };

  currency = {
    currency: '',
  };

  socialForm = {
    telegram: '',
    discord: '',
    facebook: '',
    instagram: '',
  };

  kycForm = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    address1: '',
    address2: '',
    idType: '',
    idNumber: '',
    id_exp: '',
    front_upload_id: undefined as File | string | undefined,
    back_upload_id: undefined as File | string | undefined,
  };

  onImage1Selected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.frontImage = inputElement.files[0];
      this.convertToBase64(this.frontImage);
    }
  }

  onImage2Selected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.backImage = inputElement.files[0];
      this.convertToBase64_backimage(this.backImage);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      // This will contain the base64 image string
      this.kycForm.front_upload_id = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  convertToBase64_backimage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      // This will contain the base64 image string
      this.kycForm.back_upload_id = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.profile.profiledetails().subscribe(
      (data) => this.handleUserProfile(data),
      (error) => this.handleError(error)
    );

    //Kyc Tab(open)
    this.route.queryParams.subscribe((params) => {
      if (params['sectionId']) {
        this.sectionId = +params['sectionId'];
        this.kycStatus = true;
      }
    });

    this.modal = document.getElementById('myModal');

    this.genderOptions = [
      { name: 'Male', code: 'male' },
      { name: 'Female', code: 'female' },
      { name: 'Non-Binary', code: 'nonbinary' },
      { name: 'Other', code: 'other' },
    ];

    this.commonOptions = [
      { name: 'India', code: 'india' },
      { name: 'USA', code: 'usa' },
      { name: 'China', code: 'china' },
      { name: 'Russia', code: 'russia' },
      { name: 'Japan', code: 'japan' },
    ];

    this.idType = [
      { name: 'National Identity Card', code: 'nic' },
      { name: 'Driving License', code: 'dl' },
      { name: 'Passport', code: 'passport' },
      { name: 'Others', code: 'others' },
    ];

    this.items = [
      {
        label: 'User Profile',
        command: () => {
          this.setClear();
          this.setSection(0);
        },
      },
      {
        label: 'Fee Rates',
        command: () => {
          this.setClear();
          this.setSection(4);
        },
      },
      {
        label: 'KYC',
        command: () => {
          this.setClear();
          this.CheckStatus();
          this.setSection(1);
        },
      },
      {
        label: 'Currency Preferences',
        command: () => {
          this.setClear();
          this.setSection(2);
        },
      },
      {
        label: 'Social Media',
        command: () => {
          this.setClear();
          this.setSection(3);
        },
      },
    ];

    this.messages1 = [{ severity: 'success', summary: 'Success', detail: '' }];

    this.messages2 = [
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Closable Message Content',
      },
    ];
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          profileimg: reader.result as string,
        });
      };
    }
  }

  get f() {
    return this.myForm.controls;
  }

  kycUpdate() {
    this.error = false;
    this.profile.kycUpdate(this.kycForm).subscribe(
      (data) => this.handleKycRes(data),
      (error) => this.handleError(error)
    );
  }

  upgradeToPro(){

    const token = localStorage.getItem('accLabel');
    this.profile.upgradeUser(token).subscribe(
      (data:any) => {
        if(data.success){
          this.userRole = 'pro';
          this.toastr.success(data.message);
        }else{
          this.toastr.error(data.message);  
        }
      },
      (error) => this.handleError(error)
    );
  }

  handleKycRes(data: any) {
    if (data.success) {
      this.showpopup = true;
      this.error = false;
      this.toastr.success(data.message);
      this.kycForm = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: '',
        dob: '',
        country: '',
        state: '',
        city: '',
        postalCode: '',
        address1: '',
        address2: '',
        idType: '',
        idNumber: '',
        id_exp: '',
        front_upload_id: undefined,
        back_upload_id: undefined,
      };
      this.showForm = false;
      this.kycText = 'KYC Waiting for approval';
      setTimeout(() => {
        this.showpopup = false;
      }, 2000);
    } else {
      // this.error = data.message;
      this.toastr.error(data.message);
    }
  }

  profileUpdate() {
    this.profile.profileupdate(this.profileForm).subscribe(
      (data) => this.handleprofileUpdate(data),
      (error) => this.handleError(error)
    );
  }

  handleprofileUpdate(data: any) {
    if (data.success) {
      this.toastr.success(data.message);
    } else {
      this.error = data.message;
    }
  }

  handleUserProfile(data: any) {
    if (data.success) {
      let imageurl = data.result.profile_img;

      this.imageUrl = imageurl;
      this.profileForm.userName = data.result.userName
        ? data.result.userName
        : '';
      this.profileForm.acc = data.result.acc ? data.result.acc : '';
      this.profileForm.logtype = data.result.logtype ? data.result.logtype : '';
      this.profileForm.phoneNumber = data.result.phonenumber
        ? data.result.phonenumber
        : '';
      this.profileForm.email = data.result.email ? data.result.email : '';
      this.profileForm.secondaryEmail = data.result.secondaryEmail
        ? data.result.secondaryEmail
        : '';
      this.profileForm.country = data.result.country ? data.result.country : '';
      this.profileForm.companyName = data.result.companyName
        ? data.result.companyName
        : '';
      this.profileForm.taxRule = data.result.taxRule ? data.result.taxRule : '';
      this.profileForm.timeZone = data.result.timeZone
        ? data.result.timeZone
        : '';
      this.profileForm.link = data.result.link ? data.result.link : '';
      this.profileForm.companyLocation = data.result.companyLocation
        ? data.result.companyLocation
        : '';
      this.profileForm.kyc_status = data.result.kyc_status;
      this.profileForm.kyc_text = data.result.kyc_text
        ? data.result.kyc_text
        : '';
      this.socialForm.discord = data.result.discord;
      this.socialForm.facebook = data.result.facebook;
      this.socialForm.instagram = data.result.instagram;
      this.socialForm.telegram = data.result.telegram;
      this.currency.currency = data.result.currency;
      this.userFeeRole =data.result.feerole;
      this.userRole   = data.result.user_role;
    } else {
      this.error = data.message;
    }
  }

  CheckStatus() {
    this.UserKycStatus = this.profileForm.kyc_status;

    if (this.UserKycStatus !== 0) {
      this.kycStatus = true;
      this.kycText = this.profileForm.kyc_text;
      this.showForm = false;
    } else {
      this.kycStatus = true;
      this.kycText = this.profileForm.kyc_text;
      this.showForm = true;
    }
  }

  getColorBasedOnStatus(): string {
    switch (this.UserKycStatus) {
      case 0:
        return '#ffffff';
      case 1:
        return '#008000';
      case 2:
        return '#008000';
      case 3:
        return '#ff0000';
      default:
        return '#ffffff';
    }
  }
  setClear() {
    this.error = false;
    this.kycText = '';
  }

  Currency() {
    this.profile.currency(this.currency).subscribe(
      (data: any) => {
        if (data) {
          this.toastr.success(data.message);
        } else {
          //  this.error = data.message;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  social() {
    this.profile.socialnetwork(this.socialForm).subscribe(
      (data) => this.handlesocialUpdate(data),
      (error) => this.handleError(error)
    );
  }

  handlesocialUpdate(data: any) {
    if (data.success) {
      this.toastr.success(data.message);
      // this.showpopup=true;
      this.error = false;
    } else {
      this.error = data.message;
    }
  }

  handleError(error: any) {
    console.log(error);
  }

  copyToClipboard(el: any) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(el).then(
        () => {
          this.showSuccess();
        },
        (error) => {
          console.log(error);
          this.showError();
        }
      );
    } else {
      this.showInfo();
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Copied to Clipboard',
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Browser do not support Clipboard API',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error While Copying Content',
    });
  }

  setSection(sectionId: number) {
    this.sectionId = sectionId;
  }
  openModel() {
    this.modal.style.display = 'block';
  }
  closeModel() {
    this.modal.style.display = 'none';
  }

  isVisible = true;

  hideBox() {
    this.isVisible = false;
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      // Perform form submission or other actions
      var contact = this.contactForm.value;

      this.profile.sendEmail(contact).subscribe(
        (data: any) => {
          // console.log(data)
          if (data.success) {
            this.showMobileDialog = true;

            this.toastr.success(data.message);
          } else {
            //  this.error = data.message;
            this.toastr.error(data.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // Submit email form
  submitEmailForm() {
    if (this.emailForm.valid) {
      this.formSubmitted = true;

      var email = this.emailForm;

      this.profile.sendEmail(email.value).subscribe(
        (data: any) => {
          // console.log(data)
          if (data.success) {
            this.showEmailDialog = true;

            this.toastr.success(data.message);
          } else {
            //  this.error = data.message;
            this.toastr.error(data.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  emailOTP() {
    var email_res = {
      email: this.emailForm.value.email,
      OTP: this.emotp.value.emailOTP,
    };

    this.profile.sendotp(email_res).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.showEmailDialog = true;

          this.toastr.success(data.message);
        } else {
          //  this.error = data.message;
          this.toastr.error(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(email_res);
  }

  mobileOTP() {
    var email_res = {
      email: this.contactForm.value.phoneNumber,
      OTP: this.contactotp.value.contact_otp,
    };

    console.log(email_res);

    this.profile.sendotp(email_res).subscribe(
      (data: any) => {
        console.log(data);
        if (data.success) {
          this.showEmailDialog = true;

          this.toastr.success(data.message);
        } else {
          //  this.error = data.message;
          this.toastr.error(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
