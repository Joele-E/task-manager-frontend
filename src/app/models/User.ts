import { Task } from './Task';

export interface User {
  id: number;
  username: string;
  password?: string;
  createdAt: Date;
  tasks: Array<Task>;
}
