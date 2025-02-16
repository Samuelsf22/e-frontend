import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly router = inject(Router);
  private readonly TOKEN_KEY = 'auth-token';

  private get isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  logOut(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      window.location.reload();
    }
  }
}
