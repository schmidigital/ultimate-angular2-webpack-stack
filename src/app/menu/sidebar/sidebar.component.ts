import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service'
import { MenuService, MENU_SERVICE_PROVIDERS } from '../../services/menu.service'

@Component ({
  selector: 'sd-sidebar',
  providers: [
    MENU_SERVICE_PROVIDERS
  ],
  template: require('./sidebar.html'),
  styles: [require('./sidebar.scss')]
})

export class Sidebar {
    menu: any;
    menuItems: any[];
    @Output() change = new EventEmitter();

    constructor(private ms: MenuService, public config: ConfigService, 
                private location: Location){
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
}