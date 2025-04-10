import React from 'react';
import { TaskList } from './../types/types';

type Props = {
    list: TaskList;
    onToggleTaskCompletion: (listId: string, taskId: string) => void;
    onAddTask: (listId: string, taskText: string) => void;
  }

const TaskListItem: React.FC<Props> = ({ list, onToggleTaskCompletion, onAddTask }) => {
    return (
        <li key={list.id} className="p-4 rounded-lg border-2 border-green-700">
            <h2 className="mb-4">
                {list.name}
            </h2>
            <ul>
                {list.tasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between mb-2">
                        <span className={`${task.completed ? 'text-gray-400' : ''}`}>
                            {task.text}
                        </span>
                        <button
                            onClick={() => onToggleTaskCompletion(list.id, task.id)}
                            className={`px-4 py-2 ${task.completed ? 'bg-green-500' : 'bg-gray-500'} rounded-lg`}
                        >
                            {task.completed ? 'Completed' : 'Mark as Complete'}
                        </button>
                    </li>
                ))}
            </ul>
            
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="New task"
                    className="p-3 w-full border border-gray-300 rounded-lg"
                    onKeyDown={(e) => e.key === 'Enter' && onAddTask(list.id, e.currentTarget.value)}
                />
            </div>
    </li>
    )
};

export default TaskListItem;