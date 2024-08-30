import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/Services/wallet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  totalRecords = 10;
  first = 0;
  last = 10;
  withdraw: any = [];

  constructor(private router: Router,private walletService: WalletService) {

  }

  ngOnInit(){

    this.Withdraw();
  }
  Withdraw() {
    this.walletService.withdrawHistory(localStorage.getItem('selectedAccountId')).subscribe(
      (data: any) => {
        if (Array.isArray(data.result)) {
          this.withdraw = data.result;
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

}
