import { Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '@/theme-toggle/theme-toggle.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';
import { SigninComponent } from '@auth/signin/signin.component';
import { AuthService } from '@shared/service/auth.service';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  featherUserCheck,
  featherUserPlus,
  featherUser,
  featherLogOut,
  featherShoppingCart,
} from '@ng-icons/feather-icons';
@Component({
  selector: 'e-navbar',
  imports: [
    ThemeToggleComponent,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
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
    }),
  ],
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private readonly _hlmDialogService = inject(HlmDialogService);

  isSignedIn: boolean = this.authService.isAuthenticated();

  public openSignInComponent() {
    this._hlmDialogService.open(SigninComponent);
  }

  public signOut() {
    this.authService.logout();
  }
}
