import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmainpanelRoutingModule } from './submainpanel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SubmainpanelComponent } from './pages/submainpanel/submainpanel.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChipModule } from 'primeng/chip';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SubmainpanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubmainpanelRoutingModule,
    SharedModule,
    NgApexchartsModule,
    InputNumberModule,
    ChipModule,
    SliderModule,
    ToggleButtonModule,
    ReactiveFormsModule
  ]
})
export class SubmainpanelModule { }
