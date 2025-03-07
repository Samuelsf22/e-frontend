import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@shared/service/api/order.service';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'order-details',
  imports: [
    CommonModule,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
  ],
  templateUrl: './details.component.html',
})
export class OrderDetailComponent {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  publicId = this.route.snapshot.params['public_id'];

  orderDetails = injectQuery(() => ({
    queryKey: ['order', this.publicId],
    queryFn: () =>
      lastValueFrom(this.orderService.getOrderDetails(this.publicId)),
  }));

  computeTotal() {
    return this.orderDetails
      .data()
      ?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
