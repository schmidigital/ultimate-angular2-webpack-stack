import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  title: string = 'Jasis Cupcakelädle';
  api: string = 'https://backend.jasis.schmid.digital';
  mailer: string = 'https://mailer.schmid.digital';
}