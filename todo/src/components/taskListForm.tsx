import React from 'react';

type Props = {
  newListName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const TaskListForm: React.FC<Props> = ({ newListName, onChange, onSubmit }) => {
  return (
    <div className="flex flex-col items-center mb-6">
        <input
            type="text"
            value={newListName}
            onChange={onChange}
            placeholder="Enter task list name"
            className="p-3 mb-4 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
        />
        <button
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
            Create Task List
        </button>
    </div>
  );
};

export default TaskListForm;
