/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: Webpack', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent]
    });
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should have as title \'app works!\'',
    inject([AppComponent], (app: AppComponent) => {
      expect(app.title).toEqual('Tour of Heroes');
    }));
});
