import React, { useState } from 'react';

type Props = {
  onAddTask: (taskText: string, taskDescription: string) => void;
};

const AddTaskForm: React.FC<Props> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText, taskDescription);
      setTaskText('');
      setTaskDescription('');
    }
  };

  return (
    <form onSubmit={handleAddTask} className="mt-4">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Task Name"
        className="p-2 border border-gray-300 rounded-lg w-full"
        required
      />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description (optional)"
        className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
      />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-lg">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
