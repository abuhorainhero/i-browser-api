import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import LocallyStore from './LocallyStore';

const MySidebar = () => {
    const [accessibility, setAccessibility] = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = LocallyStore("loggedInUser", {});
    const history = useHistory();

    const logOut = () => {
        setLoggedInUser({});
        setAccessibility({});
        history.replace("/login");
    };

    return (
        <>
            <nav className="pcoded-navbar">
                <div className="sidebar_toggle"><NavLink to="#"><i className="icon-close icons"></i></NavLink></div>
                <div className="pcoded-inner-navbar main-menu">
                    <ul className="pcoded-item pcoded-left-item">
                        <li className="active">
                            <Link to="/">
                                <span className="pcoded-micon"><i className="ti-home"></i><b>D</b></span>
                                <span className="pcoded-mtext" data-i18n="nav.dash.main">Dashboard</span>
                                <span className="pcoded-mcaret"></span>
                            </Link>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-user"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">Users</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="/users">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All User</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link to="/admin">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Admin User</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-mobile"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">Ads</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="/all-ads">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All Ads</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                {/* <li className=" ">
                                    <Link to="/add-ads">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Add New</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li> */}
                            </ul>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-view-grid"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">Interest</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="/all-interest">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All Interest</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                {/* <li className=" ">
                                    <Link to="/add-interest">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Add New</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li> */}
                            </ul>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-light-bulb"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">Country</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="/all-country">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All Country</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                {/* <li className=" ">
                                    <Link to="/add-country">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Add New</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li> */}
                            </ul>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-layout-grid2-alt"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">City</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="/all-city">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All City</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                {/* <li className=" ">
                                    <Link to="/add-city">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Add New</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li> */}
                            </ul>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-rss"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">News</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="all-news">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All News</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                {/* <li className=" ">
                                    <Link to="/add-news">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Add New</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li> */}
                            </ul>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-money"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">Browsing Revenue</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="/all-site-revenue">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All Sites</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link to="/special-site-revenue">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Special Revenue</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="pcoded-hasmenu">
                            <NavLink to="#" onClick={e => e.preventDefault()}>
                                <span className="pcoded-micon"><i className="ti-bolt"></i></span>
                                <span className="pcoded-mtext" data-i18n="nav.basic-components.main">Withdraw</span>
                                <span className="pcoded-mcaret"></span>
                            </NavLink>
                            <ul className="pcoded-submenu">
                                <li className=" ">
                                    <Link to="/all-withdraw">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.alert">All Entry</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link to="/success-withdraw">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Successful Entry</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link to="/reject-withdraw">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Rejected Entry</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                                <li className=" ">
                                    <Link to="/withdraw-method">
                                        <span className="pcoded-micon"><i className="ti-angle-right"></i></span>
                                        <span className="pcoded-mtext" data-i18n="nav.basic-components.breadcrumbs">Withdraw Method</span>
                                        <span className="pcoded-mcaret"></span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="pcoded-item pcoded-left-item">
                        <li onClick={() => logOut()}>
                            <a href="#">
                                <span className="pcoded-micon"><i className="ti-unlock"></i><b>FC</b></span>
                                <span className="pcoded-mtext" data-i18n="nav.form-components.main">Logout</span>
                                <span className="pcoded-mcaret"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    );
};

export default MySidebar;