import React from 'react';

const SecondaryButton = ({ onClick, children, className, type, disabled }) => {
  const defaultClasses = 'py-2.5 px-5 font-medium text-primary bg-white rounded-lg border border-primary hover:bg-primary hover:text-white';
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <button className={combinedClasses} onClick={onClick}  type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default SecondaryButton;