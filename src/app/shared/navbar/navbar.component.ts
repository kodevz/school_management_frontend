import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavService } from '../nav/nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public navService: NavService) { }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    
  }

}
