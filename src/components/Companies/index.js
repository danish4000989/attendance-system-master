import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_COMPANIES,
  LOADING_COMPANY,
  ERROR,
  SET_COMPANY,
} from "../../redux/types";

const ListCompanies = ({ capture }) => {
  const { list, loading, deviceId } = useSelector(
    ({ companies: { list, loading } = {}, device: { deviceId } = {} }) => ({
      list,
      loading,
      deviceId,
    })
  );
  const dispatch = useDispatch();

  const getCompanies = async () => {
    try {
      dispatch({ type: LOADING_COMPANY, payload: true });
      const res = await axios.post("/get_company_list_against_id", {
        Device_id: deviceId,
      });
      if (res.data === -1) {
        dispatch({ type: ERROR, payload: res.data });
        dispatch({ type: LOADING_COMPANY, payload: false });
      } else {
        dispatch({ type: GET_COMPANIES, payload: res.data });
      }
    } catch (err) {
      console.log({ err });
      dispatch({ type: ERROR, payload: err?.response?.data });
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);

  // useEffect(() => {
  //   if (company) {
  //     push('attendance');
  //   }
  //   return () => {};
  // }, [company, push]);
  return (
    <div className="companyListDv">
      <h2>Click on your comapany and Face the Camera to mark the attendance</h2>
      <div className="companyListing">
        {loading ? (
          <h1>Loading...</h1> // Loading here
        ) : (
          list.map(([name1]) => (
            <div
            key={name1}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{ background: "#def5ea" }}
                onClick={() => {
                  // dispatch({ type: SET_COMPANY, payload: name })
                  capture(name1, "checkin");
                }}
                className="companyItem"
              >
                <span className="material-icons">home_work</span>
                <h3>{name1}</h3>
                <p>Check In</p>
              </div>
              <div
                style={{ background: "#f9e1e1" }}
                onClick={() => {
                  // dispatch({ type: SET_COMPANY, payload: name })
                  capture(name1, "checkout");
                }}
                className="companyItem"
              >
                <span className="material-icons">home_work</span>
                <h3>{name1}</h3>
                <p>Check Out</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListCompanies;
