import { MENU_SERVICE_PROVIDERS } from './menu.service';
import { PAGE_SERVICE_PROVIDERS } from './page.service';
import { SLIDER_SERVICE_PROVIDERS } from './slider.service';

export * from './config.service'
export * from './menu.service'
export * from './page.service'
export * from './slider.service'

export const APP_SERVICE_PROVIDERS = [
  MENU_SERVICE_PROVIDERS,
  PAGE_SERVICE_PROVIDERS,
  SLIDER_SERVICE_PROVIDERS
];