import { Component, Input } from '@angular/core';

@Component({
  selector: 'Page',
  styles: [ require('./page.scss') ],
  template: require('./page.html')
})
export class Page {
  @Input() data: any;
}
