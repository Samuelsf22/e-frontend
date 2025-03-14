import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProduct } from '@shared/model/product.model';
import { CategoryService } from '@shared/service/api/category.service';
import { ProductService } from '@shared/service/api/product.service';
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
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { lastValueFrom } from 'rxjs';

@Component({
  imports: [
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonModule,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmButtonDirective,
    HlmSelectImports,
    BrnSelectImports,
  ],
  templateUrl: './create.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class ProductCreateComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private queryClient = inject(QueryClient);
  private readonly _dialogRef = inject(BrnDialogRef);

  form = this._formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    color: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    featured: [true],
    stock: ['', [Validators.required, Validators.min(1)]],
    image: [null, [Validators.required]],
    category_public_id: ['', [Validators.required]],
  });

  create = injectMutation(() => ({
    mutationFn: (data: { product: CreateProduct, image: File }) =>
      lastValueFrom(this.productService.createProduct(data.product, data.image)),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['products'] });
      this._dialogRef.close();
    },
  }));

  selectedFile!: File | null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit = () => {
    if (this.form.valid) {
      this.create.mutate({
        product: {
          name: this.form.value.name!,
          description: this.form.value.description!,
          brand: this.form.value.brand!,
          color: this.form.value.color!,
          price: Number(this.form.value.price!),
          featured: this.form.value.featured!,
          stock: Number(this.form.value.stock!),
          category_public_id: this.form.value.category_public_id!,
        },
        image: this.selectedFile!,
      });
    } else {
      this.form.markAllAsTouched();
    }
  };

  categories = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => lastValueFrom(this.categoryService.getCategories()),
  }));
}
