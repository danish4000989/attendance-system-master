const TryAgain = ({ tryAgain, message }) => {
  return (
    <div>
      <h4>{message}</h4>
      <div>
        <button className='btn btn-success' onClick={tryAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default TryAgain;
