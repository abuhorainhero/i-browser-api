import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import NotAccess from '../../NotAccess/NotAccess';

const AllEntry = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const [newallEntry, setNewallEntry] = useState({});
    const [allEntry, setallEntry] = useState([]);
    const [allEntryUpdate, setallEntryUpdate] = useState();
    const [allEntryUpInfo, setallEntryUpInfo] = useState({});
    const [accessbility, setAccessbility] = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [methods, setMethods] = useState([]);
    const [newStatus, setNewStatus] = useState("");

    const onSubmit = (data) => {
        if (allEntryUpdate) {
            axios
                .patch(
                    `/api/withdrawal-request/update-one/${allEntryUpdate._id}`,
                    data
                )
                .then((res) => {
                    //console.log("allEntry 39 =", res);
                    const { withdrawalRequest, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setallEntryUpInfo(withdrawalRequest);
                })
                .catch((err) => {
                    //console.log(err.response.data.message);
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response.data.message}`
                    );
                });
        } else {
            axios
                .post("/api/withdrawal-request/create", data)
                .then((res) => {
                    //console.log("allEntry 57 =", res);
                    const { withdrawalRequest, error, message } = res.data;

                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewallEntry(withdrawalRequest);
                })
                .catch((err) => {
                    //console.log(err.response.data.message);
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response.data.message}`
                    );
                });
        }
    };

    const handleClear = () => {
        //console.log("Clear Click");
        setallEntryUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/withdrawal-request/get-all")
            .then((res) => {
                //console.log("allEntry 83 =", res);
                const { withdrawalRequest, error, message } = res.data;
                setallEntry(withdrawalRequest);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [newallEntry, allEntryUpInfo]);

    useEffect(() => {
        axios.get("/api/withdrawal-method/get-all")
            .then((res => setMethods(res.data.withdrawalMethod)))
            .catch((err) => console.log(err));

        axios.get("/api/user/get-all")
            .then(res => setUsers(res.data.user))
            .catch((err) => console.log(err));
    }, [])

    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        axios
            .get(`/api/withdrawal-request/get-one/${id}`)
            .then((res) => {
                //console.log(res);
                const { withdrawalRequest, error, message } = res.data;
                setallEntryUpdate(withdrawalRequest);
            })
            .catch((err) => {
                //console.log(err.response.data.message);
                //alert(err.response.data.message);
            });
    };

    // --------------------- handle status --------------------
    const handleStatus = (e) => {
        console.log(e.target.value)
        setNewStatus(e.target.value)
    }

    return (
        <div className="row">
            {props.sidebarActive && (
                <div className="col-md-2">
                    <SideBar />
                </div>
            )}
            <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
                <DashboardHeader name={"Withdrawal Request All Entry"} />

                {/* {accessbility.allEntry === true ? ( */}

                <section className="container-fluid dashboard_content mt-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="name">
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter Name"
                                        defaultValue={users?.find(user => user?._id === allEntryUpdate?.userId)?.name}
                                        className="form-control"
                                        readOnly
                                    />
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="withdrawalMethodId">
                                        Withdrawal Method
                                    </label>
                                    <input
                                        type="text"
                                        name="withdrawalMethodId"
                                        id="withdrawalMethodId"
                                        placeholder="Enter Name"
                                        value={methods?.find(method => method?._id === allEntryUpdate?.withdrawalMethodId)?.title}
                                        className="form-control"
                                        readOnly
                                    />
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="amount">
                                        Withdrawal Amount
                                    </label>
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        placeholder="Enter amount"
                                        value={allEntryUpdate?.amount}
                                        className="form-control"
                                        readOnly
                                    />
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="walletAmount">
                                        Wallet Amount
                                    </label>
                                    <input
                                        type="text"
                                        name="walletAmount"
                                        id="walletAmount"
                                        placeholder="Enter walletAmount"
                                        value={users?.find(user => user?._id === allEntryUpdate?.userId)?.walletAmount}
                                        className="form-control"
                                        readOnly
                                    />
                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="accountNo">
                                        Account No
                                    </label>
                                    <input
                                        type="text"
                                        name="accountNo"
                                        id="accountNo"
                                        placeholder="Enter accountNo"
                                        value={allEntryUpdate?.accountNo}
                                        className="form-control"
                                        readOnly
                                    />
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="status">
                                        Status
                                    </label>
                                    <select
                                        onChange={handleStatus}
                                        name="status"
                                        id="status"
                                        className="form-control"
                                        ref={register({ required: true })}
                                    >
                                        <option >Pending</option>
                                        <option className='text-success' >Success</option>
                                        <option className='text-danger'>Reject</option>
                                    </select>
                                    {errors.status && (
                                        <span className="text-danger">
                                            status is required
                                        </span>
                                    )}
                                </div>

                                {newStatus === "Reject" &&
                                    <div className="input-group  my-2">
                                        <label className="input-group-text" htmlFor="note">
                                            Note
                                        </label>

                                        <textarea name="note"
                                            id="note"
                                            cols="auto"
                                            rows="4"
                                            className="form-control"
                                            ref={register({ required: true })}>
                                        </textarea>

                                        {errors.status && (
                                            <span className="text-danger">
                                                status is required
                                            </span>
                                        )}
                                    </div>}

                            </div>

                            <div className="col-md-6 mt-3">
                                {
                                    allEntryUpdate ? <button type="submit" className="btn btn-success mr-2">
                                        Request UPDATE
                                    </button> : null
                                }
                                <button
                                    type="reset"
                                    className="btn btn-warning"
                                    onClick={() => handleClear()}
                                >
                                    RESET
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="my-3">
                        <h2 className="text-center mb-4 mt-5">Present All Withdrawal Request's</h2>
                        {allEntry?.length > 0 && (
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
                                            <th>Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allEntry.map((info, index) => (
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
                                                <td>
                                                    {info.status}
                                                </td>
                                                <td>
                                                    {info.amount}
                                                </td>
                                                <td>
                                                    {users?.find(user => user._id === info.userId)?.walletAmount}
                                                </td>
                                                <td className="text-center">
                                                    {info.status === "Success" || info.status === "Reject" ? "worked" :
                                                        <span
                                                            className="btn btn-info"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleUpdate(info._id)}
                                                        >
                                                            <EditIcon />
                                                        </span>
                                                    }
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

export default connect(mapStateToProps)(AllEntry);