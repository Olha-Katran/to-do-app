export interface Task {
    id: string;
    text: string;
    completed: boolean;
    description?: string;
  }

export interface TaskList {
    id: string;
    name: string;
    tasks: Task[];
    userId: string;
  }
