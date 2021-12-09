import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ADMIN_LOGIN, AUTH_LOADING, ERROR } from '../../redux/types';
import Button from '../LoadingButton';
import loginBg from '../../assets/login-bg.jpg';

const AdminLogin = ({ history: { push } = {} }) => {
  const [form, setForm] = useState({ admin_email: '', password: '' });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const [message, setMessage] = useState(undefined);
  const { loading, adminId } = useSelector(
    ({ auth: { loading, adminId } }) => ({
      loading,
      adminId,
    })
  );
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(undefined);
    try {
      dispatch({ type: AUTH_LOADING, payload: true });
      const res = await axios.post('/authenticate_admin', form);
      if (res.data > 0) {
        push('/?id=3e33143134&name=192.168.88.254&mac=2c:4d:54:44:c2:93');
      } else {
        setMessage('Wrong username or password.');
      }
      dispatch({ type: ADMIN_LOGIN, payload: res.data });
    } catch (err) {
      console.log({ err });
      dispatch({ type: ERROR, payload: err?.response?.data });
    }
  };
  const { admin_email, password } = form;
  return (
    // <div className='d-flex align-items-center justify-content-center bg-secondary w-100 h-100'>
    <div className='loginPg'>
      <div className='loginDv'>
        <form onSubmit={onSubmit} className=''>
          <h1>Attendence System</h1>
          <p>Sign In to manage account</p>
          <div className='input-group'>
            <input
              className='form-control'
              type='admin_email'
              required
              placeholder='Email'
              name='admin_email'
              autoComplete='username'
              value={admin_email}
              onChange={onChange}
            />
          </div>
          <div className='input-group'>
            <input
              className='form-control'
              type='password'
              required
              placeholder='Password'
              name='password'
              autoComplete='current-password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className='btnDV'>
            <Button loading={loading} type='submit'>
              Sign In
            </Button>
          </div>
        </form>
        <figure>
          <img src={loginBg} alt='' />
        </figure>
      </div>
      {message && (
        <div className='errorDv'>
          <p>{message}</p>
        </div>
      )}
    </div>
    // </div>
  );
};

export default AdminLogin;
