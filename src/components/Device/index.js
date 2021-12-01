import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEVICE_LOADING, ERROR, REGISTER_DEVICE } from '../../redux/types';
import Button from '../LoadingButton';
import loginBg from '../../assets/login-bg.jpg';

const Device = ({ history: { push } = {} }) => {
  const { info, adminId, deviceId, loading } = useSelector(
    ({ auth: { adminId } = {}, device: { info, deviceId, loading } = {} }) => ({
      info,
      adminId,
      deviceId,
      loading,
    })
  );
  const dispatch = useDispatch();
  const register = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: DEVICE_LOADING, payload: true });
      const res = await axios.post('/insert_device', {
        devicename: info.deviceName,
        Building_id: e.target[2].value,
        mac_address: info.macAddress,
        Admin_id: adminId,
        registered_date: new Date(),
      });
      if (res.data > 0) {
        dispatch({ type: REGISTER_DEVICE, payload: res.data });
        if (res.data > 0) push('attendance');
      } else {
        dispatch({ type: ERROR, payload: res.data });
      }
    } catch (err) {
      console.log({ err });
      dispatch({ type: ERROR, payload: err?.response?.data });
    }
  };

  return (
    <div className='loginPg'>
      <div className='loginDv'>
        <form onSubmit={register}>
          <h1>Attendence System</h1>
          <p>Register you device</p>
          <div className='input-group'>
            <label>Mac Address:</label>
            <input
              disabled={true}
              value={info?.macAddress}
              className='form-control'
            />
          </div>
          <div className='input-group'>
            <label>Device Name:</label>
            <input
              disabled={true}
              value={info?.deviceName}
              className='form-control'
            />
          </div>
          <div className='input-group'>
            <label>Branch Code:</label>
            <input
              required
              placeholder='Branch Code'
              className='form-control'
            />
          </div>
          <div className='btnDV'>
            <Button loading={loading} type='submit'>
              Register
            </Button>
          </div>
        </form>
        <figure>
          <img src={loginBg} />
        </figure>
      </div>
    </div>
  );
};

export default Device;
