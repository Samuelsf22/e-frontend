import { Component } from '@angular/core';
import { ThemeToggleComponent } from '@/theme-toggle/theme-toggle.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,

} from '@spartan-ng/ui-menu-helm';

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
export class NavbarComponent {}
