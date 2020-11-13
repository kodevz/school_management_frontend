import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';


// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    data: {
      animation: 'dashboard'
    },
    component: DashboardComponent
  },
  {
    path: 'student',
    loadChildren: () => import('src/app/pages/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('src/app/pages/classes/classes.module').then(m => m.ClassesModule)
  },
  {
    path: 'section',
    loadChildren: () => import('src/app/pages/section/section.module').then(m => m.SectionModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('src/app/pages/subjects/subjects.module').then(m => m.SubjectsModule)
  },
  {
    path: 'exams',
    loadChildren: () => import('src/app/pages/exams/exams.module').then(m => m.ExamsModule)
  },
  {
    path: 'grades',
    loadChildren: () => import('src/app/pages/grades/grades.module').then(m => m.GradesModule)
  },
  {
    path: 'marks',
    loadChildren: () => import('src/app/pages/marks/marks.module').then(m => m.MarksModule)
  },
  {
    path: 'childrens',
    loadChildren: () => import('src/app/pages/mychildrens/mychildrens.module').then(m => m.MychildrensModule)
  }
];