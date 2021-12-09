import React from "react";

const Button = ({ type, loading, className, children }) => {
  return (
    <button
      className={'btn btn-primary ' + className}
      type={type}
      disabled={loading}
    >
      {loading && (
        <span
          className='spinner-grow spinner-grow-sm'
          role='status'
          aria-hidden='true'
        ></span>
      )}
      {children}
    </button>
  );
};

export default Button;
