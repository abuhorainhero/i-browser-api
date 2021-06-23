import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../../../App";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import LocalStorage from "../LocalStorage";
import {NotificationContainer} from 'react-notifications';
import createNotification from "../Notification/Notification";


const LoginForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loader, setLoader] = useState(false);
  const [ loggedInUser, setLoggedInUser ] = LocalStorage( 'loggedInUser', {} );
  const [ accessbility, setAccessbility ] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  

  const onSubmit = (data) => {
    if (data.email && data.password) {
      axios
        .post(`https://i-browser-api.herokuapp.com/api/admin/admin-login`, data)
        .then((res) => {
          console.log(res.data)
          createNotification('success','LOG IN','Successfully !');
          setLoggedInUser({_id:res.data.admin._id})
          setAccessbility(res.data.admin)
       
        //   লগইন successfull হলে replace করতে হবে from এ
            setTimeout(()=>{
              history.replace(from);
            },1000)
            setLoader(false)
        })
        .catch((err) => {
          console.log(err.response)
            setLoader(false)
          createNotification('warning',`${err.response?.data.message}`,'')
   
       
        });

      // ইনপুট এর পাশে লোডিং আর জন্য এটা; যখন ডাটা পোস্ট হবে তখন setLoader(false) করেতে হবে
      setLoader(true);
      // ইনপুট এর পাশে লোডিং আর জন্য এটা; যখন ডাটা পোস্ট হবে তখন setLoader(false) করেতে হবে
    }
  };
  console.log( loggedInUser);

  return (
    <div className="login_back">
      <div className="login-form">
        <div className="main-div col-md-6">
          <div className="panel">
            <h2>Admin Login</h2>
            <p>Please enter your email and password</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email Address"
                name="email"
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                name="password"
                ref={register({ required: true })}
              />
              {errors.password && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <br />
            <div className="spin_submit">
              {loader && <Spinner animation="border" variant="secondary" />}

              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default LoginForm;
