import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './homecomponent';
import {SubscribeComponent} from './subscribecomponent';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'subscribe', component: SubscribeComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);