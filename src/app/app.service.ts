import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = 'http://192.168.1.75:9070/api/v1/invoice';
  constructor(protected http: HttpClient) { }

  get() {
    return this.http.get(this.baseUrl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  post(data:any) {
    return this.http.post(this.baseUrl,data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  delete(id:any) {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
