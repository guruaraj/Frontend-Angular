import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import { TodoItem } from "src/models/TodoItem.model";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  formData = TodoItem;
  list: TodoItem[];
  readonly baseUrl ="https://localhost:44397/api"

  constructor(private http : HttpClient) { }

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.baseUrl+'/TodoItems')
    .pipe(
      map((response) => {
      return response;
    }),
    catchError((error) => {
      console.log('Error: ' + error.message);
      return throwError(() => error.message);
    }),
  );
  }

  create(data: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.baseUrl+'/TodoItems', data)
    .pipe(
      map((response) => {
      return response;
    }),
    catchError((error) => {
      console.log('Error: ' + error.error);
      return throwError(() => error.error);
    }),
  );
  }

  update(id: string, data: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(this.baseUrl+'/TodoItems/' + id, data)
    .pipe(
      map((response) => {
        console.log(response);
      return response;
    }),
    catchError((error) => {
      console.log('Error: ' + error.error);
      return throwError(() => error.error);
    }),
  );
  }

  }
