import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() title: string = 'DEFAULT';
  tasks = ['CIAO', 'CIAO2', 'CIAO3'];
  constructor() {}

  drop(event: CdkDragDrop<string[]>): void {}
}
