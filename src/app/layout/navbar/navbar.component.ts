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
@Component({
  selector: 'e-navbar',
  imports: [
    ThemeToggleComponent,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private readonly _hlmDialogService = inject(HlmDialogService);

  isSignedIn: boolean = this.authService.isAuthenticated();

  public openSignInComponent() {
    this._hlmDialogService.open(SigninComponent);
  }
}
