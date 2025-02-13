import { Component, inject } from '@angular/core';
import { AuthService } from '@service/auth.service';

import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardDescriptionDirective,
} from '@spartan-ng/ui-card-helm';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@spartan-ng/brain/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Login } from '@shared/model/user.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'signin',
  imports: [
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonModule,
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
  ],
  templateUrl: './signin.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class SigninComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  fb = inject(NonNullableFormBuilder);

  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginMutation = injectMutation(() => ({
    mutationFn: (login: Login) => lastValueFrom(this.authService.SignIn(login)),
  }));

  onSubmitLogin = () => {
    this.loginMutation.mutate({
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    });
  };
}
