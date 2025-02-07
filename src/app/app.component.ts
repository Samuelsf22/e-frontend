import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonDirective, ThemeToggleComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'e-frontend';
}
