import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  links = ['Manage Classes', 'Second', 'Third'];
  activeLink = this.links[0];
  navLinks = [];
  background: ThemePalette = undefined;

  constructor() { }

  ngOnInit(): void {
    this.navLinks = [
      {
        link: 'manage',
        label: 'Manage Grade'
      },
      {
        link: 'add',
        label: 'Add Grade'
      }
    ]
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }F

}
