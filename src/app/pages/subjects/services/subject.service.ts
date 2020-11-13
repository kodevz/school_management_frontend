import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private apiService: ApiService) { }

  listSubjects(params?): Observable<any> {
    return this.apiService.get('api', 'subject', params);

  }
  create(request): Observable<any> {
    return this.apiService.post('api', 'subject', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.put('api', `subject/${id}`, request);
  }

  edit(id): Observable<any> {
    return this.apiService.get('api', `subject/${id}`);
  }
}
