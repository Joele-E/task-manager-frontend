import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { BehaviorSubject, Subscription, first } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    TaskCardComponent,
    TaskListComponent,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  // todo = ['CIAO', 'CIAO2', 'CIAO3'];
  // inProgress = ['inProgress2'];
  // done = ['ciao5'];

  todo: Array<Task> = [];
  inProgress: Array<Task> = [];
  done: Array<Task> = [];
  tasksSub!: Subscription;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.tasksSub = this.taskService.getTasks().pipe(first()).subscribe();
    this.taskService.userTasks.subscribe((tasks) => {
      this.todo = tasks.filter((t) => !t.completed && !t.inProgress);
      this.inProgress = tasks.filter((t) => !t.completed && t.inProgress);
      this.done = tasks.filter(
        (t) => (t.completed && !t.inProgress) || (t.completed && t.inProgress)
      );
    });
  }
  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
  }
  onAddTask() {
    this.dialog.open(AddTaskModalComponent);
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
        case 'lista-todo':
          this.taskService
            .updateStatus(movedItem.id, TaskStatus.TODO)
            .pipe(first())
            .subscribe();
          break;
        case 'lista-inProgress':
          this.taskService
            .updateStatus(movedItem.id, TaskStatus.IN_PROGRESS)
            .pipe(first())
            .subscribe();
          break;
        case 'lista-done':
          this.taskService
            .updateStatus(movedItem.id, TaskStatus.DONE)
            .pipe(first())
            .subscribe();
          break;
      }
    }
  }
}
