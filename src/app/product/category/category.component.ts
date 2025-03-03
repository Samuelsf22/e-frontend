import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@product/card/card.component';
import { CategoryService } from '@shared/service/api/category.service';
import { ProductService } from '@shared/service/api/product.service';
import {
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardDescriptionDirective,
  HlmCardContentDirective,
  HlmCardDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'category',
  imports: [
    HlmCardDirective,
    HlmCardContentDirective,
    HlmSpinnerComponent,
    HlmPDirective,
    ProductCardComponent,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
  ],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  
  private readonly publicId = this.route.snapshot.params['public_id'] || '';
  
  category = injectQuery(() => ({
    queryKey: ['category', this.publicId],
    queryFn: () => 
      lastValueFrom(this.categoryService.getCategoryByPublicId(this.publicId)),
  }));

  products = injectQuery(() => ({
    queryKey: ['products', this.publicId],
    queryFn: () =>
      lastValueFrom(this.productService.getProductsByCategory(this.publicId)),
  }));
}
