import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserNewComponent } from './user/user-new/user-new.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'user-new', component: UserNewComponent, canActivate: [AuthGuard]},
    { path: 'user-new/:id', component: UserNewComponent, canActivate: [AuthGuard]},
    { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES)
