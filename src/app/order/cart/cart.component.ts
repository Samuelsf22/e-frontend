import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardTitleDirective,
  HlmCardHeaderDirective,
} from '@spartan-ng/ui-card-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ProductService } from '@shared/service/api/product.service';
import { HlmSpinnerModule } from '@spartan-ng/ui-spinner-helm';
import { HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMinus, featherPlus } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardTitleDirective,
    HlmSpinnerModule,
    HlmPDirective,
    HlmButtonDirective,
    NgIcon,
  ],
  templateUrl: './cart.component.html',
  providers: provideIcons({ featherPlus, featherMinus }),
})
export class CartComponent {
  private productService = inject(ProductService);

  cartQuery = injectQuery(() => ({
    queryKey: ['cart'],
    queryFn: () => this.productService.getCartFromLocalStorage(),
  }));
}
