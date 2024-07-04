import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guid } from "guid-typescript";
import { TodoItem } from "src/models/TodoItem.model";
import {TodoListService} from "src/app/Shared/todo-list.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  items? : TodoItem[]=[];
  description: string;
  todoItem: TodoItem = new TodoItem();
  ErrorMessage: string = "";
  public constructor( private service: TodoListService) {}

  ngOnInit() {
    this.GetTodoItemList();
  }

  getItems() {
    this.GetTodoItemList();
  }

  handleAdd() {
    
    this.todoItem = new TodoItem();
    this.todoItem.description = this.description;
    this.todoItem.IsCompleted = false;
    this.todoItem.id =Guid.create().toString() ;
    
    
    console.log(this.todoItem);
    this.CreateTodoItem();
    this.GetTodoItemList();
  }

  handleClear() {
    this.description = '';
    this.ErrorMessage=null;
  }

  handleMarkAsComplete(item: TodoItem) {
    item.IsCompleted =true;
    this.UpdateTodoItem(item);
  }

  GetTodoItemList(): void {
    this.service.getAll()
      .subscribe({
        next: (data) => {
          this.items = data;
          console.log(data);
        },
        error: (e) => {this.HandlerError(e)}
      });
  }

  CreateTodoItem(): void {
    try{
    this.service.create(this.todoItem)
      .subscribe({
        next: (data) => {
          this.todoItem = data;
          console.log(data);
          this.GetTodoItemList();
        },
        error: (e) => {this.HandlerError(e)}
      });
    }
    catch (err) {
      this.ErrorMessage = err;
    }
  }

  UpdateTodoItem(item : TodoItem): void {
    this.service.update(item.id,item)
      .subscribe({
        next: (data) => {
          this.todoItem = data;
          console.log(data);
          this.GetTodoItemList();
        },
        error: (e) => {this.HandlerError(e)}
        
      });
  }

  HandlerError( error: any):void{
    this.ErrorMessage = "";
    console.error(error);
    this.ErrorMessage = error;
    
  }

}
