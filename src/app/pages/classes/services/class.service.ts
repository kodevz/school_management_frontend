import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private apiService: ApiService) { }

  listClasses(params?): Observable<any> {
    return this.apiService.get('api', 'class', params);
  }

  create(request): Observable<any> {
    return this.apiService.post('api', 'class', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.put('api', `class/${id}`, request);
  }

  edit(id): Observable<any> {
    return this.apiService.get('api', `class/${id}`);
  }
}
