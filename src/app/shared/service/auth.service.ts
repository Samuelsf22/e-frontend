import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtToken, Login, UserRequest } from '@model/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  tokenService = inject(TokenService);

  SignIn = (login: Login): Observable<JwtToken> => {
    return this.httpClient
      .post<JwtToken>(`${environment.apiUrl}/auth/login`, login)
      .pipe(
        tap((jwtToken) => {
          if (jwtToken.token) {
            this.tokenService.setToken(jwtToken.token);
          }
        })
      );
  };

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }

  private getTokenPayload(): any {
    const token = this.tokenService.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUsername(): string {
    const payload = this.getTokenPayload();
    return payload?.sub || '';
  }

  getRoles(): string[] {
    const payload = this.getTokenPayload();
    return payload?.roles || [];
  }

  SignUp = (user: UserRequest): Observable<JwtToken> => {
    return this.httpClient
      .post<JwtToken>(`${environment.apiUrl}/auth/create`, user)
      .pipe(
        tap((jwtToken) => {
          if (jwtToken.token) {
            this.tokenService.setToken(jwtToken.token);
          }
        })
      );
  };

  logout() {
    this.tokenService.logOut();
  }

  getAuthHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`,
      },
    };
  }
}
