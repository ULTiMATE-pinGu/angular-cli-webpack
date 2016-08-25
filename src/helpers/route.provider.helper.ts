import {
  Component,
  ComponentResolver,
  Injector, NgModuleFactoryLoader
} from '@angular/core';
import { tick } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { BrowserPlatformLocation } from '@angular/platform-browser';
import {
  ROUTER_DIRECTIVES,
  ActivatedRoute,
  Router,
  RouterConfig,
  RouterOutletMap,
  DefaultUrlSerializer,
  UrlSerializer
} from '@angular/router';
import {
  PlatformLocation,
  Location,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { HeroService } from '../app/hero.service';
import { HeroMockService } from './hero.mock.service'
import { AppComponent } from '../app/app.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { appRoutes } from '../app/app.routing';

export function createRoot(tcb: TestComponentBuilder,
  router: Router,
  type: any): ComponentFixture<any> {
  const f = tcb.createFakeAsync(type);
  advance(f);
  (<any>router).initialNavigation();
  advance(f);
  return f;
}

export function advance(fixture: ComponentFixture<any>): void {
  tick();
  fixture.detectChanges();
}

@Component({
  selector: 'blank-cmp',
  template: ``,
  directives: [ROUTER_DIRECTIVES]
})
export class BlankCmp {
}

@Component({
  selector: 'root-cmp',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES],
  entryComponents: [BlankCmp, DashboardComponent]
})
export class RootCmp {
}

export const routerConfig: RouterConfig = [
  { path: '', component: BlankCmp },
  { path: 'dasboard', component: DashboardComponent }
];

export function routeTestProviders() {
  const heroMockService: HeroMockService = new HeroMockService();

  return [
    RouterOutletMap,
    { provide: UrlSerializer, useClass: DefaultUrlSerializer },
    { provide: Location, useClass: SpyLocation },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: PlatformLocation, useClass: BrowserPlatformLocation },
    {
      provide: Router,
      useFactory: (resolver: ComponentResolver, urlSerializer: UrlSerializer,
        outletMap: RouterOutletMap, location: Location, ngLoader: NgModuleFactoryLoader,
        injector: Injector) => {
        return new Router(
          RootCmp, resolver, urlSerializer, outletMap,
          location, injector, ngLoader, routerConfig);
      },
      deps: [
        ComponentResolver,
        UrlSerializer,
        RouterOutletMap,
        Location,
        Injector
      ]
    },
    {
      provide: ActivatedRoute,
      useFactory: (r: Router) => r.routerState.root, deps: [Router]
    }
  ];
};