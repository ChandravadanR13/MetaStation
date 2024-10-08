import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-maincompo',
  templateUrl: './fund-maincompo.component.html',
  styleUrls: ['./fund-maincompo.component.scss']
})
export class FundMaincompoComponent {
  totalRecords = 10;
  first = 0;
  last = 10;
  summury: any = [];
  commonOptions: any = [];
  constructor(private router: Router) {

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
    this.summury = [
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },{
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
      {
        id: '1000',
        code: 'f230fh0g3',
        assetName: 'Aave lendin',
        description: 'Product Description',
        symbol: 'bamboo-watch.jpg',
        percentage: 65,
        category: 'Accessories',
        value: '550,861.68',
        inventoryStatus: 'INSTOCK',
        amount: '555,861.6829',
        balance: '84000',
        market: 'Spot',
        telegramusername: 'Jitendra Sharma',
        // Broker: ,
        Assets : 'Polygon',
        Network: 'BSC',
        Subscribercount : '950',
        rank: '11',
        accountCreatedDate: '13/02/22',
        Strategy: 'Manual',
        AvgPerformance: '10 %',
        Access: 'Public',
        kyc: 'Yes',
        Rewards: '15',
        Risks: '2/4',
        Subcriberfess: 'Monthly',
        d:'10%',
        w:'10%',
        m: '10%',
        y: '10%'

      },
    ];
  }
}
