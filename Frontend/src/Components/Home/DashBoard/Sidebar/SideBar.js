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

  useEffect(() => {
    if (
      location.pathname === "/product-add" ||
      location.pathname === "/sell" ||
      location.pathname === "/pending-order" ||
      location.pathname === "/payment-manage"
    ) {
      setDown("Sell & Products");
    } else if (
      location.pathname === "/salary" ||
      location.pathname === "/other-cost"
    ) {
      setDown("Employee");
    } else if (
      location.pathname === "/sell-history" ||
      location.pathname === "/payment-history"
    ) {
      setDown("History");
    } else if (
      location.pathname === "/product-report" ||
      location.pathname === "/sell-report"
    ) {
      setDown("Report");
    }
  }, []);

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
            {accessbility.role === "Admin" && (<>
              <Link id="link_a" to="/dashboard">
                <li
                  className={`side_bar_li ${location.pathname === "/dashboard" && "active"
                    }`}
                >
                  <DashboardIcon style={{ color: "#ffffff" }} /> &nbsp;
                  Dashboard
                </li>
              </Link>

              <Link id="link_a" to="/ads">
                <li
                  className={`side_bar_li ${location.pathname === "/ads" && "active"
                    }`}
                >
                  <AddToQueueIcon style={{ color: "#ffffff" }} /> &nbsp; Ads
                </li>
              </Link>

            </>

            )}

            {/* {accessbility.interest === true && ( */}
            <Link id="link_a" to="/interest">
              <li
                className={`side_bar_li ${location.pathname === "/interest" && "active"
                  }`}
              >
                <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
                Interest
              </li>
            </Link>
            {/* )} */}



            {/* {accessbility.products ||
              accessbility.sells ||
              accessbility.pendingOrder ||
              accessbility.paymentManage ? ( */}
            <li
              onClick={(e) => dropDown("Users")}
              className={`side_bar_li drop_down_li ${location.pathname === "/users" && "active"
                }`}
            >
              {" "}
              Users <ArrowDropDownIcon />
            </li>
            {/* ) : null} */}
            <div
              className={
                down === "Users" ? "drop_down active" : "drop_down"
              }
            >

              {/* {accessbility.users === true && ( */}
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
              {/* )} */}

            </div>


            {/* {accessbility.city === true && ( */}
            <Link id="link_a" to="/city">
              <li
                className={`side_bar_li ${location.pathname === "/city" && "active"
                  }`}
              >
                <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
                City
              </li>
            </Link>
            {/* )} */}

            
            {/* {accessbility.country === true && ( */}
              <Link id="link_a" to="/country">
              <li
                className={`side_bar_li ${location.pathname === "/country" && "active"
                  }`}
              >
                <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
                Country
              </li>
            </Link>
            {/* )} */}






            {/* ------------- iBrowser sidebar end ----------------------------- */}





            {/* {accessbility.products ||
              accessbility.sells ||
              accessbility.pendingOrder ||
              accessbility.paymentManage ? (
              <li
                onClick={(e) => dropDown("Sell & Products")}
                className={`side_bar_li drop_down_li ${location.pathname === "/product-add" && "active"
                  }`}
              >
                {" "}
                Sell & Products <ArrowDropDownIcon />
              </li>
            ) : null} */}
            {/* <div
              className={
                down === "Sell & Products" ? "drop_down active" : "drop_down"
              }
            >
              {accessbility.products}

              {accessbility.products === true && (
                <Link id="link_a" to="/product-add">
                  <li
                    className={`side_bar_li ${location.pathname === "/product-add" && "active"
                      }`}
                  >
                    <LocalMallIcon style={{ color: "#bd0404" }} /> &nbsp;
                    Products
                  </li>
                </Link>
              )}

              {accessbility.sells === true && (
                <Link rel="new tap" id="link_a" to="/sell">
                  <li
                    className={`side_bar_li ${location.pathname === "/sell" && "active"
                      }`}
                  >
                    <ShopTwoIcon style={{ color: "#35D378" }} /> &nbsp; Sells
                  </li>
                </Link>
              )}
              ------------- Abu Horain -- added ----------

              {accessbility.pendingOrder === true && (
                <Link id="link_a" to="/pending-order">
                  <li
                    className={`side_bar_li ${location.pathname === "/pending-order" && "active"
                      }`}
                  >
                    <ShoppingCartIcon style={{ color: "#FF8F44" }} /> &nbsp;
                    Pending Order
                  </li>
                </Link>
              )}

              ------------- Mamun -- added ----------
              {accessbility.paymentManage === true && (
                <Link id="link_a" to="/payment-manage">
                  <li
                    className={`side_bar_li ${location.pathname === "/payment-manage" && "active"
                      }`}
                  >
                    <PaymentIcon style={{ color: "#EE69CE" }} /> &nbsp; Pay
                    Manage
                  </li>
                </Link>
              )}
            </div> */}

          </ul>

          {/* <ul className="side_bar_ul">
            {accessbility.sellHistory || accessbility.paymentHistory ? (
              <li
                onClick={(e) => dropDown("History")}
                className={`side_bar_li drop_down_li ${location.pathname === "/history" && "active"
                  }`}
              >
                {" "}
                History <ArrowDropDownIcon />
              </li>
            ) : null}

            <div
              className={down === "History" ? "drop_down active" : "drop_down"}
            >
              {accessbility.sellHistory === true && (
                <Link id="link_a" to="/sell-history">
                  <li
                    className={`side_bar_li ${location.pathname === "/sell-history" && "active"
                      }`}
                  >
                    <HistoryIcon style={{ color: "#11C279" }} /> &nbsp; Sell
                    history
                  </li>
                </Link>
              )}
              {accessbility.paymentHistory === true && (
                <Link id="link_a" to="/payment-history">
                  <li
                    className={`side_bar_li ${location.pathname === "/payment-history" && "active"
                      }`}
                  >
                    <HistoryIcon style={{ color: "#00B5F8" }} /> &nbsp; Pay
                    History
                  </li>
                </Link>
              )}
            </div>
          </ul> */}

          {/* <ul className="side_bar_ul">
            {accessbility.salary === true || accessbility.otherCost === true ? (
              <li
                onClick={(e) => dropDown("Employee")}
                className={`side_bar_li drop_down_li ${location.pathname === "/product-add" && "active"
                  }`}
              >
                {" "}
                Employee <ArrowDropDownIcon />
              </li>
            ) : null}
            <div
              className={down === "Employee" ? "drop_down active" : "drop_down"}
            >
              {accessbility.salary === true && (
                <Link id="link_a" to="/salary">
                  <li
                    className={`side_bar_li ${location.pathname === "/salary" && "active"
                      }`}
                  >
                    <EuroSymbolIcon style={{ color: "#FA6426" }} /> &nbsp;
                    Salary
                  </li>
                </Link>
              )}
              {accessbility.otherCost === true && (
                <Link id="link_a" to="/other-cost">
                  <li
                    className={`side_bar_li ${location.pathname === "/other-cost" && "active"
                      }`}
                  >
                    <MonetizationOnIcon style={{ color: "#00B8F9" }} /> &nbsp;
                    Other Cost
                  </li>
                </Link>
              )}
            </div>
          </ul> */}

          {/* <ul className="side_bar_ul">
            {accessbility.sellReport || accessbility.productReport ? (
              <li
                onClick={(e) => dropDown("Report")}
                className={`side_bar_li drop_down_li ${location.pathname === "/" && "active"
                  }`}
              >
                {" "}
                Report <ArrowDropDownIcon />
              </li>
            ) : null}

            <div
              className={down === "Report" ? "drop_down active" : "drop_down"}
            >
              {accessbility.sellReport === true && (
                <Link id="link_a" to="/sell-report">
                  <li
                    className={`side_bar_li ${down === "sell-report" && "active"
                      }`}
                  >
                    <MenuBookIcon style={{ color: "#FFFF00" }} /> &nbsp; Sell
                    Report
                  </li>
                </Link>
              )}
              {accessbility.productReport === true && (
                <Link id="link_a" to="/product-report">
                  <li
                    className={`side_bar_li ${location.pathname === "/product-report" && "active"
                      }`}
                  >
                    <MenuBookIcon style={{ color: "#FFFF00" }} /> &nbsp; Product
                    Report
                  </li>
                </Link>
              )}
            </div>
          </ul> */}

          {/* <ul className="side_bar_ul">
            {accessbility.vendors === true && (
              <Link id="link_a" to="/vendors">
                <li
                  className={`side_bar_li ${location.pathname === "/vendors" && "active"
                    }`}
                >
                  <StorefrontIcon style={{ color: "white" }} /> &nbsp; Vendors
                </li>
              </Link>
            )}
            {accessbility.addUser === true && (
              <Link id="link_a" to="/add-user">
                <li
                  className={`side_bar_li ${location.pathname === "/add-user" && "active"
                    }`}
                >
                  <PersonAddIcon style={{ color: "#00FFFF" }} /> &nbsp; Add User
                </li>
              </Link>
            )}
            {accessbility.productList === true && (
              <Link id="link_a" to="/products-list">
                <li
                  className={`side_bar_li ${location.pathname === "/products-list" && "active"
                    }`}
                >
                  <FormatListBulletedIcon style={{ color: "#DC3545" }} /> &nbsp;
                  Products List
                </li>
              </Link>
            )}
          </ul> */}


        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps)(SideBar);
