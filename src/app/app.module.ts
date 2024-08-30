import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CarouselModule } from 'primeng/carousel';
import { ApplicationComponent } from './pages/application/application.component';
import { CalendarModule } from 'primeng/calendar';
import { SplitterModule } from 'primeng/splitter';
import {SidebarModule} from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { SubmainpanelModule } from './modules/submainpanel/submainpanel.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';
import { WalletService } from './Services/wallet.service';
import {ProgressBarModule} from "angular-progress-bar"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplicationComponent,  
 ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    PanelModule,
    PanelMenuModule,
    CarouselModule,
    CalendarModule,
    SplitterModule,
    SidebarModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    CardModule,
    InputNumberModule,
    ChipModule,
    SubmainpanelModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    ToastrModule.forRoot({
      timeOut: 5000,
     progressBar: true,
     progressAnimation: "increasing",
     preventDuplicates: true
    }), // ToastrModule added
 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true,
      
    },
    WalletService,
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
