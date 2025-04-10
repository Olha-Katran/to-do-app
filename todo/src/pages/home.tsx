import React from 'react';

const HomePage = () => {
  return (
    <div className="max-w-md mx-auto p-4 rounded shadow-lg">
      <h1>Welcome to the Home Page</h1>
      <p>This is a protected page. Only logged-in users can access it.</p>
    </div>
  );
};

export default HomePage;
