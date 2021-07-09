import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import "./News.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import NotAccess from '../../NotAccess/NotAccess';

const News = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const [newnews, setNewnews] = useState({});
    const [news, setnews] = useState([]);
    const [newsUpdate, setnewsUpdate] = useState();
    const [newsUpInfo, setnewsUpInfo] = useState({});
    const [newsDeleteThen, setnewsDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    const onSubmit = (data) => {
        console.log(data);

        if (newsUpdate) {
            axios
                .patch(
                    `/api/news/update-one/${newsUpdate._id}`,
                    data
                )
                .then((res) => {
                    //console.log("news 39 =", res);
                    const { news, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setnewsUpInfo(news);
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
                .post("/api/news/create", data)
                .then((res) => {
                    console.log("news 57 =", res);
                    const { news, error, message } = res.data;
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewnews(news);
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
        setnewsUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/news/get-all")
            .then((res) => {
                //console.log("news 83 =", res);
                const { news, error, message } = res.data;
                setnews(news);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [newsDeleteThen, newnews, newsUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        //console.log("update ID ; ", id);

        axios
            .get(`/api/news/get-one/${id}`)
            .then((res) => {
                //console.log(res);
                const { news, error, message } = res.data;
                setnewsUpdate(news);
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
                `/api/news/delete-one/${id}`
            )
            .then((res) => {
                //console.log(res);
                const { news, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setnewsDeleteThen(news);
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
                <DashboardHeader name={"news Add"} />

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
                                        placeholder="Enter news title"
                                        defaultValue={newsUpdate?.title}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.title && (
                                        <span className="text-danger">title is required</span>
                                    )}
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="description">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        placeholder="Enter news url"
                                        defaultValue={newsUpdate?.description}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.description && (
                                        <span className="text-danger">description is required</span>
                                    )}
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="collectFrom">
                                        Collect From
                                    </label>
                                    <input
                                        type="text"
                                        name="collectFrom"
                                        id="collectFrom"
                                        placeholder="Enter news url"
                                        defaultValue={newsUpdate?.collectFrom}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.collectFrom && (
                                        <span className="text-danger">collectFrom is required</span>
                                    )}
                                </div>

                            </div>

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
                                        defaultValue={newsUpdate?.topic}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.topic && (
                                        <span className="text-danger">topic is required</span>
                                    )}
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="image">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        placeholder="Enter news image"
                                        defaultValue={newsUpdate?.image}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.image && (
                                        <span className="text-danger">image is required</span>
                                    )}
                                </div>


                            </div>

                            <div className="col-md-6 mt-3">
                                <button type="submit" className="btn btn-success mr-2">
                                    {newsUpdate ? "NEWS UPDATE" : "NEWS ADD"}
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
                        <h2 className="text-center mb-4 mt-5">Present news's</h2>
                        {news?.length > 0 && (
                            <div className="table_div">
                                <Table className="table-responsive" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th> Count</th>
                                            <th> title</th>
                                            <th> image</th>
                                            <th> Description</th>
                                            <th> Collect From</th>
                                            <th> Topic</th>
                                            <th className="text-center">Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {news.map((info, index) => (
                                            <tr key={info._id} className="text-center">
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {info.title}
                                                </td>
                                                <td>
                                                    <img style={{ height: "20px", width: "20px" }} src={info?.image} alt="image" />
                                                </td>
                                                <td>
                                                    {info.description}
                                                </td>
                                                <td>
                                                    {info.collectFrom}
                                                </td>
                                                <td>
                                                    {info.topic}
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

export default connect(mapStateToProps)(News);