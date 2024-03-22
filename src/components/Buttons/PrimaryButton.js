import React from 'react';

const PrimaryButton = ({ onClick, children, className, type, disabled }) => {
  const defaultClasses = `text-white bg-primary hover:bg-blue-800 font-montserrat font-medium rounded-lg px-5 py-2.5 ${ disabled ? 'disabled:opacity-50' : '' }`;
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <button className={combinedClasses} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default PrimaryButton;