import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/model/product.model';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmMutedDirective } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'product-card',
  imports: [
    RouterLink,
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    CommonModule,
    HlmMutedDirective,
  ],
  templateUrl: './card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();
}
