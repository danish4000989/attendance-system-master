const Button = ({ type, loading, className, children }) => {
  return (
    <button
      class={'btn btn-primary ' + className}
      type={type}
      disabled={loading}
    >
      {loading && (
        <span
          class='spinner-grow spinner-grow-sm'
          role='status'
          aria-hidden='true'
        ></span>
      )}
      {children}
    </button>
  );
};

export default Button;
