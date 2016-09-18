import { Routes, RouterModule } from '@angular/router';
import { PageLoader } from './page-loader';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '**', component: PageLoader },
];
