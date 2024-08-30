import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
// import { SwiperModule } from 'ngx-swiper-wrapper';

// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// };

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  // providers: [
  //   {
  //     provide: SWIPER_CONFIG,
  //     useValue: DEFAULT_SWIPER_CONFIG
  //   }
  // ]
})
export class HomeModule { }
