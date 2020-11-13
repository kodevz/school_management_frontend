import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { MarkService } from '../services/mark.service';

@Component({
  selector: 'app-manage-marks',
  templateUrl: './manage-marks.component.html',
  styleUrls: ['./manage-marks.component.scss']
})
export class ManageMarksComponent implements OnInit {

  isLinear = false;
  formErrors: any = {};
  exams$: Observable<any>;
  classes$: Observable<any>;
  sections$: Observable<any>;
  subjects$: Observable<any>;
  studentsWithMarks = [];
  manageMarksForm: FormGroup;
  marksForm: FormArray;


  constructor(
    private formBuilder: FormBuilder,
    private markService: MarkService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.manageMarksForm = this.formBuilder.group({
      exam_id: [''],
      class_id: [''],
      section_id: [''],
      subject_id: [''],
      marks: this.formBuilder.array([])
    });

    this.exams$ = this.commonService.getExams();
    this.classes$ = this.commonService.getClass();
  }

  createMarksFormBuilder(): FormGroup {
    return this.formBuilder.group({
      student_master_id: '',
      mark_id: '',
      subject_id: '',
      class_id: '',
      section_id: '',
      exam_id: '',
      mark1: '',
      mark2: '',
      mark3: ''
    });
  }

  async fetchStudentWithMarks(): Promise<void> {
    const params = {
      exam_id: this.manageMarksForm.get('exam_id').value,
      class_id: this.manageMarksForm.get('class_id').value,
      section_id: this.manageMarksForm.get('section_id').value,
      subject_id: this.manageMarksForm.get('subject_id').value
    }
    try {
      const { data } = await this.markService.studentWithMarks(params).toPromise();
      this.studentsWithMarks = data;
      this.marksForm = this.manageMarksForm.get('marks') as FormArray;
      this.studentsWithMarks.map((mark:any, index) => {
        let markfb = this.createMarksFormBuilder();
        markfb.get('subject_id').setValue(params.subject_id);
        markfb.get('class_id').setValue(params.class_id);
        markfb.get('section_id').setValue(params.section_id);
        markfb.get('exam_id').setValue(params.exam_id);
        markfb.get('student_master_id').setValue(mark.id);
        markfb.get('mark_id').setValue(mark.mark_id);
        markfb.get('mark1').setValue(mark.mark1);
        markfb.get('mark2').setValue(mark.mark2);
        markfb.get('mark3').setValue(mark.mark3);
        this.marksForm.push(markfb);
      });
    } catch ({ error }) {

    }
  }

  async saveMarks(): Promise<void> {
    try {
      const {success, message} = await this.markService.saveMarks(this.manageMarksForm.value).toPromise();
      if (success) {
        alert(message);
        this.fetchStudentWithMarks();
      }
    } catch ({error}) {
      
    }
  }

  async updateMarks(): Promise<void> {

  }

  reset(): void {
    this.manageMarksForm.reset();
  }

  onChangeClass(event): void {
    const params = { class_id: event.value };
    this.sections$ = this.commonService.getSection(params);
    this.subjects$ = this.commonService.getSubjects(params);
  }

}
