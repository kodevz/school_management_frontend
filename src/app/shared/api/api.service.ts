import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ApiHosts } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  _accessToken: string = localStorage.getItem('__STPS__')
  extraParams: any = {
    sessionUserName: '',
    projectId: ''
  }
  isPermission: boolean = false;

  constructor(public http: HttpClient) {}

  get accessToken() {
    return localStorage.getItem('__STPS__')
  }

  set accessToken(token) {
    this._accessToken = token;
  }

  getHttpHeaders(hostStr?: string) {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "enctype": 'multipart/form-data'

    }
    const accessToken = localStorage.getItem('__STPS__')
    if (accessToken && hostStr == 'api') {
      headers['Authorization'] = "Bearer " + accessToken
    }
    return new HttpHeaders(headers)
  }

  /**
   * 
   * @param host 
   * @param endPoint 
   * @param params 
   * @param reqOpts 
   */
  get(hostStr: string, endPoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      }
    }
    
    if (params) {
      const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
      reqOpts.params = new HttpParams({ fromString: queryString })
    }

    reqOpts.headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.accessToken
    });

    const url = ApiHosts[hostStr] + endPoint;
    return this.http.get(url, reqOpts);
  }

  /**
   * 
   * @param host 
   * @param endPoint 
   * @param body 
   * @param reqOpts 
   */
  post(hostStr: string, endPoint: string, body: any, reqOpts?: any) {

    body = { ...body }

    const url = ApiHosts[hostStr] + endPoint;

    reqOpts = {
      headers: this.getHttpHeaders(hostStr)
    }

    return this.http.post(url, body, reqOpts);
  }


  /**
   * 
   * @param host 
   * @param endPoint 
   * @param body 
   * @param reqOpts 
   */
  postOb(hostStr: string, endPoint: string, body: any, reqOpts?: any): Observable<any> {

    body = { ...body }

    const url = ApiHosts[hostStr] + endPoint;
    reqOpts = {
      headers: this.getHttpHeaders(hostStr)
    }

    return this.http.post(url, body, reqOpts);
  }

  guard(component: any) {


    const permission = component.permissionSnapShot.permission;

    if (permission.read && permission.write) {
      this.isPermission = true;
    }
    return this;
  }
  /**
   * 
   * @param host 
   * @param endPoint 
   * @param body 
   * @param reqOpts 
   */
  put(hostStr: string, endPoint: string, body: any, reqOpts?: any) {

    body = { ...body }

    const url = ApiHosts[hostStr] + endPoint;
    reqOpts = {
      headers: this.getHttpHeaders(hostStr)
    }
    return this.http.put(url, body, reqOpts);
  }

  /**
   * 
   * @param host 
   * @param endPoint 
   * @param reqOpts 
   */
  delete(hostStr: string, endPoint: string, reqOpts?: any) {

    reqOpts = {
      headers: this.getHttpHeaders()
    }

    const url = ApiHosts[hostStr] + endPoint;
    return this.http.delete(url, reqOpts);
  }

  /**
   * 
   * @param host 
   * @param endPoint 
   * @param body 
   * @param reqOpts 
   */
  patch(hostStr: string, endPoint: string, body: any, reqOpts?: any) {

    reqOpts = {
      headers: this.getHttpHeaders()
    }
    const url = ApiHosts[hostStr] + endPoint;
    return this.http.patch(url, body, reqOpts)
  }
}
