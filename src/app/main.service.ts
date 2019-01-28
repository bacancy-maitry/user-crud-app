import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { UserDataInterface, UserData } from './user-data-interface';
import { HttpJsonParseError } from '@angular/common/http/src/response';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private dataUrl = "https://reqres.in/";

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpJsonParseError) {
    let errorMessage = "Please Check Internet Connection...";
    return throwError(errorMessage);
  }

  getUserList(pageNo): Observable<UserDataInterface> {
    return this.httpClient.get<UserDataInterface>(this.dataUrl + "api/users?page=" + pageNo)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserDataById(id): Observable<UserDataInterface> {
    return this.httpClient.get<UserDataInterface>(this.dataUrl + "api/users/" + id);
  }

  deleteUserData(id: UserData | number): Observable<UserData> {
    return this.httpClient.delete<UserData>(this.dataUrl + "api/users/" + id);
  }

  addUserData(user: UserData): Observable<UserData> {
    return this.httpClient.post<UserData>(this.dataUrl + "api/users", user);
  }
}
