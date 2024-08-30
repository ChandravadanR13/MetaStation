import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { CreateSignalComponent } from './component/create-signal/create-signal.component';
import { FundManagerDetailsComponent } from './component/fund-manager-details/fund-manager-details.component';
import { FundsAddComponent } from './component/funds-add/funds-add.component';
import { CopyTradingComponent } from './component/copy-trading/copy-trading.component';
import { FundMaincompoComponent } from './fund-maincompo/fund-maincompo.component';
import { MainSignleComponent } from './main-signle/main-signle.component';
import { MainTradinglComponent } from './main-tradingl/main-tradingl.component';


const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,

  },
  {
    path: 'create-signal',
    component: CreateSignalComponent
  },
  {
    path: 'fund-manager-details',
    component: FundManagerDetailsComponent
  },
  {
    path: 'funds-add',
    component: FundsAddComponent
  },
  {
    path: 'copy-trading',
    component: CopyTradingComponent
  },
  {
    path: 'fundmain',
    component: FundMaincompoComponent
  },
  {
    path: 'main-signle',
    component: MainSignleComponent
  },
  {
    path: 'main-trading',
    component: MainTradinglComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
