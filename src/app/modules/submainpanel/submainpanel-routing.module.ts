import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmainpanelComponent } from './pages/submainpanel/submainpanel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'BTC_USDT', 
    //component: SubmainpanelComponent,
    pathMatch: 'full',
},
{
  path: ':symbol', // Define a parameterized route
  component: SubmainpanelComponent, // Your component that handles the route
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmainpanelRoutingModule { }
