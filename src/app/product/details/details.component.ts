import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCheck, featherShoppingCart } from '@ng-icons/feather-icons';
import { RelatedComponent } from '@product/related/related.component';
import { Product } from '@shared/model/product.model';
import { ProductService } from '@shared/service/api/product.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmSpinnerModule } from '@spartan-ng/ui-spinner-helm';
import { HlmH4Directive, HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { interval, lastValueFrom, take } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardTitleDirective,
    HlmH4Directive,
    HlmPDirective,
    HlmSpinnerModule,
    RelatedComponent,
    NgIcon,
  ],
  templateUrl: './details.component.html',
  viewProviders: [provideIcons({ featherShoppingCart, featherCheck })],
})
export class ProductDetailsComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  publicId = this.route.snapshot.params['public_id'];
  lastPublicId = '';

  product = injectQuery(() => ({
    queryKey: ['product', this.publicId],
    queryFn: () =>
      lastValueFrom(this.productService.getProductByPublicId(this.publicId)),
  }));

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.publicId = params['public_id'];
      this.handlePublicIdChange();
    });
  }

  private handlePublicIdChange() {
    if (this.publicId) {
      if (this.lastPublicId !== this.publicId && this.lastPublicId !== '') {
        window.location.reload();
      }
      this.lastPublicId = this.publicId;
    }
  }

  labelAddToCart = 'Add to cart';
  iconAddToCart = 'featherShoppingCart';
  addToCart(productToAdd: Product) {
    const cartItem = {
      public_id: productToAdd.public_id,
      name: productToAdd.name,
      brand: productToAdd.brand,
      price: productToAdd.price,
      picture_url: productToAdd.picture_url,
    };
    this.productService.addToCart(cartItem, 'add');
    this.labelAddToCart = 'Added to cart';
    this.iconAddToCart = 'featherCheck';

    interval(3000)
      .pipe(take(1))
      .subscribe(() => {
        this.labelAddToCart = 'Add to cart';
        this.iconAddToCart = 'featherShoppingCart';
      });
  }
}
