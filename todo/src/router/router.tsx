import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home';
import Auth from '../pages/auth';

type User = {
    token: string;
  }

const RouterComponent = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setUser({ token });
        }
        setLoading(false);
    }, []);

      if (loading) {
        return <div>Loading...</div>;
      }   

  return (
    <Router>
          <Routes>
            <Route 
                path="/" 
                element={ user ? <Home /> : <Navigate to="/auth" />}
            />
            <Route 
                path="/auth" 
                 element={user ? <Navigate to="/" /> : <Auth />} 
            />
          </Routes>
    </Router>
  );
};

export default RouterComponent;
