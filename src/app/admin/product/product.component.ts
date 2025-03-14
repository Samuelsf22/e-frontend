import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherTrash2 } from '@ng-icons/feather-icons';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
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
import { ProductCreateComponent } from './create/create.component';
import { ProductService } from '@shared/service/api/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-product',
  imports: [
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardDirective,
    HlmButtonDirective,
    NgIcon,
    CommonModule,
  ],
  templateUrl: './product.component.html',
  providers: provideIcons({ featherTrash2 }),
})
export class AdminProductComponent {
  private productService = inject(ProductService);
  private readonly _hlmDialogService = inject(HlmDialogService);

  products = injectQuery(() => ({
    queryKey: ['products'],
    queryFn: () => lastValueFrom(this.productService.getProducts()),
  }));

  openCategoryCreate = () => {
    this._hlmDialogService.open(ProductCreateComponent);
  };

  delete = injectMutation(() => ({
    mutationFn: (public_id: string) =>
      lastValueFrom(this.productService.deleteProduct(public_id)),
    onSuccess: () => {
      this.products.refetch();
    },
  }));

  onDelete = (public_id: string) => {
    this.delete.mutate(public_id);
  };
}
