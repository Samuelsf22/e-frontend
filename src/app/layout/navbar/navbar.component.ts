import { Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '@/theme-toggle/theme-toggle.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';
import { SigninComponent } from '@auth/signin/signin.component';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';


import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  featherUserCheck,
  featherUserPlus,
  featherUser,
  featherLogOut,
  featherShoppingCart,
  featherChevronDown,
} from '@ng-icons/feather-icons';

import { AuthService } from '@service/auth.service';
import { CategoryService } from '@service/api/category.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { HlmPDirective } from '@spartan-ng/ui-typography-helm';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'e-navbar',
  imports: [
    RouterLink,
    ThemeToggleComponent,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmSpinnerComponent,
    HlmPDirective,
    NgIcon,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  viewProviders: [
    provideIcons({
      featherUserCheck,
      featherUserPlus,
      featherUser,
      featherLogOut,
      featherShoppingCart,
      featherChevronDown,
    }),
  ],
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private readonly _hlmDialogService = inject(HlmDialogService);

  isSignedIn: boolean = this.authService.isAuthenticated();

  public openSignInComponent() {
    this._hlmDialogService.open(SigninComponent);
  }

  public signOut() {
    this.authService.logout();
  }

  categories = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => lastValueFrom(this.categoryService.getCategories()),
  }));
}
