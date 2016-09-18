import { Component, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuAction } from '../menu.action';
import { ConfigService } from '../../services/config.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component ({
  selector: 'sd-topbar',
  template: require('./topbar.html'),
  styles: [require('./topbar.scss')],
animations: [
  trigger('slideInOut', [
    state('in', style({opacity: 1, transform: 'translateY(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateY(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 10 ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ])
]
})
export class Topbar {
    navHidden$: Observable<any>;
    menuItems: any[];

    constructor(
      private ms: MenuService,
      public config: ConfigService,
      private store: Store<any>,
      private menuAction: MenuAction
    ) {
      this.navHidden$ = this.store.select(state => state.menu.isOpen);

      ms.getMenu('primary', '').subscribe(
        menu => {
          menu.items.map(function(item) {
            let endpointLength = config.api.length;
            let urlLength = item.url.length;
            item.url = item.url.substr(endpointLength,urlLength);
            return item;
          })
          this.menuItems = menu.items;
        }
      );
     }

     ngOnInit() {
      let scrolling = false;

      // Auto Hide Header
      // Observable.fromEvent(window, "scroll")
      //   .subscribe((event) => {
      //       scrolling = true;
      //       (!window.requestAnimationFrame)
      //         ? setTimeout(autoHideHeader, 250)
      //         : requestAnimationFrame(autoHideHeader);
      //   });
     }

    toggleMenu() {
      this.store.dispatch(this.menuAction.toggleMenu());
    }
}
