import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '@shared/service/api/category.service';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@spartan-ng/brain/forms';
import {
  HlmButtonDirective,
  HlmButtonModule,
} from '@spartan-ng/ui-button-helm';
import {
  HlmDialogDescriptionDirective,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'category-create',
  imports: [
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonModule,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmButtonDirective,
  ],
  templateUrl: './create.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class CategoryCreateComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private queryClient = inject(QueryClient);
  private readonly _dialogRef = inject(BrnDialogRef);

  form = this._formBuilder.group({
    name: ['', [Validators.required]],
  });

  create = injectMutation(() => ({
    mutationFn: (name: string) =>
      lastValueFrom(this.categoryService.create(name)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['categories'] });
      this._dialogRef.close();
    },
  }));

  onSubmit = () => {
    if (this.form.valid) {
      this.create.mutate(this.form.value.name!);
    } else {
      this.form.markAllAsTouched();
    }
  };
}
