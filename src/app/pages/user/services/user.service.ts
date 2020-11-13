import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  listUsers(params?): Observable<any> {
    return this.apiService.get('api', 'user', params);
  }

  createUser(request): Observable<any> {
    return this.apiService.post('api', 'user', request);
  }

  update(id, request): Observable<any> {
    return this.apiService.post('api', `user/${id}`, request);
  }

  edit(id): Observable<any> {
    return this.apiService.get('api', `user/${id}`);
  }
}
