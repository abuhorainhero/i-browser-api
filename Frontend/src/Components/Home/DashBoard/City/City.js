import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import "./City.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';

const City = (props) => {


    const { register, handleSubmit, errors } = useForm();

    const [newCity, setNewCity] = useState({});
    const [city, setCity] = useState([]);
    const [cityUpdate, setCityUpdate] = useState();
    const [cityUpInfo, setCityUpInfo] = useState({});
    const [cityDeleteThen, setCityDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    const onSubmit = (data) => {
        console.log(data);

        if (cityUpdate) {
            axios
                .patch(
                    `https://i-browser-api.herokuapp.com/api/city/update-one/${cityUpdate._id}`,
                    data
                )
                .then((res) => {
                    console.log(res);
                    const { city, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setCityUpInfo(city);
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
                .post("https://i-browser-api.herokuapp.com/api/city/create", data)
                .then((res) => {
                    console.log(res);
                    const { city, error, message } = res.data;

                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewCity(city);
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
        setCityUpdate("");
    };

    useEffect(() => {
        axios
            .get("https://i-browser-api.herokuapp.com/api/city/get-all")
            .then((res) => {
                const { city, error, message } = res.data;
                setCity(city);
            })
            .catch((err) => {
                console.log(err.response?.data.message);
                alert(err.response?.data.message);
            });
    }, [cityDeleteThen, newCity, cityUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        console.log("update ID ; ", id);

        axios
            .get(`https://i-browser-api.herokuapp.com/api/city/get-one/${id}`)
            .then((res) => {
                console.log(res);
                const { city, error, message } = res.data;
                setCityUpdate(city);
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
                `https://i-browser-api.herokuapp.com/api/city/delete-one/${id}`
            )
            .then((res) => {
                console.log(res);
                const { city, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setCityDeleteThen(city);
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
                <DashboardHeader name={"CITY Add"} />

                {/* {accessbility.city === true ? ( */}

                <section className="container-fluid dashboard_content mt-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="name">
                                        City Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter city name"
                                        defaultValue={cityUpdate?.name}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.name && (
                                        <span className="text-danger">name is required</span>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="countryId">
                                        Country Id
                                    </label>
                                    <input
                                        type="text"
                                        name="countryId"
                                        id="countryId"
                                        placeholder="Enter countryId"
                                        defaultValue={cityUpdate?.countryId}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.countryId && (
                                        <span className="text-danger">countryId is required</span>
                                    )}
                                </div>

                            </div>

                            <div className="col-md-6 mt-3">
                                <button type="submit" className="btn btn-success mr-2">
                                    {cityUpdate ? "CITY UPDATE" : "CITY ADD"}
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
                        <h2 className="text-center mb-4 mt-5">Present City's</h2>
                        {city.length > 0 && (
                            <div className="table_div">
                                <Table className="table-responsive" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th> ID</th>
                                            <th> name</th>
                                            <th> Total users</th>
                                            <th> Country</th>
                                            <th className="text-center">Modify</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {city.map((info, index) => (
                                            <tr key={info._id} className="text-center">
                                                <td>
                                                    {info._id}
                                                </td>
                                                <td>
                                                    {info.name}
                                                </td>
                                                <td>
                                                    {"coming"}
                                                </td>
                                                <td>
                                                    {info.countryId}
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
    sidebarActive: state.sidebarActive
})

export default connect(mapStateToProps)(City);