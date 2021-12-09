import React from 'react';
import axios from 'axios';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListComapnies from '../Companies';
import { ERROR, LOADING_ATTENDANCE, MARK_ATTENDANCE, MARK_ATTENDANCE_CONFIRM } from '../../redux/types';
import PicCapture from '../PicCapture';
import Swal from "sweetalert2"
import Spinner from 'react-bootstrap/Spinner'
// import { createLogger } from 'redux-logger';

let employeeData = {}
// let returnedData = {}

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const Attendance = () => {
  const timeout = useRef(null);
  const timeout2 = useRef(null);
  const webcamRef = useRef(null);
  const { deviceId, loading, id, text } = useSelector(
    ({
      device: { deviceId } = {},
      attendance: { loading, message: { id, text } = { id: '' } } = {},
    }) => ({
      deviceId,
      loading,
      id,
      text,
    })
  );

  const dispatch = useDispatch();

  const insertAttendance = async (att_data) => {
    const res = await axios.post('/mark_attendance', att_data);
    // returnedData = res.data;
    // console.log("This is returned data: ", res.data?.id) 
    // console.log(`This is returned data: ${returnedData}`)

    if (res.data?.id !== -1 || res.data?.id !== '') {
      dispatch({
        type: MARK_ATTENDANCE,
        payload: {
          id: res.data.id,
          text: `${res.data.status} marked for employee: ${res.data?.employee_detail?.name} | id: ${res.data.id}`
        }
      })
    }

  }

  const cancelButton = () => {
    clearInterval(timeout2.current)
  }

  const markAttendance = async (data) => {
    try {
      const res = await axios.post('/insert_Attendance_with_image4', data);
      if (res.data?.id !== '') {
        // console.log(res.data.employee_detail)
        employeeData = res.data
        // console.log(employeeData)
        dispatch({ type: MARK_ATTENDANCE_CONFIRM, payload: res.data });
        dispatch({
          type: MARK_ATTENDANCE,
          payload:
              
            Swal.fire({
              // title: 'Please Confirm',
              text: `${res.data?.employee_detail?.name} | id: ${res.data.id}`,
              timer: 5000, 
              // icon: 'question',
              confirmButtonColor: true,
              // confirmButtonColor: '#3085d6',
              // cancelButtonColor: ' #d33',
              confirmButtonText:'Retry'
              

            }).then(async (result) => {
              if (!result.isConfirmed) {
                let att_data = {
                  id: employeeData.id,
                  companyname: employeeData.companyname,
                  device_id: employeeData.device_id,
                  status: employeeData.status,
                }
                // console.log("Sending data to mark_attendance: ", att_data)
                timeout2.current = setTimeout(() => {
                  insertAttendance(att_data)
                }, 1);

              } else {
                cancelButton()
              }
            }),
        });

      } else {
        dispatch({
          type: MARK_ATTENDANCE,
          payload: { id: res.data.id, text: 'Please Try Again!!' },
        });
      }

      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        dispatch({ type: MARK_ATTENDANCE });
        timeout.current = null;
      }, 10000);
    }

    catch (err) {
      console.log({ err });
      dispatch({ type: ERROR, payload: err?.response?.data });
    }
  };

  const capture = useCallback(
    (name, status) => {
      dispatch({ type: MARK_ATTENDANCE });
      dispatch({ type: LOADING_ATTENDANCE, payload: true });
      setTimeout(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const file = dataURLtoFile(imageSrc, 'image.jpeg');
        const data = new FormData();
        data.append('image', file);
        data.append('companyname', name);
        data.append('device_id', deviceId);
        data.append('status', status);
        markAttendance(data);
      }, 2000);
    },
    [webcamRef]
  );

  return (
    <>
      <div>
        {/* <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Retry!
        </Button> */}
      </div>

      <div className='attendanceDv'>
        <ListComapnies capture={capture} />
        <div className='cameraInfoDv'>
          <PicCapture webcamRef={webcamRef} />
          <div className='infoDv'>
            {loading ? (
              <h4>Face the camera...</h4>
            ) : !loading && id !== '' ? (
              <h4 className='success'>{text}</h4>
            ) : (
              <h4>{text}</h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
