import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AccSummaryComponent } from './components/acc-summary/acc-summary.component';
import { SummaryclickComponent } from './components/summaryclick/summaryclick.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    
  },
  {
    path: 'account-summury',
    component: AccSummaryComponent
  },
  {
    path: 'summaryclick',
    component: SummaryclickComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
