import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITodo } from './todo.model';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_TODO, REMOVE_TODO, FETCH_TODO_SUCCESS, TOOGLE_TODO } from './actions';
import { SUCCESS } from '../global-messages/actions';

@Injectable()
export class TodoService {

    private URL = 'https://sleepy-citadel-54178.herokuapp.com/api';

    constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {

    }

    addTodo(todo) {
        this._http.post(this.URL + '/todos', todo).subscribe(todo => {
            this.ngRedux.dispatch({ type: ADD_TODO, todo: todo });
            this.ngRedux.dispatch({ type: SUCCESS, payload: {success: 'Your todo added successfully.'} });
        });
    }

    getTodos() {
        this._http.get(this.URL + '/todos').subscribe(todos => {
            this.ngRedux.dispatch({ type: FETCH_TODO_SUCCESS, todos: todos });
        });
    }

    removeTodo(id) {
        this._http.delete(this.URL + '/todos/' + id).subscribe(todoId => {
            this.ngRedux.dispatch({ type: REMOVE_TODO, todoId: todoId });
        });
    }

    toggleTodo(id, isCompleted, lastUpdated) {
        this._http.patch(this.URL + '/todos/' + id, { 'isCompleted': isCompleted, 'lastUpdated': lastUpdated }).subscribe(todo => {
            this.ngRedux.dispatch({ type: TOOGLE_TODO, todo: todo });
        });
    }
}