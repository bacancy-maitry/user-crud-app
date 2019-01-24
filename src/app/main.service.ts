import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserDataInterface } from './user-data-interface';
import { HttpJsonParseError } from '@angular/common/http/src/response';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  dataUrl = "https://reqres.in/";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpJsonParseError){
    let errorMessage = "Please Check Internet Connection...";
    return throwError(errorMessage);
  }

  getUserList(pageNo): Observable<UserDataInterface>{
    return this.http.get<UserDataInterface>(this.dataUrl + "api/users?page=" + pageNo)
      .pipe(
        catchError(this.handleError)
      );
  }
  
}
