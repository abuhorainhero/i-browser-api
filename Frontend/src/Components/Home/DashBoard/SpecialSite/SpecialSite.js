import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import "./SpecialSite.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import NotAccess from '../../NotAccess/NotAccess';

const SpecialSite = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const [newspecialSite, setNewspecialSite] = useState({});
    const [specialSite, setspecialSite] = useState([]);
    const [specialSiteUpdate, setspecialSiteUpdate] = useState();
    const [specialSiteUpInfo, setspecialSiteUpInfo] = useState({});
    const [specialSiteDeleteThen, setspecialSiteDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    const onSubmit = (data) => {
        console.log(data);

        if (specialSiteUpdate) {
            axios
                .patch(
                    `/api/special-revenue-site/update-one/${specialSiteUpdate._id}`,
                    data
                )
                .then((res) => {
                    //console.log("specialSite 39 =", res);
                    const { specialRevenueSite, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setspecialSiteUpInfo(specialRevenueSite);
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
                .post("/api/special-revenue-site/create", data)
                .then((res) => {
                    console.log("specialSite 57 =", res);
                    const { specialRevenueSite, error, message } = res.data;
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewspecialSite(specialRevenueSite);
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
        setspecialSiteUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/special-revenue-site/get-all")
            .then((res) => {
                //console.log("specialSite 83 =", res);
                const { specialRevenueSite, error, message } = res.data;
                setspecialSite(specialRevenueSite);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [specialSiteDeleteThen, newspecialSite, specialSiteUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        //console.log("update ID ; ", id);

        axios
            .get(`/api/special-revenue-site/get-one/${id}`)
            .then((res) => {
                //console.log(res);
                const { specialRevenueSite, error, message } = res.data;
                setspecialSiteUpdate(specialRevenueSite);
            })
            .catch((err) => {
                //console.log(err.response.data.message);
                //alert(err.response.data.message);
            });
    };

    const handleDelete = (id) => {
        //console.log("update ID ; ", id);

        axios
            .delete(
                `/api/special-revenue-site/delete-one/${id}`
            )
            .then((res) => {
                //console.log(res);
                const { specialRevenueSite, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setspecialSiteDeleteThen(specialRevenueSite);
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
                <DashboardHeader name={"specialSite Add"} />

                {/* {accessbility?.role === "Admin" ? ( */}

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
                                            placeholder="Enter specialSite title"
                                            defaultValue={specialSiteUpdate?.title}
                                            className="form-control"
                                            ref={register({ required: true })}
                                        />
                                        {errors.title && (
                                            <span className="text-danger">title is required</span>
                                        )}
                                    </div>

                                    <div className="input-group  my-2">
                                        <label className="input-group-text" htmlFor="url">
                                            Site url
                                        </label>
                                        <input
                                            type="text"
                                            name="url"
                                            id="url"
                                            placeholder="Enter specialSite url"
                                            defaultValue={specialSiteUpdate?.url}
                                            className="form-control"
                                            ref={register({ required: true })}
                                        />
                                        {errors.url && (
                                            <span className="text-danger">url is required</span>
                                        )}
                                    </div>

                                    <div className="input-group  my-2">
                                        <label className="input-group-text" htmlFor="minVisitingTime">
                                            Minimum Visiting Minutes
                                        </label>
                                        <input
                                            type="number"
                                            name="minVisitingTime"
                                            id="minVisitingTime"
                                            placeholder="Enter specialSite minVisitingTime"
                                            defaultValue={specialSiteUpdate?.minVisitingTime}
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
                                            defaultValue={specialSiteUpdate?.revenue}
                                            className="form-control"
                                            ref={register({ required: true })}
                                        />
                                        {errors.revenue && (
                                            <span className="text-danger">revenue is required</span>
                                        )}
                                    </div>

                                    <div className="input-group  my-2">
                                        <label className="input-group-text" htmlFor="icon">
                                            Site Icon
                                        </label>
                                        <input
                                            type="file"
                                            name="icon"
                                            id="icon"
                                            placeholder="Enter specialSite icon"
                                            defaultValue={specialSiteUpdate?.icon}
                                            className="form-control"
                                            ref={register({ required: true })}
                                        />
                                        {errors.icon && (
                                            <span className="text-danger">icon is required</span>
                                        )}
                                    </div>


                                </div>

                                <div className="col-md-6 mt-3">
                                    <button type="submit" className="btn btn-success mr-2">
                                        {specialSiteUpdate ? "SpecialSite UPDATE" : "SpecialSite ADD"}
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
                            <h2 className="text-center mb-4 mt-5">Present specialSite's</h2>
                            {specialSite?.length > 0 && (
                                <div className="table_div">
                                    <Table className="table-responsive" striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th> Count</th>
                                                <th> title</th>
                                                <th> icon</th>
                                                <th> url</th>
                                                <th> Minimum Visiting minutes</th>
                                                <th> revenue</th>
                                                <th className="text-center">Modify</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {specialSite.map((info, index) => (
                                                <tr key={info._id} className="text-center">
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {info.title}
                                                    </td>
                                                    <td>
                                                        <img style={{ height: "20px", width: "20px" }} src={info.icon} alt="icon" />
                                                    </td>
                                                    <td>
                                                        {info.url}
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

                // ) : (
                //     <NotAccess />
                // )}

            </div>
            <NotificationContainer />
        </div>

    );
};

const mapStateToProps = (state) => ({
    sidebarActive: state.sidebarActive
})

export default connect(mapStateToProps)(SpecialSite);