import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(token: string) {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }
}
