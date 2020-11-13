import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  activeLink;
  navLinks = [];
  background: ThemePalette = undefined;

  constructor() { }

  ngOnInit(): void {
    this.navLinks = [
      {
        link: 'manage',
        label: 'Manage Exams'
      },
      {
        link: 'add',
        label: 'Add Exam'
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
