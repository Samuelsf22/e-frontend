import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherTrash2 } from '@ng-icons/feather-icons';
import { CategoryService } from '@shared/service/api/category.service';
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
import { CategoryCreateComponent } from './create/create.component';

@Component({
  selector: 'admin-category',
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
  ],
  templateUrl: './category.component.html',
  providers: provideIcons({ featherTrash2 }),
})
export class AdminCategoryComponent {
  private categoryService = inject(CategoryService);
  private readonly _hlmDialogService = inject(HlmDialogService);

  categories = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => lastValueFrom(this.categoryService.getCategories()),
  }));

  openCategoryCreate = () => {
    this._hlmDialogService.open(CategoryCreateComponent);
  };

  delete = injectMutation(() => ({
    mutationFn: (public_id: string) =>
      lastValueFrom(this.categoryService.delete(public_id)),
    onSuccess: () => {
      this.categories.refetch();
    },
  }));

  onDelete = (public_id: string) => {
    this.delete.mutate(public_id);
  };
}
