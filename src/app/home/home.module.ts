import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { TurboNotifyPopup } from 'turbo-notify-popup';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeStatusComponent } from './home-status/home-status.component';
import { HomeBookingComponent } from './home-booking/home-booking.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HomeStatusComponent,
    HomeBookingComponent
  ]
})
export class HomeModule { }
