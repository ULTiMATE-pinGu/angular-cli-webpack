import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeroActions } from '../actions/hero.actions';
import { AppState, getHero } from '../reducers/index';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  name: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private heroActions: HeroActions) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.store.let(getHero(id))
          .subscribe(hero => {
            this.hero = hero;
            this.name = hero && hero.name ? hero.name : '';
          });
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save(): void {
    let hero = Object.assign({}, this.hero, { name: this.name });
    if (!this.hero.id) {
      this.store.dispatch(this.heroActions.addHero(hero));
    } else {
      this.store.dispatch(this.heroActions.editHero(hero));
    }
    this.goBack(this.hero);
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
}
