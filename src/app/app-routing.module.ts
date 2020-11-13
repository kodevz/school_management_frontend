import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


import { Full_ROUTES } from "./shared/routes/full-layout.routes";
//import { Full_XN_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { LoginGuard } from './shared/auth/login-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
    
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'Full Layout' },
    children: Full_ROUTES,
    canActivate: [AuthGuard]
  },
  {
    path: '', component: ContentLayoutComponent,
    data: { title: 'content Views' }, 
    children: CONTENT_ROUTES,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'pages/error',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }