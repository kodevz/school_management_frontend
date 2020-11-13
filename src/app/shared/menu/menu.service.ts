import { Injectable } from '@angular/core';
import { NavItem } from '../models/nav-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }


  getMenus(role): NavItem[] {
    switch (role) {
      case 1 || 2:
        return this.getMenusForAdmin();
        break;
      case 3:
        return this.getMenusForTeacher();
        break;
      case 4:
        return this.getMenusForParent();
        break;
      case 5:
        return this.getMenusForStudent();
        break;
      default:
        return this.getMenusForAdmin();
        break;
    }
  }

  getMenusForAdmin(): NavItem[] {
    return  [
      {
        displayName: 'Dashboard',
        iconName: 'home',
        route: '/dashboard',
        permissions: [
          '*'
        ]
      },
      {
        displayName: 'Academic',
        iconName: 'school',
        route: '/dashboard',
        children: [
          {
            displayName: 'Timetable',
            iconName: '',
            route: '/dashboard'
          },
        ]
      },
      {
        displayName: 'Students',
        iconName: 'supervisor_account',
        route: '',
        children: [
          {
            displayName: 'Admission',
            iconName: '',
            route: '/student/admission'
          },
          {
            displayName: 'Student Information',
            iconName: '',
            route: '/student/student-info'
          },
        ]
      },
      {
        displayName: 'Users',
        iconName: 'groups',
        route: '/user'
      },
      {
        displayName: 'Classes',
        iconName: 'class',
        route: '/classes'
      },
      {
        displayName: 'Sections',
        iconName: 'article',
        route: '/section'
      },
      {
        displayName: 'Subjects',
        iconName: 'subject',
        route: '/subjects'
      },
      {
        displayName: 'Grades',
        iconName: 'bookmark',
        route: '/grades'
      },
      {
        displayName: 'Exams',
        iconName: 'library_books',
        route: '',
        children: [
          {
            displayName: 'Exam List',
            iconName: '',
            route: '/exams'
          },
          {
            displayName: 'Marks',
            iconName: '',
            route: '/marks/manage'
          },
          {
            displayName: 'Mark Sheet',
            iconName: '',
            route: '/marks/mark-sheet'
          },
        ]
      },
    ];
  }

  getMenusForTeacher(): NavItem[] {
    return [
      {
        displayName: 'Dashboard',
        iconName: 'home',
        route: '/dashboard',
        permissions: [
          '*'
        ]
      },
      {
        displayName: 'Academic',
        iconName: 'school',
        route: '/dashboard',
        children: [
          {
            displayName: 'Timetable',
            iconName: '',
            route: '/dashboard'
          },
        ]
      },
      {
        displayName: 'Students',
        iconName: 'supervisor_account',
        route: '',
        children: [
          {
            displayName: 'Student Information',
            iconName: '',
            route: '/student/student-info'
          },
        ]
      },
      {
        displayName: 'Exams',
        iconName: 'library_books',
        route: '',
        children: [
          {
            displayName: 'Marks',
            iconName: '',
            route: '/marks/manage'
          },
          {
            displayName: 'Mark Sheet',
            iconName: '',
            route: '/marks/mark-sheet'
          },
        ]
      },
    ]
  }

  getMenusForParent(): NavItem[] {
    return [
      {
        displayName: 'Dashboard',
        iconName: 'home',
        route: '/dashboard',
        permissions: [
          '*'
        ]
      },
      {
        displayName: 'My Childrens',
        iconName: 'groups',
        route: '/childrens'
      }
    ];
  }

  getMenusForStudent(): NavItem[] {
    return [
      {
        displayName: 'Dashboard',
        iconName: 'home',
        route: '/dashboard',
        permissions: [
          '*'
        ]
      },
      {
        displayName: 'Academic',
        iconName: 'school',
        route: '/dashboard',
        children: [
          {
            displayName: 'Timetable',
            iconName: '',
            route: '/dashboard'
          },
        ]
      },
      {
        displayName: 'Exams',
        iconName: 'library_books',
        route: '',
        children: [
          {
            displayName: 'My Mark Sheet',
            iconName: '',
            route: '/marks/view-mark-sheet'
          },
        ]
      },
    ];
  }
}
