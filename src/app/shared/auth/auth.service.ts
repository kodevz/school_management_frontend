import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { GlobalService } from '../global/global.service';
import { NotifyService } from '../notify/notify.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken: string = localStorage.getItem('accessToken');

  constructor(
    private api: ApiService,
    private router: Router,
    private notifyService: NotifyService,
    private cookieService: CookieService
  ) { }

  /**
   * Get api token
   */
  getToken() {
    return localStorage.getItem('__STPS__');
  }

  /**
   * Check is User Authentication
   */
  isAuthenticated() {
    return this.getToken() ? true : false
  }

  authDetails() {
    return {
      sessionUserName: localStorage.getItem('userName'),
      role: 'Manager'
    };
  }

  /**
   * Api token logout
   */
  logout() {
    this.cookieService.delete('__STPS__');
    this.router.navigate(['/']);
    localStorage.setItem('__STPS__', '');
    localStorage.setItem('accessToken', '');
  }
}
