import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import NotAccess from '../../NotAccess/NotAccess';

const SuccessEntry = (props) => {
    const [successEntry, setsuccessEntry] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [methods, setMethods] = useState([]);

    useEffect(() => {
        axios
            .get("/api/withdrawal-request/get-all")
            .then((res) => {
                const { withdrawalRequest, error, message } = res.data;
                setsuccessEntry(withdrawalRequest?.filter(request => request?.status === "Success"));
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

        axios.get("/api/withdrawal-method/get-all")
            .then((res => setMethods(res.data.withdrawalMethod)))
            .catch((err) => console.log(err));

        axios.get("/api/user/get-all")
            .then(res => setUsers(res.data.user))
            .catch((err) => console.log(err));
    }, [])

    return (
        <div className="row">
            {props.sidebarActive && (
                <div className="col-md-2">
                    <SideBar />
                </div>
            )}
            <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
                <DashboardHeader name={"Withdrawal Request Success Entry"} />

                {/* {accessbility.successEntry === true ? ( */}

                <section className="container-fluid dashboard_content mt-4">

                    <div className="my-3">
                        <h2 className="text-center mb-4 mt-5">Success Withdrawal Request's</h2>
                        {successEntry?.length > 0 && (
                            <div className="table_div">
                                <Table className="table-responsive" striped bordered hover size="sm">
                                    <thead>
                                        <tr className="text-center">
                                            <th> ID</th>
                                            <th> Username</th>
                                            <th> Method</th>
                                            <th> Account No</th>
                                            <th> Status</th>
                                            <th> Withdraw Amount</th>
                                            <th> Wallet Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {successEntry.map((info, index) => (
                                            <tr key={info._id} className="text-center">
                                                <td>
                                                    {info._id}
                                                </td>
                                                <td>
                                                    {users?.find(user => user?._id === info?.userId)?.name}
                                                </td>
                                                <td>
                                                    {methods?.find(method => method._id === info.withdrawalMethodId)?.title}
                                                </td>
                                                <td>
                                                    {info.accountNo}
                                                </td>
                                                <td className="text-success">
                                                    {info.status}
                                                </td>
                                                <td>
                                                    {info.amount}
                                                </td>
                                                <td>
                                                    {users?.find(user => user._id === info.userId)?.walletAmount}
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
            <NotificationContainer />
        </div>

    );
};

const mapStateToProps = (state) => ({
    sidebarActive: state.sidebarActive
})

export default connect(mapStateToProps)(SuccessEntry);