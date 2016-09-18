import { Component, OnDestroy, OnInit,
         ComponentRef, ViewChild, ViewContainerRef,
         ComponentFactoryResolver
         } from '@angular/core';
import { Input, animate, state, style, transition, trigger } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { URLSearchParams } from '@angular/http';

import { Subscription } from 'rxjs';
import { ConfigService, PageService } from '../services';

// import { Home, Page } from '../pages';
import { Error, Page } from '../pages';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'pageLoader',
  template: '<div id="content-wrapper"><div #content></div></div>',
  styles: [`
    #content-wrapper { 
      position: relative; 
      min-height: 600px 
    }`
  ],
  animations: [
      trigger('routeAnimation', [
      state('*', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
          style({opacity: 0, transform: 'translateY(-50px)'}),
          animate('0.3s 0.3s ease-in-out',
          style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition('* => void', [
          style({position: 'absolute', top: 0}),
          animate('0.3s ease-in-out',
          style({opacity: 0, transform: 'translateY(-50px)'}))
      ])
      ])
  ]
})

export class PageLoader implements OnInit, OnDestroy {
  pageSubscription: Subscription;
  data: any;
  template: string;
  componentReference: ComponentRef<any>;
  private isViewInitialized = false;

  @ViewChild('content', {read: ViewContainerRef}) content;

  constructor(private ps: PageService,
              public title: Title,
              public config: ConfigService,
              private _route: ActivatedRoute,
              private resolver: ComponentFactoryResolver
              ) {
  }

  ngOnInit () {
    this.isViewInitialized = true;
    let url = '';

    this._route.url.subscribe(value => {
      let urlArray = value.map(val => val['path']);
      url = urlArray.join('/');

      this.pageSubscription = this.ps.getPageBySlug(url).subscribe(
        data => {
          if (data) {
            this.data =data;

            if (data.acf.services) {
              data.acf.services.map((item) => {
                item.link = item.link.slice(this.config.api.length);
              });
            }

            this.template = data.acf.template;

            switch (this.template) {
              // case 'home': this.loadComponent(Home); break;
              // case 'page': this.loadComponent(Page); break;
              default: this.loadComponent(Page); break;
            }

            // SEO
            this.title.setTitle(data.post_title + ' - ' + this.config.title);
            this.setMeta('description', 'content', data.acf.meta_description);

          } else {
            this.template = '404';
            this.loadComponent(Error);
            this.title.setTitle('404 - ' + this.config.title);
          }
        }
      );
    });
  }

  ngOnDestroy() {
    if (this.componentReference) {
        this.componentReference.destroy();
    }
    this.pageSubscription.unsubscribe();
  }

  setMeta(metaName: string, metaAttribute: string, metaValue: string): void {
      const el = getDOM().query(`meta[name=${metaName}]`);
      getDOM().setAttribute(el, metaAttribute, metaValue);
  }

  private loadComponent(component: any) {
    if (this.componentReference) {
        this.componentReference.destroy();
    }

    let componentFactory = this.resolver.resolveComponentFactory(component);
    this.componentReference = this.content.createComponent(componentFactory);
    this.componentReference.instance.data = this.data;
  }
}
