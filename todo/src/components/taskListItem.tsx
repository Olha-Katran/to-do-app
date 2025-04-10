import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

import { TaskList } from './../types/types';
import AddTaskForm from './addTaskForm';

type Props = {
    list: TaskList;
    onToggleTaskCompletion: (listId: string, taskId: string) => void;
    onAddTask: (listId: string, taskText: string, taskDescription: string) => void;
    onDelete: (listId: string) => void; 
    onUpdateListName: (listId: string, newName: string) => void;
  }

const TaskListItem: React.FC<Props> = ({ 
    list, 
    onToggleTaskCompletion,
    onAddTask, 
    onDelete, 
    onUpdateListName
 }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newListName, setNewListName] = useState(list.name);
  
    const handleOpenEditModal = () => {
      setIsEditModalOpen(true);
    };
  
    const handleCloseEditModal = () => {
      setIsEditModalOpen(false);
    };
  
    const handleSaveNewName = () => {
      if (newListName.trim()) {
        onUpdateListName(list.id, newListName);
        handleCloseEditModal();
      }
    };

    const handleAddTask = (taskText: string, taskDescription: string) => {
        onAddTask(list.id, taskText, taskDescription);
      };

    return (
        <li key={list.id} className="p-4 rounded-lg border-2 border-green-700">
            <div className='flex justify-between items-center mb-4'>
                <h2 className="mb-4">{list.name}</h2>
                <div>
                    <button
                        onClick={handleOpenEditModal}
                        className="text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg"
                    >
                        <FaEdit size={16} />
                    </button>

                    <button
                        onClick={() => onDelete(list.id)}
                        className="text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>
            
            </div>
            

            <ul>
                {list.tasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between mb-2">
                        <div className='text-left' style={{ width: '80%' }}>
                            <span className={`${task.completed ? 'text-gray-400' : ''}`}>
                                {task.text}
                            </span>
                            {task.description && (
                                <p className="text-sm text-gray-600 mt-2 break-all">
                                    {task.description}
                                </p>
                             )}
                        </div>
                        <button
                            onClick={() => onToggleTaskCompletion(list.id, task.id)}
                            className={`p-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-500'}`}
                        >
                            <FaCheck size={10} className={task.completed ? 'text-white' : 'text-gray-800'} />
                        </button>
                    </li>
                ))}
            </ul>


            <AddTaskForm onAddTask={handleAddTask} />

             {isEditModalOpen && (
                <div className="fixed inset-0 bg-opacity-90 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="mb-4 text-lg font-bold text-black">Edit List Name</h2>
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            className="p-3 w-full border border-gray-300 rounded-lg mb-4 text-black"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveNewName}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCloseEditModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </li>
    )
};

export default TaskListItem;