import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMoreVertical } from '@ng-icons/feather-icons';
import { CategoryService } from '@shared/service/api/category.service';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';
import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

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
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmButtonDirective,
    NgIcon,
  ],
  templateUrl: './category.component.html',
  providers: provideIcons({ featherMoreVertical }),
})
export class AdminCategoryComponent {
  private categoryService = inject(CategoryService);

  categories = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => lastValueFrom(this.categoryService.getCategories()),
  }));
}
