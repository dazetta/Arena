import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryLink = ({ link, children, className }) => {
  const defaultClasses = `text-white bg-primary hover:bg-blue-800 font-montserrat font-medium rounded-lg px-5 py-2.5`;
  const combinedClasses = `${defaultClasses} ${className}`;

  return (
    <Link className={combinedClasses} to={link}>
      {children}
    </Link>
  );
};

export default PrimaryLink;