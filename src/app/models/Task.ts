export interface Task {
  id: number;
  user: number;
  createdAt: Date;
  title: string;
  content: string;
  completed: boolean;
  inProgress: boolean;
}

export enum TaskStatus {
  IN_PROGRESS,
  TODO,
  DONE,
}

export class TaskImpl implements Partial<Task> {
  constructor() {}
}
