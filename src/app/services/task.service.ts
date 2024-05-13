import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskImpl, TaskStatus } from '../models/Task';
import { BehaviorSubject, Observable, ReplaySubject, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl: string = 'http://localhost:8080/api/tasks';
  userTasks: ReplaySubject<Array<Task>> = new ReplaySubject();
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.apiUrl}`).pipe(
      map((tasks) => {
        this.userTasks.next(tasks);
        return tasks;
      })
    );
  }
  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, task).pipe(
      map((task) => {
        this.getTasks()
          .pipe(first())
          .subscribe((tasks) => {
            this.userTasks.next(tasks);
          });
        return task;
      })
    );
  }
  deleteTask(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`).pipe(
      map((v) => {
        this.getTasks()
          .pipe(first())
          .subscribe((tasks) => {
            this.userTasks.next(tasks.filter((t) => t.id != id));
          });

        return v;
      })
    );
  }
  updateTask(id: number, body: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, body).pipe(
      map((task) => {
        this.getTasks()
          .pipe(first())
          .subscribe((tasks) => {
            this.userTasks.next(tasks);
          });
        return task;
      })
    );
  }

  updateStatus(id: number, status: TaskStatus): Observable<Task> {
    let params = new HttpParams().set('status', 'true');
    switch (status) {
      case TaskStatus.IN_PROGRESS:
        return this.http.patch<Task>(
          `${this.apiUrl}/${id}`,
          {
            inProgress: true,
            completed: false,
          },
          { params }
        );

      case TaskStatus.TODO:
        return this.http.patch<Task>(
          `${this.apiUrl}/${id}`,
          {
            inProgress: false,
            completed: false,
          },
          { params }
        );
      case TaskStatus.DONE:
        return this.http.patch<Task>(
          `${this.apiUrl}/${id}`,
          {
            inProgress: false,
            completed: true,
          },
          { params }
        );
    }
  }
}
