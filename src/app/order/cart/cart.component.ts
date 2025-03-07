import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { ProductService } from '@shared/service/api/product.service';
import { HlmSpinnerModule } from '@spartan-ng/ui-spinner-helm';
import { HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  featherMinus,
  featherPlus,
  featherTrash2,
} from '@ng-icons/feather-icons';
import { CartItem } from '@shared/model/product.model';
import { lastValueFrom } from 'rxjs';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { AuthService } from '@shared/service/auth.service';
import { SigninComponent } from '@auth/signin/signin.component';
import { OrderService } from '@shared/service/api/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmSpinnerModule,
    HlmPDirective,
    HlmButtonDirective,
    NgIcon,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
  ],
  templateUrl: './cart.component.html',
  providers: provideIcons({ featherPlus, featherMinus, featherTrash2 }),
})
export class CartComponent {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private readonly _hlmDialogService = inject(HlmDialogService);
  private router = inject(Router);

  cartQuery = injectQuery(() => ({
    queryKey: ['cart'],
    queryFn: () => lastValueFrom(this.productService.getCartDetails()),
  }));

  addQuantityToCart(cart: CartItem) {
    this.productService.addToCart(cart, 'add');
    this.cartQuery.refetch();
  }

  removeQuantityToCart(cart: CartItem) {
    if (cart.quantity! > 0) {
      this.productService.addToCart(cart, 'remove');
      this.cartQuery.refetch();
    }
  }

  remove(public_id: string) {
    this.productService.removeFromCart(public_id);
    this.cartQuery.refetch();
  }

  computeTotal() {
    return this.cartQuery
      .data()
      ?.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity!,
        0
      );
  }

  createOrder = injectMutation(() => ({
    mutationFn: () => {
      return lastValueFrom(
        this.orderService.createOrder({
          username: this.authService.getUsername(),
          products: this.cartQuery.data()!.map((item) => ({
            product_public_id: item.public_id,
            product_name: item.name,
            quantity: item.quantity!,
            price: item.price,
          })),
        })
      );
    },
    onSuccess: () => {
      this.productService.clearCart();
      this.cartQuery.refetch();
      this.router.navigate(['/orders/user']);
    },
  }));
  checkout() {
    if (this.authService.isAuthenticated()) {
      this.createOrder.mutate();        
    } else {
      this._hlmDialogService.open(SigninComponent);
    }
  }
}
