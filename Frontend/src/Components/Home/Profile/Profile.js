import React, { useContext, useState } from "react";
import "./Profile.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardHeader from "../DashBoard/DashboradHeader/DashboardHeader";
import SideBar from "../DashBoard/Sidebar/SideBar";
import PersonIcon from "@material-ui/icons/Person";
import LocalStorage from "../LocalStorage";
import { useHistory } from "react-router";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NotificationContainer } from "react-notifications";
import createNotification from "../Notification/Notification";
import { UserContext } from "../../../App";
import ReactLoading from "react-loading";
import { connect } from "react-redux";

const Profile = (props) => {
  const [active, setActive] = useState("account");
  const [accessbility, setAccessbility] = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = LocalStorage("loggedInUser", {});
  const history = useHistory();

  const logOut = () => {
    setLoggedInUser({});
    setAccessbility({});
    history.replace("/");
  };

  return (
    <div className="row">
      {props.sidebarActive && (
        <div className="col-md-2">
          <SideBar />
        </div>
      )}
      <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
        <DashboardHeader name={"Profile"} />
        <div className="dashboard_content mt-4">
          <div className="row profile">
            <div className="col-md-3">
              <div className="profile-sidebar  h-100">
                <div className="profile-userpic">
                  <AccountCircleIcon className="img-responsive" />
                </div>

                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    {accessbility?.name}
                  </div>
                  <div className="profile-usertitle-job">
                    {accessbility?.role}
                  </div>
                </div>
                <div className="profile-usermenu">
                  <ul className="nav_ul pl-0 text-center">
                    <li
                      onClick={() => setActive("account")}
                      className={active === "account" ? "active" : ""}
                    >
                      <span>
                        <PersonIcon className="icon_profile_page" />
                        Account Settings{" "}
                      </span>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={logOut}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-content">
                <AccountSetting
                  accessbility={[accessbility, setAccessbility]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sidebarActive: state.sidebarActive,
});

export default connect(mapStateToProps)(Profile);

// ------------------------- others ---------------------------
const AccountSetting = (props) => {
  const [accessbility, setAccessbility] = props.accessbility;
  const [editOn, setEditOn] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [processing, setProcessing] = useState(false);

  const onSubmit = (data) => {
    const newData = {
      ...accessbility,
      ...data
    };

    console.log(data);
    if (data?.phone?.length >= 10) {
      if (data?.password === data?.confirmPass) {
        if (data?.password?.length > 3) {
          setProcessing(true);
          axios
            .patch(
              `/api/admin/update-one/${accessbility._id}`,
              newData
            )
            .then((res) => {
              const { admin, error, message } = res.data;
              console.log(admin);
              setAccessbility(admin);
              createNotification("success", "SUCCESSFULLY", `${message}`);
              setEditOn(false);
              setProcessing(false);
            })
            .catch((err) => {
              console.log("got error");
              setProcessing(false);
              createNotification(
                "warning",
                "FAILED",
                `${err.response?.data.message}`
              );
            });
        } else {
          createNotification("info", "PASSWORD", `Minimum 4 Digit`);
        }
      } else {
        createNotification("warning", "FAILED", `Password not Match`);
      }
    } else {
      createNotification("info", "MOBILE", ` Number Minimum 11 Digit`);
    }
  };

  console.log(accessbility);
  return (
    <>
      {editOn ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="box-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name" className="col-sm-4 control-label">
                    User Name<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      className="form-control input-sm"
                      id="name"
                      name="name"
                      placeholder=""
                      defaultValue={accessbility?.name}
                    />

                    {errors.name && (
                      <span className="text-danger">field is required</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="col-sm-4 control-label">
                    Mobile<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      ref={register({ required: true })}
                      type="text"
                      className="form-control input-sm no_special_char_no_space"
                      id="phone"
                      name="phone"
                      defaultValue={accessbility?.phone}
                      placeholder="Enter your number"
                    />

                    {errors.phone && (
                      <span className="text-danger">field is required</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-sm-4 control-label">
                    Email<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      ref={register({ required: true })}
                      type="email"
                      className="form-control input-sm"
                      id="email"
                      name="email"
                      placeholder=""
                      defaultValue={accessbility?.email}
                    />

                    {errors.email && (
                      <span className="text-danger">field is required</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">

                <div className="form-group">
                  <label htmlFor="gender" className="col-sm-6 control-label">
                    Gender<label className="text-danger">*</label>
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="form-control form-select"
                    ref={register({ required: true })}
                    value={accessbility?.gender}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                  {errors.gender && (
                    <span className="text-danger">User gender is required</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="col-sm-6 control-label">
                    Password<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      ref={register({ required: true })}
                      type="password"
                      className="form-control input-sm"
                      id="password"
                      name="password"
                      placeholder=""
                      defaultValue={accessbility?.password}
                    />
                    {errors.password && (
                      <span className="text-danger">field is required</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm" className="col-sm-6 control-label">
                    Confirm Password<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      ref={register({ required: true })}
                      type="password"
                      className="form-control input-sm"
                      disabled=""
                      id="confirmPass"
                      name="confirmPass"
                      placeholder=""
                      defaultValue={accessbility?.password}
                    />
                    {errors.confirmPass && (
                      <span className="text-danger">field is required</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row update_cancel">
            <div className="col-md-2 m-3 col-md-offset-3">
              {processing ? (
                <span className=" btn btn-block btn-success d-flex">
                  Processing{" "}
                  <ReactLoading
                    type={"bubbles"}
                    color={"#FFFFFF"}
                    height={10}
                    width={60}
                  />
                </span>
              ) : (
                <button
                  type="submit"
                  id="update"
                  className=" btn btn-block btn-success"
                  title="Save Data"
                >
                  Update
                </button>
              )}
            </div>
            <div className="col-sm-2  m-3">
              <button
                onClick={() => setEditOn(false)}
                type="button"
                className="btn btn-block btn-warning close_btn"
                title="Go Dashboard"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="box-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name" className="col-sm-4 control-label">
                    User Name<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="name"
                      name="name"
                      placeholder=""
                      value={accessbility?.name}
                      readOnly
                    />
                    <span
                      id="name_msg"
                      style={{ display: "none" }}
                      className="text-danger"
                    ></span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="col-sm-4 control-label">
                    Mobile<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control input-sm no_special_char_no_space"
                      id="phone"
                      name="phone"
                      placeholder=""
                      value={accessbility.phone}
                      readOnly
                    />
                    <span
                      id="number_msg"
                      style={{ display: "none" }}
                      className="text-danger"
                    ></span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="col-sm-4 control-label">
                    Email<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control input-sm"
                      id="email"
                      name="email"
                      placeholder=""
                      value={accessbility.email}
                      readOnly
                    />
                    <span
                      id="email_msg"
                      style={{ display: "none" }}
                      className="text-danger"
                    ></span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="role_id" className="col-sm-4 control-label">
                    Role<label className="text-danger">*</label>{" "}
                  </label>
                  <div className="col-sm-8">
                    <strong>{accessbility.role}</strong>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pass" className="col-sm-4 control-label">
                    Password<label className="text-danger">*</label>
                  </label>
                  <div className="col-sm-8">
                    <input
                      type={showPass ? `text` : `password`}
                      className="form-control input-sm"
                      disabled=""
                      id="pass"
                      name="pass"
                      placeholder=""
                      value={accessbility.password}
                      readOnly
                    />
                    {showPass ? (
                      <VisibilityOffIcon
                        onClick={() => setShowPass(false)}
                        id="show_password"
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={() => setShowPass(true)}
                        id="show_password"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row update_cancel">
            <div className="col-md-2 m-4 col-md-offset-3">
              <button
                onClick={() => setEditOn(true)}
                type="button"
                id="update"
                className=" btn btn-block btn-success"
                title="Save Data"
              >
                Edit
              </button>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </>
      )}

      <NotificationContainer />
    </>
  );
};
