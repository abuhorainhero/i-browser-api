import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import StarsIcon from '@material-ui/icons/Stars';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import WebIcon from '@material-ui/icons/Web';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import MoneyIcon from '@material-ui/icons/Money';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { UserContext } from "../../../../App";
import loading from "../../../../Images/loading.gif";
import { connect } from "react-redux";

const SideBar = (props) => {
  const [accessbility, setAccessbility] = useContext(UserContext);
  const location = useLocation();
  const [down, setDown] = useState("");


  const dropDown = (innerText) => {
    if (down === innerText) {
      setDown("");
    } else {
      setDown(innerText);
    }
  };


  return (
    <>
      {JSON.stringify(accessbility) === "{}" && (
        <div className="w-100  loading d-flex  justify-content-center align-items-center">
          <img className="loading_img" src={loading} alt="Loading" />
          <h1 className="align">Loading !</h1>
        </div>
      )}

      {props.state.sidebarActive && (
        <div className="side_bar">
          <ul className="side_bar_header_ul">
            <li className="side_bar_header_li">
              i<span style={{ color: "red" }}>Bro</span>wser &nbsp;
            </li>
          </ul>

          <ul className="side_bar_ul">
            {accessbility?.role === "Admin" && (<>
              <Link id="link_a" to="/dashboard">
                <li
                  className={`side_bar_li ${location.pathname === "/dashboard" && "active"
                    }`}
                >
                  <DashboardIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Dashboard
                </li>
              </Link>


              <li
                onClick={(e) => dropDown("Users")}
                className={`side_bar_li drop_down_li ${location.pathname === "/users" || "/admin" && "active"
                  }`}
              >
                Users <ArrowDropDownIcon />
              </li>
              <div
                className={
                  down === "Users" ? "drop_down active" : "drop_down"
                }
              >
                <Link id="link_a" to="/users">
                  <li
                    className={`side_bar_li ${location.pathname === "/users" && "active"
                      }`}
                  >
                    <PeopleIcon style={{ color: "#ffffff" }} /> &nbsp;
                    Users
                  </li>
                </Link>

                <Link id="link_a" to="/admin">
                  <li
                    onClick={e => dropDown("Admin")}
                    className={`side_bar_li ${location.pathname === "/admin" && "active"
                      }`}
                  >
                    <PersonAddIcon style={{ color: "#ffffff" }} /> &nbsp;
                    Admins
                  </li>
                </Link>

              </div>


            </>

            )}

            {accessbility?.ads && (
              <Link id="link_a" to="/ads">
                <li
                  className={`side_bar_li ${location.pathname === "/ads" && "active"
                    }`}
                >
                  <AddToQueueIcon style={{ color: "#ffffff" }} /> &nbsp; Ads
                </li>
              </Link>
            )}

            {accessbility.interest && (
              <Link id="link_a" to="/interest">
                <li
                  className={`side_bar_li ${location.pathname === "/interest" && "active"
                    }`}
                >
                  <StarsIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Interest
                </li>
              </Link>
            )}

            {accessbility.city && (
              <Link id="link_a" to="/city">
                <li
                  className={`side_bar_li ${location.pathname === "/city" && "active"
                    }`}
                >
                  <LocationCityIcon style={{ color: "#ffffff" }} /> &nbsp;
                  City
                </li>
              </Link>
            )}


            {accessbility.country && (
              <Link id="link_a" to="/country">
                <li
                  className={`side_bar_li ${location.pathname === "/country" && "active"
                    }`}
                >
                  <PublicIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Country
                </li>
              </Link>
            )}


            <li
              onClick={(e) => dropDown("BrowsingRevenue")}
              className={`side_bar_li drop_down_li ${location.pathname === "/all-site" || "/other-site" && "active"
                }`}
            >
              Browsing Revenue <ArrowDropDownIcon />
            </li>
            <div
              className={
                down === "BrowsingRevenue" ? "drop_down active" : "drop_down"
              }
            >
              <Link id="link_a" to="/special-site">
                <li
                  className={`side_bar_li ${location.pathname === "/special-site" && "active"
                    }`}
                >
                  <WebIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Special Site
                </li>
              </Link>

              <Link id="link_a" to="/other-site">
                <li
                  className={`side_bar_li ${location.pathname === "/other-site" && "active"
                    }`}
                >
                  <WebAssetIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Other Site
                </li>
              </Link>

            </div>


            {accessbility?.news && (
              <Link id="link_a" to="/news">
                <li
                  className={`side_bar_li ${location.pathname === "/news" && "active"
                    }`}
                >
                  <FiberNewIcon style={{ color: "#ffffff" }} /> &nbsp;
                  News
                </li>
              </Link>
            )}


            <li
              onClick={(e) => dropDown("withdraw")}
              className={`side_bar_li drop_down_li ${location.pathname === "/all-entry" || "/success-entry" || "/reject-entry" && "active"
                }`}
            >
              Withdraw <ArrowDropDownIcon />
            </li>
            <div
              className={
                down === "withdraw" ? "drop_down active" : "drop_down"
              }
            >
              <Link id="link_a" to="/withdraw-all-entry">
                <li
                  className={`side_bar_li ${location.pathname === "/all-entry" && "active"
                    }`}
                >
                  <MoneyIcon style={{ color: "#ffffff" }} /> &nbsp;
                  ALL Entry
                </li>
              </Link>

              <Link id="link_a" to="/withdraw-success-entry">
                <li
                  className={`side_bar_li ${location.pathname === "/success-entry" && "active"
                    }`}
                >
                  <MonetizationOnIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Success Entry
                </li>
              </Link>

              <Link id="link_a" to="/withdraw-reject-entry">
                <li
                  className={`side_bar_li ${location.pathname === "/reject-entry" && "active"
                    }`}
                >
                  <MoneyOffIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Reject Entry
                </li>
              </Link>

              <Link id="link_a" to="/withdraw-method">
                <li
                  className={`side_bar_li ${location.pathname === "/withdraw-method" && "active"
                    }`}
                >
                  <LocalAtmIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Method
                </li>
              </Link>

            </div>


          </ul>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps)(SideBar);
