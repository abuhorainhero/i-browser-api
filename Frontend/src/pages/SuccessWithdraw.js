import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';

const SuccessWithdraw = () => {
    const [successEntry, setsuccessEntry] = useState([]);
    const [users, setUsers] = useState([]);
    const [methods, setMethods] = useState([]);

    useEffect(() => {
        axios
            .get("https://i-browser-api.herokuapp.com/api/withdrawal-request/get-all")
            .then((res) => {
                const { withdrawalRequest, error, message } = res.data;
                setsuccessEntry(withdrawalRequest?.filter(request => request?.status === "success"));
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
                <MyNavbar page={"Success Withdraw Request"} />
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
                                                    <h5>Successful Withdraw Request</h5>
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
                                                                        successEntry?.map(success => (
                                                                            <tr key={success?._id}>
                                                                                <th scope="row">105</th>
                                                                                <td>{users?.find(user => user?._id === success?.userId)?.name}</td>
                                                                                <td>{users?.find(user => user?._id === success?.userId)?.walletAmount}</td>
                                                                                <td>{success?.amount}</td>
                                                                                <td>{methods?.find(method => method?._id === success?.withdrawalMethodId)?.title}</td>
                                                                                <td>{success?.accountNo}</td>
                                                                                <td ><b>{success?.status}</b></td>
                                                                                <td>{success?.note}</td>
                                                                                <td>{new Date(`${success?.createdAt}`).toLocaleString("bn")}</td>
                                                                                <td>{new Date(`${success?.updatedAt}`).toLocaleString("bn")}</td>

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

export default SuccessWithdraw;