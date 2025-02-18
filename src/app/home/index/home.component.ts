import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedComponent } from '@home/featured/featured.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'page-home',
  imports: [RouterLink, HlmButtonDirective, FeaturedComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
