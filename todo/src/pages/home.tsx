import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

const HomePage = () => {
    const [newListName, setNewListName] = useState('');

    const handleCreateList = () => {
        console.log('created List')
    }

  return (
    <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Your Task Lists</h1>
    
        <div>
            <input
                type="text" 
                value={newListName} 
                onChange={(e) => setNewListName(e.target.value)}      
                placeholder="Enter task list name"
            />
             <button
                onClick={handleCreateList}
            >
                Create Task List
            </button>
        </div>  
    </div>
  );
};

export default HomePage;
