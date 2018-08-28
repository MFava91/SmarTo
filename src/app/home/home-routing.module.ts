import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeStatusComponent } from './home-status/home-status.component';
import { HomeBookingComponent } from './home-booking/home-booking.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', outlet: 'status', component: HomeStatusComponent },
            { path: '', outlet: 'booking', component: HomeBookingComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
