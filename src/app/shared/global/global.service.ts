import { ChangeDetectorRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { NotifyService } from '../notify/notify.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    


  appName: string;
  sessionUserName: string;
  loginUser: string = '';
  menus: any[];
  isEnableGlobalHttpParams: boolean = true;
  userInfo$:Subject<any> = new Subject<any>();

  constructor(private snakebar: MatSnackBar) {
    this.initGlobalService();
  }

  initGlobalService(): void {
    this.setSessionUserName();
    this.setLoginUser();
    this.setLoginUser();
  }

  setSessionUserName(): string {
    return this.sessionUserName = localStorage.getItem('userName');
  }

  getSessionUserName(): string {
    return this.setSessionUserName();
  }

  setLoginUser(): any {
  
    let userInfo: any = this.userInfo();
   
    
    this.userInfo$.next(userInfo);
    
    if (userInfo) {
      this.loginUser = userInfo.empNo + '-' + userInfo.full_name;
      return this.loginUser
    }
    
    return this.loginUser;
  }

  userInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  userRole() {
    return this.userInfo().roles[0]['name'];
  }

  toastEventPresent() {
    this.snakebar.open('', '', {
      panelClass: ['event-toaster'],
      duration: 10,
    })
  }

  globalHttpPrams() {
    return {
      sessionUserName: this.sessionUserName
    }
  }
}
