import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(token: string): void {
    localStorage.setItem('AuthToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('AuthToken');
  }

  logOut(): void {
    localStorage.removeItem('AuthToken');
  }
}
