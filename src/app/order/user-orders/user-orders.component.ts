import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCreditCard, featherEye } from '@ng-icons/feather-icons';
import { OrderService } from '@shared/service/api/order.service';
import { AuthService } from '@shared/service/auth.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
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
  selector: 'app-user-orders',
  imports: [
    RouterLink,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    NgIcon,
  ],
  templateUrl: './user-orders.component.html',
  providers: provideIcons({ featherEye, featherCreditCard }),
})
export class UserOrdersComponent {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  ordersUser = injectQuery(() => {
    const username = this.authService.getUsername();
    return {
      queryKey: ['orders', username],
      queryFn: () => lastValueFrom(this.orderService.getOrderByUser(username)),
    };
  });
}
