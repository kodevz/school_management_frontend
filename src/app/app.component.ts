import { Component } from '@angular/core';
import { GlobalService } from './shared/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'school-management-app';

  constructor(globalService: GlobalService) {
    setTimeout(() => {
      globalService.setLoginUser();
    },500);
  }
}
