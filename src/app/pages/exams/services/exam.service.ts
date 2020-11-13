import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private apiService: ApiService) { }

  listExams(params?): Observable<any> {
    return this.apiService.get('api', 'exam', params);
  }

  create(request): Observable<any> {
    return this.apiService.post('api', 'exam', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.put('api', `exam/${id}`, request);
  }

  edit(id): Observable<any> {
    return this.apiService.get('api', `exam/${id}`);
  }
}
