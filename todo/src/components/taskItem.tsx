import React, { useState } from 'react';

import TaskActions from './taskActions';
import { Task } from '../types/types';
import EditModal from './editModal';

type Props = {
    task: Task;
    onDeleteTask: (taskId: string) => void;
    onToggleCompletion: () => void;
    onUpdateTask: (taskId: string, newText: string, newDescription: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onDeleteTask, onToggleCompletion, onUpdateTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newText, setNewText] = useState(task.text);
    const [newDescription, setNewDescription] = useState(task.description || '');

    const handleEditTask = () => {
        setIsModalOpen(true);
    };

    const handleSaveChanges = () => {
        onUpdateTask(task.id, newText, newDescription);
        setIsModalOpen(false);
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewText(e.target.value);
      };
    
      const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(e.target.value);
      };

    return (
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
            onUpdateTask={handleEditTask}
        />
        
        <EditModal
            isOpen={isModalOpen}
            label='Edit Task'
            newListName={newText}
            newDescription={newDescription}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveChanges}
            onChangeName={handleChangeName}
            onChangeDescription={handleChangeDescription}
         />
    </li>
)};

export default TaskItem;
