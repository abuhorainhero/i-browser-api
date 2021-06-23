import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import "./Ads.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';



const Ads = (props) => {


    const { register, handleSubmit, errors } = useForm();

    const [newAds, setNewAds] = useState({});
    const [ads, setAds] = useState([]);
    const [adsUpdate, setAdsUpdate] = useState();
    const [adUpInfo, setAdUpInfo] = useState({});
    const [adDeleteThen, setAdDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    const onSubmit = (data) => {
        console.log(data);

        if (adsUpdate) {
            axios
                .patch(
                    `/api/ads/update-one/${adsUpdate._id}`,
                    data
                )
                .then((res) => {
                    console.log(res);
                    const { ads, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setAdUpInfo(ads);
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
                .post("/api/ads/create", data)
                .then((res) => {
                    console.log(res);
                    const { ads, error, message } = res.data;

                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewAds(ads);
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
        setAdsUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/ads/get-all")
            .then((res) => {
                const { ads, error, message } = res.data;
                setAds(ads);
            })
            .catch((err) => {
                console.log(err.response?.data.message);
                alert(err.response?.data.message);
            });
    }, [adDeleteThen, newAds, adUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        console.log("update ID ; ", id);

        axios
            .get(`/api/ads/get-one/${id}`)
            .then((res) => {
                console.log(res);
                const { ads, error, message } = res.data;
                setAdsUpdate(ads);
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
                `/api/ads/delete-one/${id}`
            )
            .then((res) => {
                console.log(res);
                const { ads, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setAdDeleteThen(ads);
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
                <DashboardHeader name={"Ads Add"} />

                {/* {accessbility.ads === true ? ( */}

                <section className="container-fluid dashboard_content mt-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="title">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter title"
                                        defaultValue={adsUpdate?.title}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.title && (
                                        <span className="text-danger">title is required</span>
                                    )}
                                </div>
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="url">
                                        URL
                                    </label>
                                    <input
                                        type="text"
                                        name="url"
                                        id="url"
                                        placeholder="Enter url"
                                        defaultValue={adsUpdate?.url}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.url && (
                                        <span className="text-danger">url is required</span>
                                    )}
                                </div>
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="instruction">
                                        Instruction
                                    </label>
                                    <input
                                        type="text"
                                        name="instruction"
                                        id="instruction"
                                        placeholder="Enter instruction"
                                        defaultValue={adsUpdate?.instruction}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.instruction && (
                                        <span className="text-danger">instruction is required</span>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="minVisitingTime">
                                        Minimum Visiting Time - second
                                    </label>
                                    <input
                                        type="number"
                                        name="minVisitingTime"
                                        id="minVisitingTime"
                                        placeholder="Enter minVisitingTime"
                                        defaultValue={adsUpdate?.minVisitingTime}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.minVisitingTime && (
                                        <span className="text-danger">minVisitingTime is required</span>
                                    )}
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="revenue">
                                        Revenue - BDT
                                    </label>
                                    <input
                                        type="number"
                                        name="revenue"
                                        id="revenue"
                                        placeholder="Enter revenue"
                                        defaultValue={adsUpdate?.revenue}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.revenue && (
                                        <span className="text-danger">revenue is required</span>
                                    )}
                                </div>

                            </div>

                            <div className="col-md-6 mt-3">
                                <button type="submit" className="btn btn-success mr-2">
                                    {adsUpdate ? "ADS UPDATE" : "ADS ADD"}
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
                        <h2 className="text-center mb-4 mt-5">Present Ad's</h2>
                        {ads?.length > 0 && (
                            <div className="table_div">
                                <Table className="table-responsive" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th> ID</th>
                                            <th> Title</th>
                                            <th> URL</th>
                                            <th> Instruction</th>
                                            <th> Minimum visiting - second</th>
                                            <th> Revenue</th>
                                            <th className="text-center">Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ads.map((info, index) => (
                                            <tr key={info._id} className="text-center">
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {info.title}
                                                </td>
                                                <td>
                                                    {info.url}
                                                </td>
                                                <td>
                                                    {info.instruction}
                                                </td>
                                                <td>
                                                    {info.minVisitingTime}
                                                </td>
                                                <td>
                                                    {info.revenue}
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

export default connect(mapStateToProps)(Ads);