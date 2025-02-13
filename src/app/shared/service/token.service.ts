import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  router: Router = inject(Router);

  setToken(token: string): void {
    localStorage.setItem('AuthToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('AuthToken');
  }

  logOut(): void {
    localStorage.removeItem('AuthToken');
    this.router.navigate(['/']);
  }
}
