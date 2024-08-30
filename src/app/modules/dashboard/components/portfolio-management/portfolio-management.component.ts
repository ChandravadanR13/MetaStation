import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartModule } from 'primeng/chart';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-portfolio-management',
  templateUrl: './portfolio-management.component.html',
  styleUrls: ['./portfolio-management.component.scss'],
})
export class PortfolioManagementComponent {
  data: any;
  subscriptionPlans: any[] = [];

  options: any;
 
  Autobalance:any="$ 10000";

  accountDP: City[] | any;
  categories: any[] = [
    { label: 'Bot68421_Rick', value: 'Category 1' },
    { label: 'Bot68341_Richy', value: 'Category 2' },
    { label: 'Bot68341_point', value: 'Category 2' },
    { label: 'Bot68341_pokemon', value: 'Category 2' },

  ];

  ngOnInit() {

    this.accountDP = [
      { name: 'Account 1', code: 'NY' },
      { name: 'Account 2', code: 'RM' },
      { name: 'Account 3', code: 'LDN' },
      { name: 'Account 4', code: 'IST' },
      { name: 'Account 5', code: 'PRS' }
  ];
  
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
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [30, 50, 20],
          backgroundColor: [
            'rgba(226, 182, 25, 1)',
            'rgba(210, 78, 78, 1)',
            'rgba(20, 146, 230, 1)'
          ],
          hoverBackgroundColor: [
            'rgba(226, 182, 25, 1)',
            'rgba(210, 78, 78, 1)',
            'rgba(20, 146, 230, 1)'
          ],
        },
      ],

    };

    this.options = {
      cutout: '70%',
      borderWidth: 4,
      border: 0,
      plugins: {
        legend: {
          display: false,
        },
      },
      tooltips: {
        display: false
      }
    };
  }

  deltePlan(index : any) {
    console.log(index);
    this.subscriptionPlans.splice(this.subscriptionPlans.indexOf(index.id), 1);
  }
}
