import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private apiService: ApiService) { }

  create(request): Observable<any> {
    return this.apiService.post('api', 'mark', request);
  }

  saveMarks(request): Observable<any> {
    return this.apiService.post('api', 'mark', request);
  }

  listStudents(request): Observable<any> {
    return this.apiService.post('api', 'marks', request);
  }

  studentWithMarks(request?): Observable<any> {
    return this.apiService.get('api', 'studentWithMarks', request);
  }

  viewMarkSheetByExam(request?): Observable<any> {
    return this.apiService.get('api', 'viewMarksheet', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.put('api', `mark/${id}`, request);
  }

  edit(id): Observable<any> {
    return this.apiService.get('api', `mark/${id}`);
  }
}
