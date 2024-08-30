import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ManageUserProfileComponent } from './manage-user-profile/manage-user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper'; 


@NgModule({
  declarations: [
    ManageUserProfileComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule 
  ]
})
export class UserProfileModule { }
