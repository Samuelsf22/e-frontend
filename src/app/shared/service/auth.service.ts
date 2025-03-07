import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtToken, Login, User } from '@model/user.model';
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
      .post<JwtToken>(`${environment.authUrl}/login`, login)
      .pipe(
        tap((jwtToken) => {
          if (jwtToken.token) {
            this.tokenService.setToken(jwtToken.token);
            setTimeout(() => {
              this.tokenService.logOut();
            }, 3600 * 1000);
          }
        })
      );
  };

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }

  SignUp = (user: User): Observable<User> => {
    return this.httpClient.post<User>(`${environment.authUrl}/create`, user);
  }

  logout() {
    this.tokenService.logOut();
  }
}
