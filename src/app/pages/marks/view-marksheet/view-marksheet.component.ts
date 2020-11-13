import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/common/common.service';
import { GlobalService } from 'src/app/shared/global/global.service';
import { ROLE_STUDENT } from 'src/app/shared/models/constants';
import { MarkService } from '../services/mark.service';

@Component({
  selector: 'app-view-marksheet',
  templateUrl: './view-marksheet.component.html',
  styleUrls: ['./view-marksheet.component.scss']
})
export class ViewMarksheetComponent implements OnInit {

  isLinear = false;
  exams$: Observable<any>;
  markSheetSearch = {
    exam_id: '',
    student_master_id: ''
  };
  studentMarkSheet = [];

  constructor(
    private markService: MarkService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    const userInfo = this.globalService.userInfo();
    this.activatedRoute.queryParams.subscribe(params => {
       this.markSheetSearch.student_master_id = params.student_master_id;
    });

    if (this.globalService.userRole() === ROLE_STUDENT) {
      this.markSheetSearch.student_master_id = userInfo.student.id;
    }
    
    this.exams$ = this.commonService.getExams();
  }

  async viewMarkSheet(): Promise<void> {
    try {
      const { data } = await this.markService.viewMarkSheetByExam(this.markSheetSearch).toPromise();
      console.log(data);
      this.studentMarkSheet = data;
    } catch ({ error }) {}
  }

  printMarkSheet(): void {

  }
}
