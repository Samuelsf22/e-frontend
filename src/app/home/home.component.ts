import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'page-home',
  imports: [RouterLink, HlmButtonDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
