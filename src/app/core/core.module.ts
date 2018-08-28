import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './api.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
  },
  ]
})
export class CoreModule { }
