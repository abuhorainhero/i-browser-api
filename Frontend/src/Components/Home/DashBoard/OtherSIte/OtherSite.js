import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import "./OtherSite.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import NotAccess from '../../NotAccess/NotAccess';

const OtherSite = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const [otherSite, setotherSite] = useState([]);
    const [otherSiteUpdate, setotherSiteUpdate] = useState();
    const [otherSiteUpInfo, setotherSiteUpInfo] = useState({});
    const [accessbility, setAccessbility] = useContext(UserContext);

    const onSubmit = (data) => {
        console.log(data);

        if (otherSiteUpdate) {
            axios
                .patch(
                    `/api/other-revenue-site/update-one/${otherSiteUpdate._id}`,
                    data
                )
                .then((res) => {
                    const { otherRevenueSite, error, message } = res.data;
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setotherSiteUpInfo(otherRevenueSite);
                })
                .catch((err) => {
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response.data.message}`
                    );
                });
        }
    };

    const handleClear = () => {
        setotherSiteUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/other-revenue-site/get-all")
            .then((res) => {
                const { otherRevenueSite } = res.data;
                setotherSite(otherRevenueSite);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [otherSiteUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        axios
            .get(`/api/other-revenue-site/get-one/${id}`)
            .then((res) => {
                const { otherRevenueSite } = res.data;
                setotherSiteUpdate(otherRevenueSite);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (

        <div className="row">
            {props.sidebarActive && (
                <div className="col-md-2">
                    <SideBar />
                </div>
            )}
            <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
                <DashboardHeader name={"otherSite Add"} />

                {/* {accessbility?.role === "Admin" ? ( */}

                <section className="container-fluid dashboard_content mt-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="minVisitingTime">
                                        Minimum Visiting Minutes
                                    </label>
                                    <input
                                        type="number"
                                        name="minVisitingTime"
                                        id="minVisitingTime"
                                        placeholder="Enter otherSite minVisitingTime"
                                        defaultValue={otherSiteUpdate?.minVisitingTime}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.minVisitingTime && (
                                        <span className="text-danger">minVisitingTime is required</span>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="revenue">
                                        Revenue
                                    </label>
                                    <input
                                        type="number"
                                        name="revenue"
                                        id="revenue"
                                        placeholder="Enter revenue"
                                        defaultValue={otherSiteUpdate?.revenue}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.revenue && (
                                        <span className="text-danger">revenue is required</span>
                                    )}
                                </div>

                            </div>

                            <div className="col-md-6 mt-3">
                                {otherSiteUpdate ? <button type="submit" className="btn btn-success mr-2">
                                    Other Site UPDATE
                                </button> : null}

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
                        <h2 className="text-center mb-4 mt-5">Present otherSite's</h2>
                        {otherSite?.length > 0 && (
                            <div className="table_div">
                                <Table className="table-responsive" striped bordered hover size="sm">
                                    <thead>
                                        <tr className="text-center">
                                            <th> Minimum Visiting minutes</th>
                                            <th> revenue</th>
                                            <th>Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {otherSite.map((info, index) => (
                                            <tr key={info._id} className="text-center">

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

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                </section>

                {/* // ) : (
                //     <NotAccess />
                // )} */}

            </div>
            <NotificationContainer />
        </div>

    );
};

const mapStateToProps = (state) => ({
    sidebarActive: state.sidebarActive
})

export default connect(mapStateToProps)(OtherSite);