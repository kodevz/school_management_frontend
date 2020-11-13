import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { DTPageOptions } from 'src/app/shared/models/dtoptions';
import { SectionService } from '../../section/services/section.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.scss']
})
export class ManageSubjectComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  @ViewChild('manageSubjectTable', { static: false }) private _manageSubjectTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();

  constructor(
    public datatableService: DatatableService,
    private subjectService: SubjectService
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
  }

  initSubjects(event: LazyLoadEvent): void {
    const params = { page: event.first + 1 };
    this.subjectService.listSubjects(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total;
    });
  }

  reload(): void {
    this._manageSubjectTable.reset();
  }

}
