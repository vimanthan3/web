import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(protected http: HttpClient) { }

  get() {
    return this.http.get(`http://localhost:3000/profile`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
