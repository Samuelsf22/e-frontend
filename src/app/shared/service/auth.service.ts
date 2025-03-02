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

  SignUp = (user: UserRequest): Observable<JwtToken> => {
    return this.httpClient.post<JwtToken>(`${environment.apiUrl}/auth/create`, user)
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
}
