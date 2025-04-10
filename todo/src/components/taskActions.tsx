import React from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

type Props = {
    taskId: string;
    onDeleteTask: (taskId: string) => void;
    completed: boolean;
    onToggleCompletion: () => void;
    onUpdateTask: () => void;
};

const TaskActions: React.FC<Props> = ({ 
    taskId,
     onDeleteTask, 
     completed, 
     onToggleCompletion, 
     onUpdateTask, 
    }) => (
    <div className="flex items-center space-x-2">
        <button onClick={() => onDeleteTask(taskId)}>
            <FaTrash size={14} className="text-gray-600 hover:text-red-500"/>
        </button>

        <button onClick={onUpdateTask}>
            <FaEdit size={14} className="text-gray-600 hover:text-red-500"/>
        </button>

        <button
            onClick={onToggleCompletion}
            className={`p-1 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-500'}`}
        >
            <FaCheck size={10} className={completed ? 'text-white' : 'text-gray-800'} />
        </button>
    </div>
);

export default TaskActions;