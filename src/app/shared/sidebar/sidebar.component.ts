import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import { GlobalService } from '../global/global.service';
import { MenuService } from '../menu/menu.service';
import { NavItem } from '../models/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, AfterViewInit {

  display = true;
  isExpanded = true;
  menuItems: NavItem[];
  @ViewChild('drawer', { static: false }) sideNav: MatDrawer;
  constructor(public globalService: GlobalService, public menuService: MenuService, public authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.globalService.userInfo$.subscribe(data => {
        const roleId =  data.roles[0]['id'];
        this.menuItems = this.menuService.getMenus(roleId);
    });
  
  }

  ngAfterViewInit(): void {
    //this.sideNav.toggle(true);
  }
}
