import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div className="layout ">
        <div className="header bg-third flex justify-between p-1">
          <div>
            <img className="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Cineplexx.png/250px-Cineplexx.png" width={120} height={50} onClick={() => navigate("/")}></img>
          </div>

          <div className="wfont p-1 flex gap-1 radius">
          <i className="ri-shield-user-line mt-1"></i>
            <h1
              className="wfont text-sm hoverc mt-1"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.name}
            </h1>

            <i
              className="ri-logout-box-r-line mt-1 "
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="p-1 bred content">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;
