import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DisabledLink = ({ to, isDisabled, children }) => {

  const handleClick = (event) => {
    if (isDisabled) {
      event.preventDefault(); // Prevenir la navegación
    }
  };

  return (
    <Link  to={to} onClick={handleClick} className={`font-bold last-of-type:border-none border-b-2 lg:border-b-0 py-2 lg:py-0 space-x-3 px-2 lg:px-4 text-sm flex items-center transition-color hover:bg-gray-300 lg:border-r-2 border-gray-200 ${useLocation().pathname === to ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white'}`} >
      {children}
    </Link>
  );
};

export default DisabledLink;
