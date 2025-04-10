import React from 'react';

type Props = {
  type: 'submit' | 'button',
  onClick?: () => void,
  label: string,
  className?: string,
}

const Button: React.FC<Props> = ({ type, onClick, label, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
