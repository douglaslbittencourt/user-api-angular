import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/model/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('admin:admin')})
};

const apiUrl = "/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(apiUrl, httpOptions)
      .pipe(
        tap(user => console.log('read the users')),
        catchError(this.handleError('getUser', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o usuario id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser(user): Observable<Object> {
    return this.http.put<User>(apiUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`alterou o usuario com w/ id=${user.id}`)),
      catchError(this.handleError<User>('updateUser'))
    );
  } 

  addUser(user): Observable<Object> {
    return this.http.post<User>(apiUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`adicionou o usuario com w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  } 

  deleteUser(id : String): Observable<Object> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o usuario com id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}