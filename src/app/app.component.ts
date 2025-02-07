import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeToggleComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'e-frontend';
}
