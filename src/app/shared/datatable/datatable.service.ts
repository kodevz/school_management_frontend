import { HttpClient } from '@angular/common/http';
import { Injectable, QueryList } from '@angular/core';
import { TableState } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { DTPageOptions, ExportOptions } from '../models/dtoptions';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() {}

  public updatePageInfo(target, pagedData: any) {
    target.page.totalElements = pagedData.recordsTotal;
    target.page.pageNumber = !target.page.pageNumber ? 0 : target.page.pageNumber;

  }

  dtColumns(target) {
    return target.columns.filter(col => !col.frozencol)
  }

  onOptionsMerge(target, dtEvent: DTPageOptions) {

    let dtPageOptions = dtEvent;
    let eventOrigin = target.dtPageOptions.eventOrigin;

    dtPageOptions.columns = target.dtPageOptions.columns;
    dtPageOptions.rows = dtEvent.rows ? dtEvent.rows : target.dtPageOptions.rows;
    dtPageOptions.first = target.dtPageOptions.eventOrigin == 'filter' ? 0 : dtEvent.first;
    dtPageOptions.filters = dtEvent.filters;
    dtPageOptions.multiSortMeta = dtEvent.multiSortMeta ? dtEvent.multiSortMeta : target.dtPageOptions.multiSortMeta;
    dtPageOptions.globalFilter = dtEvent.globalFilter ? dtEvent.globalFilter : target.dtPageOptions.globalFilter;
    dtPageOptions.ParamId = dtEvent.ParamId ? dtEvent.ParamId : target.dtPageOptions.ParamId;
    dtPageOptions.eventOrigin = eventOrigin;
    dtPageOptions.stateKey = target.dtPageOptions.stateKey;

    return dtPageOptions;
  }

  updatePageOptions(dtEvent): DTPageOptions {

    let dtPageOptions = dtEvent;

    dtPageOptions.exportOptions = new ExportOptions()
    dtPageOptions.rows = dtEvent.rows;
    dtPageOptions.first = dtEvent.first;
    dtPageOptions.filters = dtEvent.filters;
    dtPageOptions.multiSortMeta = dtEvent.multiSortMeta;
    dtPageOptions.globalFilter = dtEvent.globalFilter;
    dtPageOptions.ParamId = dtEvent.ParamId;
    dtPageOptions.eventOrigin = "";
    return dtPageOptions;
  }

  createLazyLoadMetadata(dtOptions, table: TableState): DTPageOptions {

    let dtPageOptions = dtOptions;

    dtPageOptions.first = table.first;

    dtPageOptions.rows = table.rows

    dtPageOptions.sortField = table.sortField;

    dtPageOptions.sortOrder = table.sortOrder;

    dtPageOptions.filters = { ...dtOptions.filters, ...table.filters };

    dtPageOptions.multiSortMeta = table.multiSortMeta;

    dtPageOptions.globalFilter = table.filters && table.filters['global'] ? table.filters['global'].value : null;

    return dtPageOptions;
  }

}
