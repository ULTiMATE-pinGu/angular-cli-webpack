import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, HeroesComponent, HeroDetailComponent } from './components';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: 'heroes',
    component: HeroesComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [DashboardComponent, HeroesComponent, HeroDetailComponent];
