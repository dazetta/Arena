import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom';

const ErrorAlert = ({ children, disappearTime }) => {
  const [showElement, setShowElement] = useState(true)
  useEffect(()=>{
    setTimeout(function() {
      setShowElement(false)
    }, disappearTime);
  }, []);

  return (
    createPortal(
        <> { showElement && <div className="p-2 text-sm text-error rounded-lg flex justify-center items-center border border-error bg-error-10 fixed top-[120px] left-0 right-0 m-auto text-center z-[99] max-w-[380px]">
            { children }
        </div> } </>,
        document.getElementById('error-alert')
    )
  )
}

export default ErrorAlert;