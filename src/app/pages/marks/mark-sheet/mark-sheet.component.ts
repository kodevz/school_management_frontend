import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { MarkService } from '../services/mark.service';

@Component({
  selector: 'app-mark-sheet',
  templateUrl: './mark-sheet.component.html',
  styleUrls: ['./mark-sheet.component.scss']
})
export class MarkSheetComponent implements OnInit {

  isLinear = false;
  formErrors: any = {};
  exams$: Observable<any>;
  classes$: Observable<any>;
  sections$: Observable<any>;
  subjects$: Observable<any>;
  studentsWithMarks = [];
  searchStudents = {
    class_id: '',
    section_id: ''
  };
 


  constructor(
    private markService: MarkService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.classes$ = this.commonService.getClass();
  }

  
  async fetchStudentWithMarks(): Promise<void> {
    try {
      const { data } = await this.markService.studentWithMarks(this.searchStudents).toPromise();
      this.studentsWithMarks = data;
      
    } catch ({ error }) {

    }
  }

  viewMarkSheet(student: any): void {
    this.router.navigate(['marks/view-mark-sheet'], { queryParams: {student_master_id: student.id}});
  }

  reset(): void {
    
  }

  onChangeClass(event): void {
    const params = { class_id: event.value };
    this.sections$ = this.commonService.getSection(params);
  }

}
