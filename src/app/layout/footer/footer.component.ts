import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherGithub } from '@ng-icons/feather-icons';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'e-footer',
  imports: [NgIcon, HlmButtonDirective],
  templateUrl: './footer.component.html',
  viewProviders: [provideIcons({ featherGithub })],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
