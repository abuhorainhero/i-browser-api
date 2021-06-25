import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

import AddToQueueIcon from '@material-ui/icons/AddToQueue';

import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import HistoryIcon from "@material-ui/icons/History";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import StorefrontIcon from "@material-ui/icons/Storefront";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocalStorage from "../../LocalStorage";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
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
                className={`side_bar_li drop_down_li ${location.pathname === "/users" && "active"
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
                    <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
                    Users
                  </li>
                </Link>

                <Link id="link_a" to="/admin">
                  <li
                    className={`side_bar_li ${location.pathname === "/admin" && "active"
                      }`}
                  >
                    <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
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
                  <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
                  Interest
                </li>
              </Link>
            )}



            {/* {accessbility.products ||
              accessbility.sells ||
              accessbility.pendingOrder ||
              accessbility.paymentManage ? ( */}


            {accessbility.city && (
              <Link id="link_a" to="/city">
                <li
                  className={`side_bar_li ${location.pathname === "/city" && "active"
                    }`}
                >
                  <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
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
                  <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
                  Country
                </li>
              </Link>
            )}

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
