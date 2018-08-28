import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPagesComponent } from './shared/layouts/layout-pages.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutPagesComponent,
        children: [
            {
                path: 'home',
                loadChildren: './home/home.module#HomeModule'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
