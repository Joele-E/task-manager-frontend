import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/Task';
import { first, never } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task: Task = {
    id: 0,
    user: 0,
    createdAt: new Date(Date.now()),
    title: '',
    content: '',
    completed: false,
    inProgress: false,
  };

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  onDelete(id: number) {
    this.taskService.deleteTask(id).pipe(first()).subscribe();
  }
  openDialog(task: Task) {
    this.dialog.open(TaskModalComponent, {
      panelClass: 'my-dialog',
      data: {
        task,
      },
    });
  }
}
