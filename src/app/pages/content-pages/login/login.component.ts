import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { GlobalService } from 'src/app/shared/global/global.service';
import { NotifyService } from 'src/app/shared/notify/notify.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  accessToken: string = '';
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private api: ApiService,
    private authService: AuthService,
    private global: GlobalService,
    public cookieService: CookieService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    const loginData = this.setLoginJson(this.loginForm.value);
    localStorage.setItem('userName', this.loginForm.get('username').value);
    this.global.setSessionUserName();

    try {
      const { access_token } = await <any>this.api.post('oauth', 'token', loginData).toPromise();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('__STPS__', access_token);
      let now = new Date();
      now.setTime(now.getTime() + (6 * 3600 * 1000));
      this.cookieService.set(`__STPS__`, access_token, now);
      setTimeout(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      }, 400)
      this.getAuthUser();
    } catch ({error}) {
      alert("Login Failed! Username or Password may be incorrect");
    }

  }


  async getAuthUser() {
    const resp = await <any>this.api.get('api', 'getUser', {}, this.api.getHttpHeaders('api')).toPromise();
    localStorage.setItem('userInfo', JSON.stringify(resp));
    this.global.setLoginUser();
  }

  /**
   * Set Login Json Data
   * @param longinData 
   */
  setLoginJson(longinData) {
    let formObject = longinData
    formObject.client_secret = environment.clientSecret
    formObject.grant_type = environment.grantType
    formObject.client_id = environment.clientId
    formObject.scope = ""
    return formObject
  }

}
