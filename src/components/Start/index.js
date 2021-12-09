import React from 'react';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEVICE_INFO, ERROR, REGISTER_DEVICE } from '../../redux/types';
axios.defaults.baseURL = 'https://192.168.88.254:5010';
const Start = ({ location: { search = '' } = {}, history: { push } = {} }) => {
  const urlParams = useRef(new URLSearchParams(search));
  const dispatch = useDispatch();
  const { info, adminId } = useSelector(
    ({ device: { info } = {}, auth: { adminId } = {} }) => ({ info, adminId })
  );

  const check = async (mac_address) => {
    try {
      const res = await axios.post('/authenticate_device', { mac_address });
      dispatch({ type: REGISTER_DEVICE, payload: res.data });
      return res?.data;
    } catch (err) {
      console.log({ err });
      dispatch({ type: ERROR, payload: err?.response?.data });
      return 0;
    }
  };

  useEffect(() => {
    const deviceName = urlParams.current.get('name');
    const deviceId = urlParams.current.get('id');
    const macAddress = urlParams.current.get('mac');
    console.log({ deviceName, deviceId, macAddress });
    if (!info) {
      dispatch({
        type: DEVICE_INFO,
        payload: { deviceName, deviceId, macAddress },
      });
    }
    check(macAddress).then((val) => {
      if (val > 0) {
        push('attendance');
      } else {
        push('login');
      }
    });

    return () => {};
  }, []);
  return <div></div>;
};

export default Start;
