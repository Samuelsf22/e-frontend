import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@product/card/card.component';
import { ProductService } from '@shared/service/api/product.service';
import { HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/ui-card-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'featured',
  imports: [
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmSpinnerComponent,
    HlmPDirective,
    ProductCardComponent,
  ],
  templateUrl: './featured.component.html',
})
export class FeaturedComponent {
  private productService = inject(ProductService)

  featuredProducts = injectQuery(() => ({
    queryKey: ['featuredProducts'],
    queryFn: () => lastValueFrom(this.productService.getFeaturedProducts()),
  }))
}
