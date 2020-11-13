import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private apiService: ApiService) { }

  getClass(): Observable<any> {
    return this.apiService.get('api', 'select2Classes');
  }

  getSection(request?): Observable<any> {
    return this.apiService.get('api', 'select2Sections', request);
  }

  getParent(): Observable<any> {
    return this.apiService.get('api', 'select2Parents');
  }

  getCity(): Observable<any> {
    return this.apiService.get('api', 'select2City');
  }

  getClassType(): Observable<any> {
    return this.apiService.get('api', 'select2ClassTypes');
  }
  
  getStaffs(): Observable<any> {
    return this.apiService.get('api', 'select2Staffs');
  }

  getRemarks(): Observable<any> {
    return this.apiService.get('api', 'select2GradeRemarks');
  }

  getExams(): Observable<any> {
    return this.apiService.get('api', 'select2Exams');
  }

  getSubjects(request?): Observable<any> {
    return this.apiService.get('api', 'select2Subjects', request);
  }
}
