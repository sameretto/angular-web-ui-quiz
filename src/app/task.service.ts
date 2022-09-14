import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiRoute = 'api/v1/task/';
  private _taskSource = new BehaviorSubject<Task[]>([
    {
      id: 0,
      task: 'string',
      description: 'string',
      status: 0,
      createdAt: '2022-09-13T20:54:04.791Z',
      updatedAt: '2022-09-13T20:54:04.791Z',
    },
  ]);
  // we do take(1) to make sure we only get the latest value to immitate a http request
  // http requests close after they return a value
  task$ = this._taskSource.asObservable().pipe(take(1));

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    // return this.http.get(this.apiRoute);
    return this.task$;
  }

  createTask(task: Task): Observable<Task[]> {
    // return this.http.post(this.apiRoute, {});
    this._taskSource.next([...this._taskSource.value, task]);
    return this.task$;
  }

  deleteTask(id: number): Observable<Task[]> {
    // return this.http.delete(this.apiRoute + id);
    this._taskSource.next([
      ...this._taskSource.value.filter((t) => t.id !== id),
    ]);
    return this.task$;
  }

  updateTask(task: Task): Observable<Task[]> {
    // return this.http.put(this.apiRoute + task.id, task);
    const taskIndexoldTask = this._taskSource.value.findIndex(
      (t) => t.id === task.id
    );
    if (taskIndexoldTask !== -1) {
      this._taskSource.value[taskIndexoldTask] = task;
    }
    this._taskSource.next([...this._taskSource.value]);
    return this.task$;
  }
}
