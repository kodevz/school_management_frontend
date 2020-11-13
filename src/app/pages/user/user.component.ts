import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  activeLink;
  navLinks = [];
  background: ThemePalette = undefined;
  expand = true;

  constructor() { }

  ngOnInit(): void {
    this.navLinks = [
      {
        link: 'manage',
        label: 'Manage User'
      },
      {
        link: 'create',
        label: 'Create User'
      }
    ];
    this.activeLink = this.navLinks[0].label;
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.navLinks.push(`Link ${this.navLinks.length + 1}`);
  }

}
