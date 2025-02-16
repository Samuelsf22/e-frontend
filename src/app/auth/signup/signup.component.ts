import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninComponent } from '@auth/signin/signin.component';
import { User } from '@shared/model/user.model';
import { AuthService } from '@shared/service/auth.service';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@spartan-ng/brain/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'signup',
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmInputDirective,
    HlmButtonDirective,
  ],
  templateUrl: './signup.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class SignupComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  form = this._formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    image_url: [''],
  });

  signUpMutation = injectMutation(() => ({
    mutationFn: (user: User) => lastValueFrom(this.authService.SignUp(user)),
    onSuccess: () => {
      this.router.navigate(['/']);
      this.openSignInComponent();
    },
  }));

  onSubmitSignUp = () => {
    if (this.form.valid) {
      this.signUpMutation.mutate({
        first_name: this.form.value.first_name!,
        last_name: this.form.value.last_name!,
        email: this.form.value.email!,
        username: this.form.value.username!,
        password: this.form.value.password!,
        address: this.form.value.address!,
        image_url: this.form.value.image_url || '',
      });
    } else {
      this.form.markAllAsTouched();
    }
  };

  private readonly _hlmDialogService = inject(HlmDialogService);

  public openSignInComponent() {
    this._hlmDialogService.open(SigninComponent);
  }
}
