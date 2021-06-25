import React from "react";
import "./DashboardHeader.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import { connect } from "react-redux";
import { SIDEBAR_ACTIVE } from "../../../../Redux/actions/Types";

const DashboardHeader = ({ name, state, sidebarActive }) => {
  return (
    <header
      className="dashboard_header"
      style={state.sidebarActive ? { width: "84%" } : { width: "100%" }}
    >
      <ul className="header_ul">
        <li className="sidebar_bar py-2" onClick={() => sidebarActive()}>
          <ViewWeekIcon style={{ transform: "rotate(90deg)" }} />
        </li>

        <h3 className="page_name">{name}</h3>

        <li className="header_li">
          <Link to="/profile">
            <AccountCircleIcon className="header_icon" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => {
  return {
    sidebarActive: () => dispatch({ type: SIDEBAR_ACTIVE }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
