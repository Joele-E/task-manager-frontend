import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { first } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCommonModule,
    DatePipe,
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  onDelete(id: number) {
    this.taskService
      .deleteTask(id)
      .pipe(first())
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }
  onEdit(task: Task) {
    this.dialog.closeAll();
    this.dialog.open(EditModalComponent, {
      data: {
        task,
      },
    });
  }
}
