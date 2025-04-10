import React,  { useState } from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); 

  return (
    <div className="auth-container">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 mr-2 ${isLogin ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 ${!isLogin ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
        >
          Register
        </button>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default Auth;
