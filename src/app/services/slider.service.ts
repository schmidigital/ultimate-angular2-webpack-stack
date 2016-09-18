import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../services/config.service'

@Injectable()
export class SliderService {
    namespace: string = '/sd/v2';
    route: string = '/pages?url=';

  constructor(private _http: Http, private _cs : ConfigService){;
  }

  getImages(slug: string) {
    return this._http.get(this.buildURL() + slug).map(res =>  res.json());
  } 

  buildSRC(url: String) {
    return url; 
  }

  private buildURL() {
    return this._cs.api + '/wp-json' + this.namespace + this.route;
  }
}

export const SLIDER_SERVICE_PROVIDERS = [
  ConfigService,
  SliderService
];
