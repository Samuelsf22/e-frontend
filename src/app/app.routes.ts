import { Routes } from '@angular/router';
import { HomeComponent } from './home/index/home.component';
import { SignupComponent } from '@auth/signup/signup.component';
import { AuthenticatedGuard } from '@shared/guards/authenticated.guard';
import { ProductDetailsComponent } from '@product/details/details.component';

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
  { 
    path: 'product/:public_id',
    component: ProductDetailsComponent
  },
  
];
