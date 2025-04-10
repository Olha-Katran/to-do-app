import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

import { auth } from '../firebase';
import Input from './input';
import Button from './button';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("logged in");
        } catch (err) {
            console.error("Login error:", err);
        }
    } 
    
    return (
        <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 rounded shadow-lg">
            <Input 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
             />
      
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button
                type="submit"
                label="Login"
            />
        </form>
    )
};

export default LoginForm;