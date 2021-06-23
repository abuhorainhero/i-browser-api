import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import "./Interest.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';



const Interest = (props) => {

    const { register, handleSubmit, errors } = useForm();

    const [newInterest, setNewInterest] = useState({});
    const [interest, setInterest] = useState([]);
    const [interestUpdate, setInterestUpdate] = useState();
    const [intUpInfo, setIntUpInfo] = useState({});
    const [intDeleteThen, setIntDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    const onSubmit = (data) => {
        console.log(data);

        if (interestUpdate) {
            axios
                .patch(
                    `/api/interest/update-one/${interestUpdate._id}`,
                    data
                )
                .then((res) => {
                    console.log(res);
                    const { interest, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setIntUpInfo(interest);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response.data.message}`
                    );
                });
        } else {
            axios
                .post("/api/interest/create", data)
                .then((res) => {
                    console.log(res);
                    const { interest, error, message } = res.data;

                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewInterest(interest);
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response.data.message}`
                    );
                });
        }
    };

    const handleClear = () => {
        console.log("Clear Click");
        setInterestUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/interest/get-all")
            .then((res) => {
                const { interest, error, message } = res.data;
                setInterest(interest);
            })
            .catch((err) => {
                console.log(err.response?.data.message);
                alert(err.response?.data.message);
            });
    }, [intDeleteThen, newInterest, intUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        console.log("update ID ; ", id);

        axios
            .get(`/api/interest/get-one/${id}`)
            .then((res) => {
                console.log(res);
                const { interest, error, message } = res.data;
                setInterestUpdate(interest);
            })
            .catch((err) => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
            });
    };

    const handleDelete = (id) => {
        console.log("update ID ; ", id);

        axios
            .delete(
                `/api/interest/delete-one/${id}`
            )
            .then((res) => {
                console.log(res);
                const { interest, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setIntDeleteThen(interest);
            })
            .catch((err) => {
                console.log(err.response.data.message);
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
                <DashboardHeader name={"All Interest"} />

                {/* {accessbility.interest === true ? ( */}

                <section className="container-fluid dashboard_content mt-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="topic">
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        name="topic"
                                        id="topic"
                                        placeholder="Enter topic"
                                        defaultValue={interestUpdate?.topic}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.topic && (
                                        <span className="text-danger">topic is required</span>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6 mt-3">
                                <button type="submit" className="btn btn-success mr-2">
                                    {interestUpdate ? "INTEREST UPDATE" : "INTEREST ADD"}
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
                        <h2 className="text-center mb-4 mt-5">Present Interest</h2>
                        {interest?.length > 0 && (
                            <div className="table_div">

                                <Table className="">
                                    <thead>
                                        <tr>
                                            <th> Count</th>
                                            <th> Topic</th>
                                            <th> Total User</th>
                                            <th> Total News</th>
                                            <th className="text-center">Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {interest.map((info, index) => (
                                            <tr key={info._id} className="text-center">
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {info.topic}
                                                </td>
                                                <td>
                                                    {"users"}
                                                </td>
                                                <td>
                                                    {"news"}
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

                {/* ): (
        <NotAccess />
      )} */}

            </div>
            <NotificationContainer />
        </div>
    );
};

const mapStateToProps = (state) => ({
    sidebarActive: state.sidebarActive,
});

export default connect(mapStateToProps)(Interest);