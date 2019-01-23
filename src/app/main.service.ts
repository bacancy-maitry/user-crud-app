import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataInterface } from './user-data-interface';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  dataUrl = "https://reqres.in/";

  constructor(private http: HttpClient) { }

  getUserList(pageNo): Observable<UserDataInterface>{
    return this.http.get<UserDataInterface>(this.dataUrl + "api/users?page=" + pageNo);
  }
}
