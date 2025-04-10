import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from '../firebase';
import Input from "./input";
import Button from "./button";

const RegisterForm = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault(); 
        console.log('Handle Register')
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredentials.user, {displayName: name});
            console.log("Registered:", userCredentials.user);
        } catch (err) {
            console.error("Registration error:", err);
        }
    }
    
    return (
        <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 rounded shadow-lg">
            <Input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
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
                label="Register"
            />
        </form>
    )
};

export default RegisterForm;