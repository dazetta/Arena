import React from 'react';

const PrimaryButton = ({ onClick, children, className }) => {
  const defaultClasses = 'text-white bg-primary hover:bg-blue-800 font-montserrat font-medium rounded-lg px-5 py-2.5';
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;