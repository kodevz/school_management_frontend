import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private apiService: ApiService) { }

  listStudents(params?): Observable<any> {
    return this.apiService.get('api', 'student', params);
  }

  create(request): Observable<any> {
    return this.apiService.post('api', 'student', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.post('api', `student/${id}`, request);
  }

  editStudent(id): Observable<any> {
    return this.apiService.get('api', `student/${id}`);
  }
}
