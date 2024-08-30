import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormControl,ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/Services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-signal',
  templateUrl: './create-signal.component.html',
  styleUrls: ['./create-signal.component.scss']
})
export class CreateSignalComponent {
  commonOptions: any[] = [];
  basicOptions: any;
  lineStylesData: any;
  value1: any;
  value2: any;
  public chart: any;
  id : number = 1;
  visible: boolean = false;
  subscriptionPlans: any[] = [];
  createsignalForm: FormGroup;

  constructor(private router: Router,private fb: FormBuilder,private profile: ProfileService,private toastr: ToastrService,){

    this.createsignalForm = this.fb.group({
      rank: ['', Validators.required],
      name: ['', Validators.required],
      rewards: ['', Validators.required],
      avg_monthly_performance: ['', Validators.required],
      kyc: ['', Validators.required],
      risk: ['', Validators.required],
      sub_count: ['', Validators.required],
      market: ['', Validators.required],
      master_bot: ['', Validators.required],
      broker: ['', Validators.required],
      strategy: ['', Validators.required],
      access: ['', Validators.required],
      assets: ['', Validators.required],
      tel_public_link: ['', Validators.required],
      tel_signal_link: ['', Validators.required],

    });
  }
  backToPrevious(){
    this.router.navigate(['app/marketplace/main-signle']);
  }
  ngOnInit() {

    this.subscriptionPlans = [
      {
        id: '1',
        tiers: 'Bronze',
        months: '1',
        freeAdditionalMonths: '0 days',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        fees: '$20',

      },
      {
        id: '2',
        tiers: 'Silver',
        months: '3',
        freeAdditionalMonths: '10 days',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        fees: '$28',

      },
      {
        id: '3',
        tiers: 'Gold',
        months: '6',
        freeAdditionalMonths: '1 Month',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        fees: '$55',

      },
      {
        id: '4',
        tiers: 'Premium',
        months: '12',
        freeAdditionalMonths: '2 Months',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        account: 'Jitendra Sharma',
        email: 'abc_123@gmail.com',
        telegramusername: 'Jitendra Sharma',
        remainingsubscription: '30 days',
        dateofsubscription: '13/02/2022' ,
        fees: '$115',
      },
    ];

    this.commonOptions = [
      { name: 'Spot market', code: 'spot_market' },
      { name: 'Future market', code: 'future_market' },
      { name: 'Margin market', code: 'margin_market' }
    ];

    this.basicOptions = {
      bezierCurve: false,
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: '#ebedef',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
            fontSize: 40,
            font: {
              family: 'Euclid Circular A', // Your font family
              size: 14,
            },
            fontFamily: 'Euclid Circular A',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
        y: {
          ticks: {
            color: '#ebedef',
            fontSize: 40,
            font: {
              family: 'Euclid Circular A', // Your font family
              size: 14,
            },
            fontFamily: 'Euclid Circular A',
            callback: (label: string, index: any, labels: any) => {
              return '$' + label + ' ' + 'T';
            },
          },
          grid: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      },
    };

    this.lineStylesData = {
      labels: [
        'Sep’21',
        'Oct’21',
        'Nov’21',
        'Dec’21',
        'Jan’22',
        'Feb’22',
        'Mar’22',
        'Apr’22',
        'Mar’22',
        'May’22',
        'Jun’22',
        'Jul’22',
        'Aug’22',
      ],

      datasets: [
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45, 50, 90, 40, 30, 20, 10],
          fill: true,
          borderColor: '#3C71FB',
          tension: 0,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          pointRadius: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };

  }

  deltePlan(index : any) {
    console.log(index);
    this.subscriptionPlans.splice(this.subscriptionPlans.indexOf(index.id), 1);
  }

  onCLickedButton(id: number) {
    this.id = id;
  }

  openSubscriptionDilaog() {
    this.visible = true;
  }

  createChart() {
    var myCanvas: any = document.getElementById('MyChart6');
    var ctx = myCanvas.getContext('2d');
    var gradient = ctx.createLinearGradient(
      0,
      myCanvas.height,
      0,
      myCanvas.width
    );
    gradient.addColorStop(0, 'rgb(60, 113, 251, 0.2)');
    gradient.addColorStop(1, 'rgba(85, 110, 173, 0)');

    this.chart = new Chart('MyChart6', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Sep’21',
          'Oct’21',
          'Nov’21',
          'Dec’21',
          'Jan’22',
          'Feb’22',
          'Mar’22',
          'Apr’22',
          'Mar’22',
          'May’22',
          'Jun’22',
          'Jul’22',
          'Aug’22',
        ],
        datasets: [
          {
            data: [60, 51, 62, 33, 21, 62, 45, 50, 90, 40, 30, 20, 10],
            borderColor: '#3C71FB',
            backgroundColor: gradient,
            pointRadius: 0,
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 16.1,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ebedef',
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
          y: {
            ticks: {
              stepSize: 40,
              color: '#ebedef',
              // fontSize: 40,
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
              callback: function (val, index) {
                return '$' + val + ' ' + 'T';
              },
            },
            grid: {
              color: 'rgba(112, 118, 136, 0.13)',
            },
          },
        },
      },
    });
  }

  ngAfterViewInit(): void {
    var myCanvas: any = document.getElementById('MyChart6');
    var ctx = myCanvas.getContext('2d');
    console.log(ctx);

    this.createChart();
  }

  createsignal(){
    
    if (this.createsignalForm.valid) {
      
      // this.loading.show();
      // this.isDisabled = true;
      const formData = this.createsignalForm.value;
      
      console.log(formData);
      this.profile.createsignal(formData).subscribe(
        (data) => {
          this.handlesuccess(data);
          console.log(data)
        },
        (error) => {
          
          // this.handleError(error);
          // this.toastr.error(error);
          console.log(error);
        }
      );

    } else {
      Object.values(this.createsignalForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

  }

  handlesuccess(data: any) {
    // this.loading.hide();
    // this.isDisabled = false;

    if (data.success) {
      // this.loading.hide();
      // this.error = null;
      this.toastr.success(data.message);
    } else {
      // this.toastr.error(data.message);
      console.log(data.message);
    }
  }

  date: Date | undefined;
}
