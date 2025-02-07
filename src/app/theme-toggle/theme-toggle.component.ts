import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSun, featherMoon } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  imports: [NgIcon, CommonModule, HlmButtonDirective],
  viewProviders: [provideIcons({ featherSun, featherMoon })],
})
export class ThemeToggleComponent implements OnInit {
  theme: 'light' | 'dark' = 'light';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      const value = document.documentElement.classList.contains('dark');
      this.theme = value ? 'dark' : 'light';
    }
  }

  toggleTheme(): void {
    if (typeof document !== 'undefined') {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      if (this.theme === 'dark') {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
    }
  }
}
