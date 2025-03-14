import { Routes } from '@angular/router';
import { HomeComponent } from './home/index/home.component';
import { SignupComponent } from '@auth/signup/signup.component';
import { AuthenticatedGuard } from '@shared/guards/authenticated.guard';
import { ProductDetailsComponent } from '@product/details/details.component';
import { CategoryComponent } from '@product/category/category.component';
import { CartComponent } from '@order/cart/cart.component';
import { UserOrdersComponent } from '@order/user-orders/user-orders.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { OrderDetailComponent } from '@order/details/details.component';
import { RoleAdminCheckGuard } from '@shared/guards/role-admin-check.guard';
import { AdminCategoryComponent } from '@admin/category/category.component';
import { AdminProductComponent } from '@admin/product/product.component';

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
    component: ProductDetailsComponent,
  },
  {
    path: 'category/:public_id',
    component: CategoryComponent,
  },
  {
    path: 'orders',
    component: CartComponent,
  },
  {
    path: 'orders/user',
    component: UserOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/:public_id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/:public_id/:is_paid',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/category',
    component: AdminCategoryComponent,
    canActivate: [AuthGuard, RoleAdminCheckGuard],
  },
  {
    path: 'admin/product',
    component: AdminProductComponent,
    canActivate: [AuthGuard, RoleAdminCheckGuard],
  },
];
