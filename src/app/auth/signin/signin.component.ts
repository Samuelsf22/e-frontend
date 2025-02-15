import { Component, inject, viewChild } from '@angular/core';
import { AuthService } from '@service/auth.service';

import { ReactiveFormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';

import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@spartan-ng/brain/forms';
import {
  BrnDialogCloseDirective,
  BrnDialogComponent,
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';

import { FormBuilder, Validators } from '@angular/forms';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Login } from '@shared/model/user.model';
import { lastValueFrom } from 'rxjs';
import { HlmPDirective } from '@spartan-ng/ui-typography-helm';

@Component({
  selector: 'signin',
  imports: [
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonModule,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmButtonDirective,
    HlmPDirective,
  ],
  templateUrl: './signin.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class SigninComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  public viewchildDialogRef = viewChild(BrnDialogComponent);

  closeDialog() {
    this.viewchildDialogRef()?.close({});
  }

  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  loginMutation = injectMutation(() => ({
    mutationFn: (login: Login) => lastValueFrom(this.authService.SignIn(login)),
    onSuccess: () => {
      this.closeDialog();
    },
  }));

  onSubmitLogin = () => {
    if (this.form.valid) {
      this.loginMutation.mutate({
        email: this.form.value.email!,
        password: this.form.value.password!,
      });
    } else {
      this.form.markAllAsTouched();
    }
  };
}
