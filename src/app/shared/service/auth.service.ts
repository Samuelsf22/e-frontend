import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtToken, Login } from '@model/user.model';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  SignIn = (login: Login): Observable<JwtToken> => {
    return this.httpClient.post<JwtToken>(`${environment.apiUrl}/auth/login`, login);
  };
}
