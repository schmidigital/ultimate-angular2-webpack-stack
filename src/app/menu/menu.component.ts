import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MenuAction } from './menu.action';

@Component({
  moduleId: module.id,
  selector: 'sd-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.style.scss']
})
export class MenuComponent implements OnInit {
  isOpen$: Observable<any>;

  constructor(
    public store: Store<any>,
    private menuAction: MenuAction
    ) {
    // appState.subscribe('menu.collapsed', collapsed => this.menuOpen = !collapsed);
  }

  ngOnInit() {
    this.isOpen$ = this.store.select(state => state.menu.isOpen);

    this.store.dispatch(this.menuAction.openMenu());
  }

  closeMenu() {
    this.store.dispatch(this.menuAction.closeMenu());
  }
}