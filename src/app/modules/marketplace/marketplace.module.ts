import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { SharedModule } from '../shared/shared.module';
import { CreateSignalComponent } from './component/create-signal/create-signal.component';
import { FundManagerDetailsComponent } from './component/fund-manager-details/fund-manager-details.component';
import { FundsAddComponent } from './component/funds-add/funds-add.component';
import { CopyTradingComponent } from './component/copy-trading/copy-trading.component';
import { FundMaincompoComponent } from './fund-maincompo/fund-maincompo.component';
import { MainSignleComponent } from './main-signle/main-signle.component';
import { MainTradinglComponent } from './main-tradingl/main-tradingl.component';



@NgModule({
  declarations: [
    MarketplaceComponent,
    CreateSignalComponent,
    FundManagerDetailsComponent,
    FundsAddComponent,
    CopyTradingComponent,
    FundMaincompoComponent,
    MainSignleComponent,
    MainTradinglComponent
  
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MarketplaceModule { }
