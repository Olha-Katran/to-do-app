import React from 'react';

import TaskActions from './taskActions';
import { Task } from '../types/types';

type Props = {
    task: Task;
    onDeleteTask: (taskId: string) => void;
    onToggleCompletion: () => void;
};

const TaskItem: React.FC<Props> = ({ task, onDeleteTask, onToggleCompletion }) => (
    <li key={task.id} className="flex items-center justify-between mb-2 p-4 border border-gray-300 rounded-lg">
        <div className="text-left" style={{ width: '80%' }}>
            <span className={`${task.completed ? 'text-gray-400' : ''}`}>
                {task.text}
            </span>
            {task.description && (
                <p className="text-sm text-gray-600 mt-2 break-all">
                    {task.description}
                </p>
            )}
        </div>
        <TaskActions
            taskId={task.id}
            onDeleteTask={onDeleteTask}
            completed={task.completed}
            onToggleCompletion={onToggleCompletion}
        />
    </li>
);

export default TaskItem;
