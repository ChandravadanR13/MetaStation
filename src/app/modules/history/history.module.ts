import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HistoryRoutingModule } from './history-routing.module';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  declarations: [
    DepositComponent,
    WithdrawComponent,
  ],
  imports: [
    CommonModule,    
    SharedModule,
    FormsModule,
    HistoryRoutingModule,
  ]
})
export class HistoryModule { }
