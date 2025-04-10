import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { TaskList } from '../types/types';
import { fetchTaskLists, addTaskList, updateTaskList, deleteTaskList, updateTaskListName } from '../utils/taskListUtils';
import TaskListItem from '../components/taskListItem';
import TaskListForm from '../components/taskListForm';

const HomePage = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [newListName, setNewListName] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const lists = await fetchTaskLists(firebaseUser.uid);
        setTaskLists(lists);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateList = async () => {
    if (user && newListName.trim() !== '') {
      try {
        const newListId = await addTaskList(user.uid, newListName);
        setTaskLists((prevLists) => [
          ...prevLists,
          { id: newListId, name: newListName, tasks: [], userId: user.uid },
        ]);
        setNewListName('');
      } catch (e) {
        console.error('Error adding task list: ', e);
      }
    }
  };

  const handleUpdateListName = async (listId: string, newName: string) => {
    if (user && newName.trim() !== '') {
      await updateTaskListName(user.uid, listId, newName);
      setTaskLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId ? { ...list, name: newName } : list
        )
      );
    }
  };

  const handleAddTask = async (listId: string, taskText: string, taskDescription: string) => {
    if (user && taskText.trim() !== '') {
      const updatedTaskLists = taskLists.map((list) => {
        if (list.id === listId) {
          const newTask = {
            id: `${Date.now()}`,
            text: taskText,
            completed: false,
            description: taskDescription || ''
          };
          return {
            ...list,
            tasks: [...list.tasks, newTask],
          };
        }
        return list;
      });

      setTaskLists(updatedTaskLists);
      await updateTaskList(user.uid, listId, updatedTaskLists.find((list) => list.id === listId)?.tasks || []);
    }
  };

  const handleDeleteList = async (listId: string) => {
    if (user) {
      try {
        await deleteTaskList(user.uid, listId);
        setTaskLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      } catch (e) {
        console.error('Error deleting task list: ', e);
      }
    }
  };

  const handleToggleTaskCompletion = async (listId: string, taskId: string) => {
    if (!user) return;

    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });

    setTaskLists(updatedTaskLists);
    await updateTaskList(user.uid, listId, updatedTaskLists.find((list) => list.id === listId)?.tasks || []);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Task Lists</h1>

      <TaskListForm newListName={newListName} onChange={(e) => setNewListName(e.target.value)} onSubmit={handleCreateList} />

      <ul className="space-y-4">
        {taskLists.map((list) => (
          <TaskListItem
            key={list.id}
            list={list}
            onToggleTaskCompletion={handleToggleTaskCompletion}
            onAddTask={handleAddTask}
            onUpdateListName={handleUpdateListName}
            onDelete={handleDeleteList}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
