import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MenuAction } from './menu.action';
import { MenuComponent } from './menu.component';
import { Topbar } from './topbar';
import { Sidebar } from './sidebar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [
    MenuComponent,
    Topbar,
    Sidebar
  ],
  providers: [
    MenuAction
  ],
})
export class MenuModule { 

}
