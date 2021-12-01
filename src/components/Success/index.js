import success from '../../assets/success.gif';
const Success = ({ message }) => {
  return (
    <div>
      <h4>{message}</h4>
      <img style={{ width: 200, height: 200 }} src={success} alt='' />;
    </div>
  );
};

export default Success;
