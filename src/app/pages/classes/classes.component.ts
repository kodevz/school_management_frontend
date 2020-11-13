import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  links = ['Manage Classes', 'Second', 'Third'];
  activeLink = this.links[0];
  navLinks = [];
  background: ThemePalette = undefined;

  constructor() { }

  ngOnInit(): void {
    this.navLinks = [
      {
        link: 'manage',
        label: 'Manage Classes'
      },
      {
        link: 'create',
        label: 'Create Classes'
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
