import React, { useContext, useEffect, useState } from "react";
import "./DashBoard.css";
import DashboardHeader from "./DashboradHeader/DashboardHeader";
import SideBar from "./Sidebar/SideBar";
import { Form, Table } from "react-bootstrap";
import NotAccess from "../NotAccess/NotAccess";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import createNotification from "../Notification/Notification";
import { UserContext } from "../../../App";
import { connect } from "react-redux";

const DashBoard = (props) => {
  const [accessbility, setAccessbility] = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [countrys, setCountrys] = useState([]);
  const [citys, setCitys] = useState([]);

  useEffect(() => {
    axios.get('/api/user/get-all')
      .then(res => {
        const { user, error, message } = res.data
        setUsers(user)
      }).catch(err => {
        console.error(err)
      });

    axios.get('/api/ads/get-all')
      .then(res => {
        const { ads, error, message } = res.data
        setAds(ads)
      }).catch(err => {
        console.error(err)
      });

    axios.get('/api/country/get-all')
      .then(res => {
        const { country, error, message } = res.data
        setCountrys(country)
      }).catch(err => {
        console.error(err)
      });

    axios.get('/api/city/get-all')
      .then(res => {
        const { city, error, message } = res.data
        setCitys(city)
      }).catch(err => {
        console.error(err)
      });

  }, [])


  return (
    <div className="row">
      {props.sidebarActive && (
        <div className="col-md-2">
          <SideBar />
        </div>
      )}
      <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
        <DashboardHeader name={"Dashboard"} />
        <div className="dashboard_content mt-4">
          {/* {accessbility.role === "Admin" ? ( */}
            <section className="content_box_full">
              <section className="row sales_activity p-4 mb-4">

                <div className="col-md-3">
                  <div className=" p-5 sales_box box box1 d-flex flex-column align-items-center text-center">
                    <h4 className="">Total Users</h4>
                    <h3 className="text-light mb-0">
                      {users?.length}
                    </h3>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className=" p-5 sales_box box box2 d-flex flex-column align-items-center text-center">
                    <h4 className="">Total Ads</h4>
                    <h4 className="text-light mb-0">
                      {ads?.length}
                    </h4>
                  </div>
                </div>

                <div className="col-md-3 ">
                  <div className="p-5 sales_box box box4 d-flex flex-column align-items-center">
                    <h4 className="text-center">Total Countrys</h4>
                    <h3 className="text-white">
                      {countrys?.length}
                    </h3>
                  </div>
                </div>

                <div className="col-md-3 ">
                  <div className="p-5 sales_box box box3 d-flex flex-column align-items-center text-center">
                    <h4 className="text-center">Total City's</h4>
                    <h3 className="text-white ">
                      {citys?.length}
                    </h3>
                  </div>
                </div>

              </section>

              <div className="">

                {users?.length > 0 && (
                  <div className="table_div">
                    <Table className="" striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th> User</th>
                          <th> Country</th>
                          <th> Withdrawal Method</th>
                          <th> Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((info) => (
                          <tr key={info._id} className="text-center">
                            <td>
                              {info.name}
                            </td>
                            <td>
                              {info.countryId}
                            </td>
                            <td>
                              {info.withdrawalMethodId}
                            </td>
                            <td>
                              {"null"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}

              </div>

            </section>
          {/* ) : (
            <NotAccess />
          )} */}
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sidebarActive: state.sidebarActive,
});

export default connect(mapStateToProps)(DashBoard);
