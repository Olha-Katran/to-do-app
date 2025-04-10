import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

import { TaskList } from './../types/types';
import AddTaskForm from './addTaskForm';
import TaskActions from './taskActions';
import ListHeader from './listHeader';
import TaskItem from './taskItem';
import EditModal from './editModal';

type Props = {
    list: TaskList;
    onToggleTaskCompletion: (listId: string, taskId: string) => void;
    onAddTask: (listId: string, taskText: string, taskDescription: string) => void;
    onDeleteList: (listId: string) => void; 
    onDeleteTask: (listId: string, taskId: string) => void;
    onUpdateListName: (listId: string, newName: string) => void;
    onUpdateTask: (listId: string, taskId: string, newTaskText: string, newTaskDescription: string) => void;
  }

const TaskListItem: React.FC<Props> = ({ 
    list, 
    onToggleTaskCompletion,
    onAddTask, 
    onDeleteList, 
    onDeleteTask,
    onUpdateListName, 
    onUpdateTask,
 }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newListName, setNewListName] = useState(list.name);
  
    const handleOpenEditModal = () => {setIsEditModalOpen(true)};
  
    const handleCloseEditModal = () => {setIsEditModalOpen(false)};
  
    const handleSaveNewName = () => {
      if (newListName.trim()) {
        onUpdateListName(list.id, newListName);
        handleCloseEditModal();
      }
    };

    const handleAddTask = (taskText: string, taskDescription: string) => {
        onAddTask(list.id, taskText, taskDescription);
      };

    const handleDeleteTask = (taskId: string) => {
        onDeleteTask(list.id, taskId);
    }; 

    return (
        <li key={list.id} className="p-4 rounded-lg border-2 border-green-700">
            <ListHeader
                listName={list.name} 
                onEditClick={handleOpenEditModal} 
                onDeleteClick={() => onDeleteList(list.id)} 
            />    

            <ul>
                {list.tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task} 
                        onDeleteTask={handleDeleteTask} 
                        onToggleCompletion={() => onToggleTaskCompletion(list.id, task.id)}
                     />
                ))}
            </ul>


            <AddTaskForm onAddTask={handleAddTask} />

            <EditModal
                isOpen={isEditModalOpen}
                newListName={newListName}
                onClose={handleCloseEditModal}
                onSave={handleSaveNewName}
                onChangeName={(e) => setNewListName(e.target.value)}
             />
    </li>
    )
};

export default TaskListItem;