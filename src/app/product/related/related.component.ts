import { Component, inject, Input } from '@angular/core';
import { ProductCardComponent } from '@product/card/card.component';
import { ProductService } from '@shared/service/api/product.service';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'related-products',
  imports: [
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDirective,
    HlmSpinnerComponent,
    HlmPDirective,
    ProductCardComponent,
  ],
  templateUrl: './related.component.html',
})
export class RelatedComponent {
  @Input() publicId!: string;
  private productService = inject(ProductService);

  relatedQuery = injectQuery(() => ({
    queryKey: ['featuredProducts', this.publicId],
    queryFn: () =>
      lastValueFrom(this.productService.getRelatedProducts(this.publicId)),
  }));
}
