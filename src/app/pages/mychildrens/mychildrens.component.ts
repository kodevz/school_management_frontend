import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { GlobalService } from 'src/app/shared/global/global.service';
import { DTPageOptions } from 'src/app/shared/models/dtoptions';
import { ParentsService } from './services/parents.service';

@Component({
  selector: 'app-mychildrens',
  templateUrl: './mychildrens.component.html',
  styleUrls: ['./mychildrens.component.scss']
})
export class MychildrensComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  @ViewChild('myChildrensTable', { static: false }) private _myChildrensTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();

  sessionUserId;


  constructor(
    private parentService: ParentsService,
    private globalService: GlobalService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
    this.sessionUserId = this.globalService.userInfo().id;
    console.log(this.sessionUserId);
  }

  initMyChildrens(event: LazyLoadEvent): void {
    const params = { page: event.first + 1, parent_id: this.sessionUserId };
    this.parentService.listChildrens(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total;
    });
  }

  viewMarkSheet(student): void {
    this.router.navigate(['marks/view-mark-sheet'], { queryParams: {student_master_id: student.id}});
  }

  reload(): void {
    this._myChildrensTable.reset();
  }

}
