import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable } from 'rxjs/Observable';
import { UserManagerSettings, UserManager, User } from 'oidc-client';

@Injectable()
export class AuthService {

  private apiBase: string = "https://localhost:4001";
  private manager = new UserManager(getClientSettings());
  user: User | null;

  constructor(private http: HttpClient) { 
    this.manager.getUser().then(user => this.user = user);
  }

  register(userData: Register): Observable<Register> {
    return this.http
      .post<Register>(this.apiBase + "/api/account", userData);
  }

  login() {
    return this.manager.signinRedirect();
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  async completeLogin() {
    this.user = await this.manager.signinRedirectCallback();
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

}

export function getClientSettings(): UserManagerSettings {
  return {
      authority: 'https://localhost:4001',
      client_id: 'angular_spa',
      redirect_uri: 'https://localhost:5001/auth-callback/',
      post_logout_redirect_uri: 'https://localhost:5001/',
      response_type:"id_token token",
      scope:"openid profile email api.read",
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true,
      silent_redirect_uri: 'https://localhost:5001/silent-refresh.html'
  };
}
