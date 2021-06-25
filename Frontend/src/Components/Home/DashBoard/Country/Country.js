import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../../App';
import createNotification from '../../Notification/Notification';
import SideBar from '../Sidebar/SideBar';
import "./Country.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import NotAccess from '../../NotAccess/NotAccess';

const Country = (props) => {


    const { register, handleSubmit, errors } = useForm();

    const [newCountry, setNewCountry] = useState({});
    const [country, setCountry] = useState([]);
    const [countryUpdate, setCountryUpdate] = useState();
    const [countryUpInfo, setCountryUpInfo] = useState({});
    const [countryDeleteThen, setCountryDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);
    const [citys, setCitys] = useState([]);
    const [users, setUsers] = useState([]);

    const onSubmit = (data) => {
        //console.log(data);

        if (countryUpdate) {
            axios
                .patch(
                    `/api/country/update-one/${countryUpdate._id}`,
                    data
                )
                .then((res) => {
                    //console.log(res);
                    const { country, error, message } = res.data;

                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setCountryUpInfo(country);
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
                .post("/api/country/create", data)
                .then((res) => {
                    //console.log(res);
                    const { country, error, message } = res.data;

                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewCountry(country);
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
        setCountryUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/country/get-all")
            .then((res) => {
                //console.log("country 83 = ", res)
                const { country, error, message } = res.data;
                setCountry(country);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
                //alert(err.response?.data.message);
            });
    }, [countryDeleteThen, newCountry, countryUpInfo]);

    useEffect(() => {
        axios
            .get('/api/user/get-all')
            .then(res => {
                setUsers(res.data.user)
            }).catch(err => {
                //console.log(err)
            });

        axios
            .get('/api/city/get-all')
            .then(res => {
                setCitys(res.data.city)
            }).catch(err => {
                //console.log(err)
            });
    }, [])


    // =============== handleUpdate =============================
    const handleUpdate = (id) => {
        //console.log("update ID ; ", id);

        axios
            .get(`/api/country/get-one/${id}`)
            .then((res) => {
                //console.log(res);
                const { country, error, message } = res.data;
                setCountryUpdate(country);
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
                `/api/country/delete-one/${id}`
            )
            .then((res) => {
                //console.log(res);
                const { country, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setCountryDeleteThen(country);
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
                <DashboardHeader name={"COUNTRY Add"} />

                {accessbility.country === true ? (

                    <section className="container-fluid dashboard_content mt-4">
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)} className="row">
                                <div className="col-md-6">
                                    <div className="input-group  my-2">
                                        <label className="input-group-text" htmlFor="name">
                                            Country Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter country name"
                                            defaultValue={countryUpdate?.name}
                                            className="form-control"
                                            ref={register({ required: true })}
                                        />
                                        {errors.name && (
                                            <span className="text-danger">name is required</span>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-6">


                                </div>

                                <div className="col-md-6 mt-3">
                                    <button type="submit" className="btn btn-success mr-2">
                                        {countryUpdate ? "country UPDATE" : "country ADD"}
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
                            <h2 className="text-center mb-4 mt-5">Present Country's</h2>
                            {country?.length > 0 && (
                                <div className="table_div">
                                    <Table className="table-responsive " striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th> ID</th>
                                                <th> name</th>
                                                <th> Total users</th>
                                                <th> Total City</th>
                                                <th className="text-center">Modify</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {country.map((info, index) => (
                                                <tr key={info._id} className="text-center">
                                                    <td>
                                                        {info._id}
                                                    </td>
                                                    <td>
                                                        {info.name}
                                                    </td>
                                                    <td>
                                                        {users.filter(user => user.countryId == info._id)?.length || "---"}
                                                    </td>
                                                    <td>
                                                        {citys.filter(city => city.countryId == info._id)?.length || "---"}
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

                ) : (
                    <NotAccess />
                )}

            </div>
            <NotificationContainer />
        </div>

    );
};

const mapStateToProps = (state) => ({
    sidebarActive: state.sidebarActive
})

export default connect(mapStateToProps)(Country);