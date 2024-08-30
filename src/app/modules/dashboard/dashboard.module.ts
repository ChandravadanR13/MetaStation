import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SharedModule } from '../shared/shared.module';
import { AccSummaryComponent } from './components/acc-summary/acc-summary.component';
import { BotsComponent } from './components/bots/bots.component';
import { PortfolioManagementComponent } from './components/portfolio-management/portfolio-management.component';
import { AccountComponent } from './components/account/account.component';
import { FormsModule } from '@angular/forms';
import { StaticComponent } from './components/static/static.component';
import { SummaryclickComponent } from './components/summaryclick/summaryclick.component';
import { ChipModule } from 'primeng/chip';


@NgModule({
  declarations: [
    DashboardPageComponent,
    AccSummaryComponent,
    BotsComponent,
    PortfolioManagementComponent,
    AccountComponent,
    StaticComponent,
    SummaryclickComponent
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ChipModule
  ]
})
export class DashboardModule { }
