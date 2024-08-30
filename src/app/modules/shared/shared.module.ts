import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { TabViewModule }  from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { MenuModule } from 'primeng/menu';
import { CarouselModule } from 'primeng/carousel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CollapsableComponent } from './components/collapsable/collapsable.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { NgOtpInputModule } from 'ng-otp-input';
import { ListboxModule } from 'primeng/listbox';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent,
    CommonTableComponent,
    CollapsableComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    ChartModule,
    CalendarModule,
    MultiSelectModule,
    ProgressBarModule,
    MenuModule,
    CarouselModule,
    InputSwitchModule,
    CheckboxModule,
    AccordionModule,
    ButtonModule,
    DialogModule,
    RadioButtonModule,
    InputTextareaModule,
    FormsModule,
    OverlayPanelModule,
    ScrollPanelModule,
    MessagesModule,
    ToastModule,
    StepsModule,
    NgOtpInputModule,
    ListboxModule,
    ReactiveFormsModule
  ],
  exports: [
    SideBarComponent,
    HeaderComponent,
    CommonTableComponent,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    ChartModule,
    TabViewModule,
    CalendarModule,
    MultiSelectModule,
    TableModule,
    ProgressBarModule,
    MenuModule,
    CarouselModule,
    PanelMenuModule,
    InputSwitchModule,
    CheckboxModule,
    AccordionModule,
    ButtonModule,
    DialogModule,
    RadioButtonModule,
    InputTextareaModule,
    FormsModule,
    OverlayPanelModule,
    ScrollPanelModule,
    CollapsableComponent,
    MessagesModule,
    ToastModule,
    StepsModule,
    NgOtpInputModule,
    ListboxModule
  ]
})
export class SharedModule { }
