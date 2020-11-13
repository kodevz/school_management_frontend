import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private apiService: ApiService) { }

  listGrades(params?): Observable<any> {
    return this.apiService.get('api', 'grade', params);
  }

  create(request): Observable<any> {
    return this.apiService.post('api', 'grade', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.put('api', `grade/${id}`, request);
  }

  edit(id): Observable<any> {
    return this.apiService.get('api', `grade/${id}`);
  }
}
