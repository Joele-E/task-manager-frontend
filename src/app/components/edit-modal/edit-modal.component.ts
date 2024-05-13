import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../models/Task';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent {
  editTaskForm = this.fb.group({
    title: new FormControl(this.data.task.title, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    content: new FormControl(this.data.task.content, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    if (this.editTaskForm.valid) {
      this.taskService
        .updateTask(this.data.task.id, this.editTaskForm.value)
        .pipe(first())
        .subscribe();
      this.dialog.closeAll();
    }
  }
}
