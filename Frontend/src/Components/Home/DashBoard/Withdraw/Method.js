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

const Method = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const [newmethod, setNewmethod] = useState({});
    const [method, setmethod] = useState([]);
    const [methodUpdate, setmethodUpdate] = useState();
    const [methodUpInfo, setmethodUpInfo] = useState({});
    const [methodDeleteThen, setmethodDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    const onSubmit = (data) => {
        if (methodUpdate) {
            axios
                .patch(
                    `/api/withdrawal-method/update-one/${methodUpdate._id}`,
                    data
                )
                .then((res) => {
                    //console.log("method 39 =", res);
                    const { withdrawalMethod, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setmethodUpInfo(withdrawalMethod);
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
                .post("/api/withdrawal-method/create", data)
                .then((res) => {
                    //console.log("method 57 =", res);
                    const { withdrawalMethod, error, message } = res.data;

                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewmethod(withdrawalMethod);
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
        setmethodUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/withdrawal-method/get-all")
            .then((res) => {
                //console.log("method 83 =", res);
                const { withdrawalMethod, error, message } = res.data;
                setmethod(withdrawalMethod);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [methodDeleteThen, newmethod, methodUpInfo]);


    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        axios
            .get(`/api/withdrawal-method/get-one/${id}`)
            .then((res) => {
                //console.log(res);
                const { withdrawalMethod, error, message } = res.data;
                setmethodUpdate(withdrawalMethod);
            })
            .catch((err) => {
                //console.log(err.response.data.message);
                //alert(err.response.data.message);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(
                `/api/withdrawal-method/delete-one/${id}`
            )
            .then((res) => {
                //console.log(res);
                const { withdrawalMethod, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setmethodDeleteThen(withdrawalMethod);
            })
            .catch((err) => {
                //console.log(err.response.data.message);
                createNotification("warning", "FAILED", `${err.response.data.message}`);
            });

    }

    return (

        <div className="row">
            {props.sidebarActive && (
                <div className="col-md-2">
                    <SideBar />
                </div>
            )}
            <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
                <DashboardHeader name={"Withdrawal Method Add"} />

                {/* {accessbility.method === true ? ( */}

                <section className="container-fluid dashboard_content mt-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="title">
                                        Method Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter method title"
                                        defaultValue={methodUpdate?.title}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.title && (
                                        <span className="text-danger">title is required</span>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6"></div>

                            <div className="col-md-6 mt-3">
                                <button type="submit" className="btn btn-success mr-2">
                                    {methodUpdate ? "Method UPDATE" : "Method ADD"}
                                </button>{" "}
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
                        <h2 className="text-center mb-4 mt-5">Present method's</h2>
                        {method?.length > 0 && (
                            <div className="table_div">
                                <Table className="table-responsive" striped bordered hover size="sm">
                                    <thead>
                                        <tr className="text-center">
                                            <th> ID</th>
                                            <th> Title</th>
                                            <th> Create Time</th>
                                            <th> Last Update</th>
                                            <th>Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {method.map((info, index) => (
                                            <tr key={info._id} className="text-center">
                                                <td>
                                                    {info._id}
                                                </td>
                                                <td>
                                                    {info.title}
                                                </td>
                                                <td>
                                                    {new Date(info.createdAt).toLocaleString("bn")}
                                                </td>
                                                <td>
                                                    {new Date(info.updatedAt).toLocaleString("bn")}
                                                </td>
                                                <td className="text-center">
                                                    <span
                                                        className="btn btn-info"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleUpdate(info._id)}
                                                    >
                                                        <EditIcon />
                                                    </span>{" "}
                                                    ||{" "}
                                                    <span
                                                        className="btn btn-danger"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(info._id)}
                                                    >
                                                        <DeleteForeverIcon />
                                                    </span>
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

export default connect(mapStateToProps)(Method);