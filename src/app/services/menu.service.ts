import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../services/config.service'
import { Location } from '@angular/common'; 

@Injectable()
export class MenuService {
  namespace: string = '/menus/v1';
  route : string = '/menus';
  
  constructor(private _http : Http, private _cs : ConfigService, private location: Location){;
  }
  
  getMenu(slug: string, lang: string) {
    return this._http.get(this.buildURL(lang) + '/' + slug).map(res => res.json());
  }
  
  private buildURL(lang) {
    return this._cs.api + '/' + lang +  '/wp-json' + this.namespace + this.route;
  }
  
}

export const MENU_SERVICE_PROVIDERS = [
  ConfigService,
  MenuService
];