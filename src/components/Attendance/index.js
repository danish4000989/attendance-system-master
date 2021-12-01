import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListComapnies from "../Companies";
import { ERROR, LOADING_ATTENDANCE, MARK_ATTENDANCE } from "../../redux/types";
import PicCapture from "../PicCapture";
import Swal from "sweetalert2";

const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
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
  const webcamRef = useRef(null);
  const { deviceId, loading, id, text } = useSelector(
    ({
      device: { deviceId } = {},
      attendance: { loading, message: { id, text } = { id: "" } } = {},
    }) => ({
      deviceId,
      loading,
      id,
      text,
    })
  );

  const dispatch = useDispatch();

  const markAttendance2 = async (data) => {
    try {
      const res = await axios.post("/insert_Attendance_with_image2", data);
      if (res.data?.id !== "") {
        dispatch({
          type: MARK_ATTENDANCE,
          payload: {
            id: res.data.id,
            text: `${res.data.status} marked for employee: ${res.data?.employee_detail?.name} | id: ${res.data.id}`,
          },
        });
      } else {
        dispatch({
          type: MARK_ATTENDANCE,
          payload: { id: res.data.id, text: "Please Try Again!!" },
        });
      }
      // if (timeout.current === null) {
      //   timeout.current = setTimeout(() => {
      //     dispatch({ type: MARK_ATTENDANCE });
      //     timeout.current = null;
      //   }, 3000);
      // }
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        dispatch({ type: MARK_ATTENDANCE });
        timeout.current = null;
      }, 3000);
    } catch (err) {
      console.log({ err });
      dispatch({ type: ERROR, payload: err?.response?.data });
    }
  };
  const markAttendance = async (data) => {
    try {
      const res = await axios.post("/confirm_detection", data);
      // console.log(data)
      if (res.data !== "") {
        dispatch({
          type: MARK_ATTENDANCE,
          payload: Swal.fire({
            
            title: "Please Confirm",
            text: `Are you ${res.statusText} | id ${res.data} |`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.value) {
              dispatch({
                type: MARK_ATTENDANCE,
                payload: {
                  id: res.data.id,
                  text: `${res.data.status} marked for employee: ${res.statusText} | id: ${res.data}`,
                },
              });
            }
          }),
        });
      } else {
        dispatch({
          type: MARK_ATTENDANCE,
          payload: { id: res.data.id, text: "Please Try Again!!" },
        });
      }
      // if (timeout.current === null) {
      //   timeout.current = setTimeout(() => {
      //     dispatch({ type: MARK_ATTENDANCE });
      //     timeout.current = null;
      //   }, 3000);
      // }
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        dispatch({ type: MARK_ATTENDANCE });
        timeout.current = null;
      }, 3000);
    } catch (err) {
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
        const file = dataURLtoFile(imageSrc, "image.jpeg");
        const data = new FormData();
        data.append("image", file);
        data.append("companyname", name);
        data.append("device_id", deviceId);
        data.append("status", status);
        markAttendance(data);
      }, 2000);
    },
    [webcamRef]
  );
  return (
    <>
      <div className="attendanceDv">
        <ListComapnies capture={capture} />
        <div className="cameraInfoDv">
          <PicCapture webcamRef={webcamRef} />
          <div className="infoDv">
            {loading ? (
              <h4>Face the camera...</h4>
            ) : !loading && id !== "" ? (
              <h4 className="success">{text}</h4>
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
