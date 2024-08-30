import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ViewEncapsulation} from '@angular/core';
import { WalletService } from 'src/app/Services/wallet.service';
@Component({
  selector: 'app-main-signle',
  templateUrl: './main-signle.component.html',
  styleUrls: ['./main-signle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSignleComponent {
  totalRecords = 10;
  first = 0;
  last = 10;
  summury: any = [];
  commonOptions: any = [];
  
  constructor(private router: Router,
  private walletService: WalletService) {

  }
  
  onClickCreate() {
    this.router.navigate(['/marketplace/create-signal']);
  }

  onClickAction(){
    this.router.navigate(['/marketplace/fund-manager-details']);
 }
  ngOnInit() {
      
    this.commonOptions = [
      { name: 'Sample', code: 'NY' },
      { name: 'Sample', code: 'RM' },
      { name: 'Sample', code: 'LDN' },
      { name: 'Sample', code: 'IST' },
      { name: 'Sample', code: 'PRS' },
    ];
   this.SignalList();
  }

  SignalList() {
    this.walletService.SignalList().subscribe(
      (data: any) => {
        if (Array.isArray(data.result)) {
          this.summury = data.result;
        } else {
          console.error('The API response does not indicate success or result is not an array');
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any) {
    console.log(error);
  }

   // this.summury = [     
      //   {
      //     id: '1000',
      //     code: 'f230fh0g3',
      //     assetName: 'Aave lendin',
      //     description: 'Product Description',
      //     symbol: 'bamboo-watch.jpg',
      //     percentage: 65,
      //     category: 'Accessories',
      //     value: '550,861.68',
      //     inventoryStatus: 'INSTOCK',
      //     amount: '555,861.6829',
      //     balance: '84000',
      //     market: 'Spot',
      //     telegramusername: 'Jitendra Sharma',
      //     // Broker: ,
      //     Assets : 'Polygon',
      //     Network: 'BSC',
      //     Subscribercount : '950',
      //     rank: '11',
      //     accountCreatedDate: '13/02/22',
      //     Strategy: 'Manual',
      //     AvgPerformance: '10 %',
      //     Access: 'Public',
      //     kyc: 'Yes',
      //     Rewards: '15',
      //     Risks: '2/4',
      //     Subcriberfess: 'Monthly',
      //     d:'10%',
      //     w:'10%',
      //     m: '10%',
      //     y: '10%'
  
      //   }


}
