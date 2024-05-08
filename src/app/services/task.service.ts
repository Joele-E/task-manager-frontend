import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl: string = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.apiUrl}`);
  }
  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, task);
  }

  updateStatus(id: number, status: TaskStatus): Observable<Task> {
    switch (status) {
      case TaskStatus.IN_PROGRESS:
        return this.http.patch<Task>(`${this.apiUrl}/${id}`, {
          inProgress: true,
          completed: false,
        });

      case TaskStatus.TODO:
        return this.http.patch<Task>(`${this.apiUrl}/${id}`, {
          inProgress: false,
          completed: false,
        });
      case TaskStatus.DONE:
        return this.http.patch<Task>(`${this.apiUrl}/${id}`, {
          inProgress: false,
          completed: true,
        });
    }
  }
}
