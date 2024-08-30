import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/Services/wallet.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
  totalRecords = 10;
  first = 0;
  last = 10;
  deposit: any = [];

  constructor(private router: Router,private walletService: WalletService) {

  }

  ngOnInit(){

    this.Deposit();
  }
  Deposit() {
    this.walletService.depositHistory(localStorage.getItem('selectedAccountId')).subscribe(
      (data: any) => {
        if (Array.isArray(data.result)) {
          this.deposit = data.result;
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
