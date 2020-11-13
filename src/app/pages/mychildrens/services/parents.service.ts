import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {

  constructor(private apiService: ApiService) { }

  listChildrens(params?): Observable<any> {
    return this.apiService.get('api', 'student', params);
  }
}
