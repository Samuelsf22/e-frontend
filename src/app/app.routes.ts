import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from '@auth/signup/signup.component';
import { AuthenticatedGuard } from '@shared/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthenticatedGuard],
  },
];
