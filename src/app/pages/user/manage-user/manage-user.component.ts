import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { DTPageOptions } from 'src/app/shared/models/dtoptions';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  loading: boolean = false;

  totalRecords: number;

  @ViewChild('manageUserTable', { static: false }) private _manageUserTable: Table;

  rows = [];

  dtPageOptions = new DTPageOptions();

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.dtPageOptions.rows = 2;
  }

  initUsers(event: LazyLoadEvent): void {
    const params = { page: event.first + 1 };
    this.userService.listUsers(params).subscribe((resp: any) => {
      this.rows = resp.data;
      this.dtPageOptions.rows = resp.data.length;
      this.totalRecords = resp.total;
    });
  }

  reload(): void {
    this._manageUserTable.reset();
  }

}
