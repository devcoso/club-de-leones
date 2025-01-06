import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DisabledLink = ({ to, isDisabled, children }) => {

  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault(); // Prevenir la navegación
    }
  };

  return (
    <Link  to={to} onClick={handleClick} className={`font-bold p-2 space-x-3 rounded flex items-center transition-color hover:bg-gray-300 mb-2 shadow-md border-gray-200 ${useLocation().pathname === to ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white'}`} >
      {children}
    </Link>
  );
};

export default DisabledLink;
