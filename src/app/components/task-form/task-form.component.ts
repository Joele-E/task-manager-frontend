import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { MatInputModule } from '@angular/material/input';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCommonModule,
    MatInputModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  taskForm = this.fb.group({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    content: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(320)],
      nonNullable: true,
    }),
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('object');
      this.taskService
        .addTask(this.taskForm.value)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
    }
  }
}
