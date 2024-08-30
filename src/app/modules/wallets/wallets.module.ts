import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './pages/wallets/wallets.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WalletsComponent
  ],
  imports: [
    CommonModule,
    WalletsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WalletsModule { }
