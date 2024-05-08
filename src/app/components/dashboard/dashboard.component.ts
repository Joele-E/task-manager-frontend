import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskListComponent } from '../task-list/task-list.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/Task';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, TaskCardComponent, TaskListComponent, DragDropModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // todo = ['CIAO', 'CIAO2', 'CIAO3'];
  // inProgress = ['inProgress2'];
  // done = ['ciao5'];

  todo: Array<Task> = [];
  inProgress: Array<Task> = [];
  done: Array<Task> = [];

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService
      .getTasks()
      .pipe(first())
      .subscribe((tasks) => {
        this.todo = tasks.filter((t) => !t.completed && !t.inProgress);
        this.inProgress = tasks.filter((t) => !t.completed && t.inProgress);
        this.done = tasks.filter(
          (t) => (t.completed && !t.inProgress) || (t.completed && t.inProgress)
        );
      });
  }
  drop(event: CdkDragDrop<Task[]>) {
    const movedItem = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      switch (event.container.id) {
        case 'cdk-drop-list-0':
          this.taskService
            .updateStatus(movedItem.id, TaskStatus.TODO)
            .pipe(first())
            .subscribe();
          break;
        case 'cdk-drop-list-1':
          this.taskService
            .updateStatus(movedItem.id, TaskStatus.IN_PROGRESS)
            .pipe(first())
            .subscribe();
          break;
        case 'cdk-drop-list-2':
          this.taskService
            .updateStatus(movedItem.id, TaskStatus.DONE)
            .pipe(first())
            .subscribe();
          break;
      }
    }
  }
}
