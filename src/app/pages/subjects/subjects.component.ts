import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  links = ['Manage Classes', 'Second', 'Third'];
  activeLink = this.links[0];
  navLinks = [];
  background: ThemePalette = undefined;

  constructor() { }

  ngOnInit(): void {
    this.navLinks = [
      {
        link: 'manage',
        label: 'Manage Subject'
      },
      {
        link: 'create',
        label: 'Create Subject'
      }
    ]
  }

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

}
