import { Component, Output } from '@angular/core';
import { LogoAnimate } from './logo-animate.directive';
import { MenuAction, menuActionType } from '../menu.action';
import { MenuService } from '../../services/menu.service';
import { ConfigService } from '../../services/config.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component ({
  selector: 'sd-topbar',
  template: require('./topbar.html'),
  styles: [require('./topbar.scss')]
})
export class Topbar {
    menuItems: any[];
    constructor(
      private ms: MenuService,
      public config: ConfigService,
      private store: Store<any>,
      private menuAction: MenuAction
    ) {
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
