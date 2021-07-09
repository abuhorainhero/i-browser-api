import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';

const RejectWithdraw = () => {
    const [rejectEntry, setrejectEntry] = useState([]);
    const [users, setUsers] = useState([]);
    const [methods, setMethods] = useState([]);

    useEffect(() => {
        axios
            .get("https://i-browser-api.herokuapp.com/api/withdrawal-request/get-all")
            .then((res) => {
                const { withdrawalRequest, error, message } = res.data;
                setrejectEntry(withdrawalRequest?.filter(request => request?.status === "reject"));
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

        axios.get("https://i-browser-api.herokuapp.com/api/withdrawal-method/get-all")
            .then((res => setMethods(res.data.withdrawalMethod)))
            .catch((err) => console.log(err));

        axios.get("https://i-browser-api.herokuapp.com/api/user/get-all")
            .then(res => setUsers(res.data.user))
            .catch((err) => console.log(err));
    }, [])


    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">


                    {/* navbar */}
                    <MyNavbar page={"Reject Withdraw Request"} />
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
                                                {/* <!-- Hover table card start --> */}
                                                <div class="card col-md-12">
                                                    <div class="card-header">
                                                        <h5>Rejected Withdraw Request</h5>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Name</th>
                                                                        <th>Wallet Amount</th>
                                                                        <th>Withdraw Amount</th>
                                                                        <th>Method</th>
                                                                        <th>Account No</th>
                                                                        <th>Status</th>
                                                                        <th>Note</th>
                                                                        <th>Request Time</th>
                                                                        <th>Update Time</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        rejectEntry?.map(reject => (
                                                                            <tr key={reject?._id}>
                                                                                <th scope="row">105</th>
                                                                                <td>{users?.find(user => user?._id === reject?.userId)?.name}</td>
                                                                                <td>{users?.find(user => user?._id === reject?.userId)?.walletAmount}</td>
                                                                                <td>{reject?.amount}</td>
                                                                                <td>{methods?.find(method => method?._id === reject?.withdrawalMethodId)?.title}</td>
                                                                                <td>{reject?.accountNo}</td>
                                                                                <td ><b>{reject?.status}</b></td>
                                                                                <td>{reject?.note}</td>
                                                                                <td>{new Date(`${reject?.createdAt}`).toLocaleString("bn")}</td>
                                                                                <td>{new Date(`${reject?.updatedAt}`).toLocaleString("bn")}</td>

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
                                        <div id="styleSelector">
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

export default RejectWithdraw;