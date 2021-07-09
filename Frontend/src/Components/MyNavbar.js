import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import LocallyStore from './LocallyStore';

const MyNavbar = ({page}) => {
    const [accessibility, setAccessibility] = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = LocallyStore("loggedInUser", {});
    const history = useHistory();
    const logOut = () => {
        setLoggedInUser({});
        setAccessibility({});
        history.replace("/login");
    };


    document.title = `${page} - iBrowser Admin Panel`
    return (
        <>
            <nav className="navbar header-navbar pcoded-header">
                <div className="navbar-wrapper">

                    <div className="navbar-logo">
                        <a className="mobile-menu" id="mobile-collapse" href="#!">
                            <i className="ti-menu"></i>
                        </a>
                        <a className="mobile-search morphsearch-search" href="#">
                            <i className="ti-search"></i>
                        </a>
                        <Link to="/">
                            <img className="img-fluid" src="assets/images/logo.png" width="150px" alt="Theme-Logo" />
                        </Link>
                        <a className="mobile-options">
                            <i className="ti-more"></i>
                        </a>
                    </div>

                    <div className="navbar-container container-fluid">
                        <strong className="p-3">{page} - iBrowser Admin Panel </strong>
                        <ul className="nav-right">
                            <li className="user-profile header-notification">
                                <a href="#!">
                                    <img src="assets/images/avatar-4.jpg" className="img-radius" alt="User-Profile-Image" />
                                    <span>John Doe</span>
                                    <i className="ti-angle-down"></i>
                                </a>
                                <ul className="show-notification profile-notification">
                                    <li>
                                        <a href="#!">
                                            <i className="ti-settings"></i> Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="ti-user"></i> Profile
                                        </a>
                                    </li>
                                    <li onClick={() => logOut()}>
                                        <a href="#">
                                            <i className="ti-unlock"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default MyNavbar;