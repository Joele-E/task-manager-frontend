export interface Task {
  id: number;
  user: number;
  createdAt: Date;
  title: string;
  content: string;
  isCompleted: boolean;
  isInProgress: boolean;
}
