/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { configureTests, createRoot, advance, RootComponent, BlankComponent } from '../../helpers/route.provider.helper';
import { HeroService } from '../hero.service';
import { HeroMockService } from '../../helpers/hero.mock.service';
import {
  inject,
  fakeAsync
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('Component: Detail', () => {
  beforeEach(() => {
    configureTests();
  });

  it('should show the details of the hero', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;

        expect(hero.querySelector('h2').innerHTML).toBe('Test Hero 1 details!');
        expect(hero.querySelector('input').value).toBe('Test Hero 1');
        expect(hero.querySelector('span').innerHTML).toBe('0');
      })
  ));

  it('should bind the input value to the name of the hero', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        hero.querySelector('input').value = 'Modified Test Hero';
        advance(f);
        getDOM().dispatchEvent(hero.querySelector('input'), getDOM().createEvent('input'));

        expect(herodetailRef.hero.name).toEqual('Modified Test Hero');
      })
  ));

  it('should call the back on click the button', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'goBack');
        hero.querySelectorAll('button')[0].click();

        expect(herodetailRef.goBack).toHaveBeenCalled();
      })
  ));

  it('should call the save on click the button', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');
        advance(f);
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let hero = f.debugElement.nativeElement;
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'save');
        hero.querySelectorAll('button')[1].click();

        expect(herodetailRef.save).toHaveBeenCalled();
      })
  ));

  it('should save the hero detail', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');
        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'goBack');
        herodetailRef.hero = { id: 0, name: 'Modified Test Hero' };
        herodetailRef.save();
        advance(f);

        expect(herodetailRef.goBack).toHaveBeenCalled();
        expect(herodetailRef.goBack).toHaveBeenCalledWith({ id: 0, name: 'Modified Test Hero' });
      })
  ));

  it('should set the error', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');
        spyOn(mockHeroService, 'save').and.callFake(() => Promise.reject('save fail'));

        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(herodetailRef, 'goBack');
        herodetailRef.hero = { id: 0, name: 'Modified Test Hero' };
        herodetailRef.save();
        advance(f);

        expect(herodetailRef.goBack).not.toHaveBeenCalled();
        expect(herodetailRef.error).toBe('save fail');
      })
  ));

  it('should emit null if no hero added to back', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');

        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        let emittedHero;
        herodetailRef.navigated = false;
        herodetailRef.close.subscribe(hero => emittedHero = hero);
        herodetailRef.goBack();
        advance(f);

        expect(emittedHero).toBeNull();
      })
  ));

  it('should navigate back on back', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');

        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        spyOn(window.history, 'back');
        herodetailRef.goBack();
        advance(f);

        expect(window.history.back).toHaveBeenCalled();
      })
  ));

  it('should emit the hero from the back param', fakeAsync(
    inject([Router, HeroService, Location],
      (router: Router, mockHeroService: HeroService, location: Location) => {
        const f = createRoot(router, RootComponent);

        router.navigateByUrl('/detail/0');

        advance(f);
        expect(location.path()).toEqual('/detail/0');
        let herodetailRef = <HeroDetailComponent>f.debugElement.children[1].componentInstance;
        let emittedHero;
        herodetailRef.navigated = false;
        herodetailRef.close.subscribe(hero => emittedHero = hero);
        herodetailRef.goBack({id: 0, name: 'Test Hero 1'});
        advance(f);

        expect(emittedHero).toEqual({id: 0, name: 'Test Hero 1'});
      })
  ));

});
