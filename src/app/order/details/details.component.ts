import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@shared/service/api/order.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
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
    HlmCardFooterDirective,
    HlmButtonDirective,
  ],
  templateUrl: './details.component.html',
})
export class OrderDetailComponent {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private router = inject(Router);

  publicId = this.route.snapshot.params['public_id'];
  isPaid: boolean = this.route.snapshot.params['is_paid'];

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

  payOrder = injectMutation(() => ({
    mutationFn: () =>
      lastValueFrom(this.orderService.markOrderAsPaid(this.publicId)),
    onSuccess: () => {
      this.router.navigate(['/orders', this.publicId]);
    },
  }));

  markOrderAsPaid() {
    this.payOrder.mutate();
  }
}
