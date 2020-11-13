import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private apiService: ApiService) { }

  listSections(params?): Observable<any> {
    return this.apiService.get('api', 'section', params);
  }

  create(request): Observable<any> {
    return this.apiService.post('api', 'section', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.put('api', `section/${id}`, request);
  }

  edit(id): Observable<any> {
    return this.apiService.get('api', `section/${id}`);
  }
}
