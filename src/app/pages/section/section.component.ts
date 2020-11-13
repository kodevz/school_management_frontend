import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  activeLink;
  navLinks = [];
  background: ThemePalette = undefined;

  constructor() { }

  ngOnInit(): void {
    this.navLinks = [
      {
        link: 'manage',
        label: 'Manage Section'
      },
      {
        link: 'create',
        label: 'Create Section'
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
