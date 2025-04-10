import React from 'react';

type Props = {
    type: "text" | "email" | "password",
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
}

const Input: React.FC<Props> = ({ type, value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
};

export default Input;