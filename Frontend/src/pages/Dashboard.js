import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';

const Dashboard = () => {
    const [accessibility, setAccessibility] = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const [ads, setAds] = useState([]);
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);
    const [withdrawalRequest, setWithdrawalRequest] = useState([]);
    const [methods, setMethods] = useState([]);

    console.log(users, "..", ads, "...", country, "...", city, "...")

    useEffect(() => {
        axios.get('https://i-browser-api.herokuapp.com/api/user/get-all')
            .then(res => {
                setUsers(res.data.user)
            }).catch(err => {
                console.error(err)
            });

        axios.get('https://i-browser-api.herokuapp.com/api/ads/get-all')
            .then(res => {
                setAds(res.data.ads)
            }).catch(err => {
                console.error(err)
            });

        axios.get('https://i-browser-api.herokuapp.com/api/country/get-all')
            .then(res => {
                setCountry(res.data.country)
            }).catch(err => {
                console.error(err)
            });

        axios.get('https://i-browser-api.herokuapp.com/api/city/get-all')
            .then(res => {
                setCity(res.data.city)
            }).catch(err => {
                console.error(err)
            });

        axios.get('https://i-browser-api.herokuapp.com/api/withdrawal-request/get-all')
            .then(res => {
                setWithdrawalRequest(res.data.withdrawalRequest)
            }).catch(err => {
                console.error(err)
            });

        axios.get("https://i-browser-api.herokuapp.com/api/withdrawal-method/get-all")
            .then((res => setMethods(res.data.withdrawalMethod)))
            .catch((err) => console.log(err));
    }, [])


    useEffect(() => {
        // window.location.reload();
    }, [])

    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">

                    {/* navbar */}
                    <MyNavbar page={"iBrowser Admin Panel"} />
                    {/* navbar */}

                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">

                            {/* sidebar */}
                            <MySidebar />
                            {/* sidebar */}

                        </div>


                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">

                                        <div className="page-body">
                                            <div className="row">
                                                {/* <!-- card1 start --> */}
                                                <div className="col-md-6 col-xl-3">
                                                    <div className="card widget-card-1">
                                                        <div className="card-block-small">
                                                            <i className="icofont icofont-users bg-c-blue card1-icon"></i>
                                                            <span className="text-c-blue f-w-600">Total User</span>
                                                            <h4>{users?.length}</h4>
                                                            <div>
                                                                <span className="f-left m-t-10 text-muted">
                                                                    <i className="text-c-blue f-16 icofont icofont-warning m-r-10"></i>Accoding to reg. data
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- card1 end -->
                                            <!-- card1 start --> */}
                                                <div className="col-md-6 col-xl-3">
                                                    <div className="card widget-card-1">
                                                        <div className="card-block-small">
                                                            <i className="icofont icofont-earth bg-c-pink card1-icon"></i>
                                                            <span className="text-c-pink f-w-600">Total Country</span>
                                                            <h4>{country?.length}</h4>
                                                            <div>
                                                                <span className="f-left m-t-10 text-muted">
                                                                    <i className="text-c-pink f-16 icofont icofont-calendar m-r-10"></i>Last update at 6:20 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- card1 end -->
                                            <!-- card1 start --> */}
                                                <div className="col-md-6 col-xl-3">
                                                    <div className="card widget-card-1">
                                                        <div className="card-block-small">
                                                            <i className="icofont icofont-globe bg-c-green card1-icon"></i>
                                                            <span className="text-c-green f-w-600">Total City</span>
                                                            <h4>{city?.length}</h4>
                                                            <div>
                                                                <span className="f-left m-t-10 text-muted">
                                                                    <i className="text-c-green f-16 icofont icofont-tag m-r-10"></i>Last update at 6:20 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- card1 end -->
                                            <!-- card1 start --> */}
                                                <div className="col-md-6 col-xl-3">
                                                    <div className="card widget-card-1">
                                                        <div className="card-block-small">
                                                            <i className="icofont icofont-paper-plane bg-c-yellow card1-icon"></i>
                                                            <span className="text-c-yellow f-w-600">Total Withdraw</span>
                                                            <h4>{withdrawalRequest?.length}</h4>
                                                            <div>
                                                                <span className="f-left m-t-10 text-muted">
                                                                    <i className="text-c-yellow f-16 icofont icofont-refresh m-r-10"></i>Last update at 6:20 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- card1 end -->

                                            <!-- Data widget start --> */}
                                                <div className="col-md-12 col-xl-6">
                                                    <div className="card project-task">
                                                        <div className="card-header">
                                                            <div className="card-header-left ">
                                                                <h5>Active Users</h5>
                                                            </div>
                                                            <div className="card-header-right">
                                                                <ul className="list-unstyled card-option">
                                                                    <li><i className="icofont icofont-simple-left "></i></li>
                                                                    <li><i className="icofont icofont-maximize full-card"></i></li>
                                                                    <li><i className="icofont icofont-minus minimize-card"></i></li>
                                                                    <li><i className="icofont icofont-refresh reload-card"></i></li>
                                                                    <li><i className="icofont icofont-error close-card"></i></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-block p-b-10">
                                                            <div className="table-responsive">
                                                                <table className="table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Name</th>
                                                                            <th>Time Spents (Minutes)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            users?.map((user) => (
                                                                                <tr key={user?._id}>
                                                                                    <td>
                                                                                        <div className="task-contain">
                                                                                            <h6 className="bg-c-blue d-inline-block text-center">SR</h6>
                                                                                            <p className="d-inline-block m-l-20">{user?.name}</p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p className="d-inline-block m-r-20">{user?.totalMinuteServed}</p>
                                                                                        <div className="progress d-inline-block">
                                                                                            <div className="progress-bar bg-c-blue" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                                                                                                style={user?.totalMinuteServed >= 100 ? { width: "100%" }
                                                                                                    : user?.totalMinuteServed >= 50 ? { width: "50%" }
                                                                                                        : user?.totalMinuteServed > 0 ? { width: "20%" }
                                                                                                            : { width: "0%" }
                                                                                                }>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>))
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Hover table card start --> */}
                                                <div className="card col-md-12 col-xl-6">
                                                    <div className="card-header">
                                                        <h5>Recent Withdraw Request</h5>
                                                        <div className="card-header-right">
                                                            <ul className="list-unstyled card-option">
                                                                <li><i className="icofont icofont-simple-left "></i></li>
                                                                <li><i className="icofont icofont-maximize full-card"></i></li>
                                                                <li><i className="icofont icofont-minus minimize-card"></i></li>
                                                                <li><i className="icofont icofont-refresh reload-card"></i></li>
                                                                <li><i className="icofont icofont-error close-card"></i></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card-block table-border-style">
                                                        <div className="table-responsive">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Methood</th>
                                                                        <th>Account No</th>
                                                                        <th>Amount</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        withdrawalRequest?.map(withdraw => (
                                                                            <tr key={withdraw?._id}>
                                                                                <th scope="row">{users?.find(user => user?._id === withdraw?.userId)?.name}</th>
                                                                                <td>
                                                                                    {methods?.find(method => method._id === withdraw?.withdrawalMethodId)?.title}
                                                                                </td>
                                                                                <td>{withdraw.accountNo}</td>
                                                                                <td>{withdraw.amount}</td>
                                                                                <td>{withdraw.status}</td>
                                                                            </tr>
                                                                        ))
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Hover table card end --> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default Dashboard;