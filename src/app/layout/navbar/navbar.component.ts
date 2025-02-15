import { Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '@/theme-toggle/theme-toggle.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';
import { SigninComponent } from '@auth/signin/signin.component';
import { SignupComponent } from '@auth/signup/signup.component';
import { AuthService } from '@shared/service/auth.service';
@Component({
  selector: 'e-navbar',
  imports: [
    ThemeToggleComponent,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    SigninComponent,
    SignupComponent,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  isSignedIn: boolean = this.authService.isAuthenticated();
}
