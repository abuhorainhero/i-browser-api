import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../App";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import SideBar from "../Sidebar/SideBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";
import "./Admin.css";
import NotAccess from "../../NotAccess/NotAccess";
import LocalStorage from "../../LocalStorage";
import { NotificationContainer } from "react-notifications";
import createNotification from "../../Notification/Notification";
import ReactLoading from "react-loading";
import { connect } from "react-redux";


const Admin = (props) => {

    const { register, handleSubmit, errors } = useForm();
    const [adminUpdate, setAdminUpdate] = useState(false);
    const [ifAdmin, setIfAdmin] = useState("Admin");
    const [admins, setAdmins] = useState([]);
    const [reload, setReload] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectItem, setSelectItem] = useState({});
    const [processing, setProcessing] = useState(false);
    const [accessbility, setAccessbility] = useContext(UserContext);

    // console.log(selectItem)
    const onSubmit = (data) => {
        // console.log(data);
        setProcessing(true);
        if (JSON.stringify(selectItem) !== "{}") {
            axios
                .patch(
                    `https://i-browser-api.herokuapp.com/api/admin/update-one/${selectItem._id}`,
                    data
                )
                .then((res) => {
                    const { admin, error, message } = res.data;
                    setReload(!reload);
                    // console.log(user);
                    setSelectItem({});
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    handleClear();
                    setProcessing(false);
                })
                .catch((err) => {
                    setProcessing(false);
                    // console.log(err);
                });
        } else {
            axios
                .post(
                    "https://i-browser-api.herokuapp.com/api/admin/create",
                    data.role === "Admin"
                        ? {
                            ...data,
                            dashboard: true,
                            users: true,
                            ads: true,
                            interest: true,
                            withdrawal: true,
                            news: true,
                            country: true,
                            city: true,
                            browsingRevenue: true,
                        }
                        : data
                )
                .then((res) => {
                    setReload(!reload);
                    const { admin, error, message } = res.data;

                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    handleClear();
                    setProcessing(false);
                    setSelectItem({});
                })
                .catch((err) => {
                    setProcessing(false);
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response?.data.message}`
                    );
                });
        }
    };

    useEffect(() => {
        axios
            .get("https://i-browser-api.herokuapp.com/api/admin/get-all")
            .then((res) => {
                const { admin, error, message } = res.data;
                setAdmins(admin);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [reload]);

    const handleClear = () => {
        setAdminUpdate("");
        setIfAdmin("Admin");
        setSelectItem({});
    };

    const handleUpdate = (info) => {
        // console.log("update ID ; ", info);
        setSelectItem(info);
        setModalShow(true);
    };

    const handleDelete = (id) => {
        axios
            .delete(
                `https://i-browser-api.herokuapp.com/api/admin/delete-one/${id}`
            )
            .then((res) => {
                const { admin, error, message } = res.data;
                setReload(!reload);
                createNotification("success", "SUCCESSFULLY", `${message}`);
            })
            .catch((err) => {
                createNotification(
                    "warning",
                    "FAILED",
                    `${err.response?.data.message}`
                );
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
                <DashboardHeader name={"Add Admin Or Moderator"} />
                {/* {accessbility.admin === true ? ( */}
                <section className="container-fluid dashboard_content mt-4">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="col-md-6">
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter user name"
                                        value={selectItem?.name}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.name && (
                                        <span className="text-danger">name is required</span>
                                    )}
                                </div>

                                <div className="input-group">
                                    <label className="input-group-text" htmlFor="role">
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        className="form-control form-select"
                                        ref={register({ required: true })}
                                        onChange={(e) => (
                                            setIfAdmin(e.target.value), setSelectItem({})
                                        )}
                                        value={selectItem && selectItem.role}
                                    >
                                        <option>Admin</option>
                                        <option>Moderator</option>
                                    </select>
                                    {errors.role && (
                                        <span className="text-danger">User Role is required</span>
                                    )}
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="phone">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Enter admin phone"
                                        value={selectItem && selectItem.phone}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.phone && (
                                        <span className="text-danger">phone is required</span>
                                    )}
                                </div>

                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter user email"
                                        value={selectItem && selectItem.email}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.email && (
                                        <span className="text-danger">email is required</span>
                                    )}
                                </div>
                                <div className="input-group  my-2">
                                    <label className="input-group-text" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        name="password"
                                        id="password"
                                        placeholder="Enter user password"
                                        value={selectItem && selectItem.password}
                                        className="form-control"
                                        ref={register({ required: true })}
                                    />
                                    {errors.password && (
                                        <span className="text-danger">Password is required</span>
                                    )}
                                </div>

                                <div className="input-group">
                                    <label className="input-group-text" htmlFor="gender">
                                        gender
                                    </label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        className="form-control form-select"
                                        ref={register({ required: true })}
                                        value={selectItem?.gender}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                    {errors.gender && (
                                        <span className="text-danger">User gender is required</span>
                                    )}
                                </div>



                            </div>
                            <div className={`col-md-6 opacity_block`}>
                                {ifAdmin === "Moderator" || selectItem?.role ? (
                                    <>
                                        <h5 className="text-center">Permissions</h5>

                                        <div className="row">
                                            <div className="col-md-6">

                                                <div className="form-check my-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="ads"
                                                        id="ads"
                                                        ref={register()}
                                                        defaultChecked={
                                                            selectItem && selectItem.ads ? true : false
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="ads"
                                                    >
                                                        Ads
                                                    </label>
                                                </div>

                                                <div className="form-check my-2">
                                                    <input
                                                        type="checkbox"
                                                        name="interest"
                                                        id="interest"
                                                        className="form-check-input"
                                                        ref={register()}
                                                        defaultChecked={
                                                            selectItem && selectItem.interest === true
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="interest"
                                                    >
                                                        Interest
                                                    </label>
                                                </div>

                                                <div className="form-check my-2">
                                                    <input
                                                        type="checkbox"
                                                        name="withdrawal"
                                                        id="withdrawal"
                                                        className="form-check-input"
                                                        ref={register()}
                                                        defaultChecked={
                                                            selectItem && selectItem.withdrawal === true
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <label className="form-check-label" htmlFor="withdrawal">
                                                        Withdrawal
                                                    </label>
                                                </div>

                                                <div className="form-check my-2">
                                                    <input
                                                        type="checkbox"
                                                        name="news"
                                                        id="news"
                                                        className="form-check-input"
                                                        ref={register()}
                                                        defaultChecked={
                                                            selectItem && selectItem.news === true
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="news"
                                                    >
                                                        News
                                                    </label>
                                                </div>

                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-check my-2">
                                                    <input
                                                        type="checkbox"
                                                        name="country"
                                                        id="country"
                                                        className="form-check-input"
                                                        ref={register()}
                                                        defaultChecked={
                                                            selectItem && selectItem.country === true
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="country"
                                                    >
                                                        Country
                                                    </label>
                                                </div>

                                                <div className="form-check my-2">
                                                    <input
                                                        type="checkbox"
                                                        name="city"
                                                        id="city"
                                                        className="form-check-input"
                                                        ref={register()}
                                                        defaultChecked={
                                                            selectItem && selectItem.city === true
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="city"
                                                    >
                                                        City
                                                    </label>
                                                </div>

                                                <div className="form-check my-2">
                                                    <input
                                                        type="checkbox"
                                                        name="browsingRevenue"
                                                        id="browsingRevenue"
                                                        className="form-check-input"
                                                        ref={register()}
                                                        defaultChecked={
                                                            selectItem && selectItem.browsingRevenue === true
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="browsingRevenue"
                                                    >
                                                        Browsing Revenue
                                                    </label>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>

                            <div className="col-md-6 mt-3 d-flex">
                                {processing ? (
                                    <span className="btn btn-success mr-2 w-25 d-flex">
                                        Processing{" "}
                                        <ReactLoading
                                            type={"bubbles"}
                                            color={"#FFFFFF"}
                                            height={10}
                                            width={60}
                                        />
                                    </span>
                                ) : (
                                    <button
                                        type="submit"
                                        id="update"
                                        className="btn btn-success mr-2"
                                        title="Save Data"
                                    >
                                        {JSON.stringify(selectItem) === "{}"
                                            ? "User Add"
                                            : "User Update"}
                                    </button>
                                )}

                                {JSON.stringify(selectItem) === "{}" ? (
                                    <button
                                        type="reset"
                                        className="btn btn-warning"
                                        onClick={() => handleClear()}
                                    >
                                        RESET
                                    </button>
                                ) : (
                                    <button
                                        type="reset"
                                        className="btn btn-warning"
                                        onClick={() => setSelectItem({})}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="mt-3">
                        {admins.length > 0 && (
                            <>
                                <h2 className="text-center mb-4 mt-5">Present User's</h2>

                                <h4>
                                    {" "}
                                    Admin -{" "}
                                    {admins.filter((user) => user.role === "Admin").length}
                                </h4>
                                <div className="table_div">
                                    <Table className="table-responsive" className="table-responsive" striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th> No.</th>
                                                <th> Role</th>
                                                <th> Name</th>
                                                <th> Email</th>
                                                <th> Password</th>
                                                <th> Number</th>
                                                <th> Create Date</th>
                                                <th className="text-center">Modify</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins
                                                .filter((item) => item.role === "Admin")
                                                .map((info, index) => (
                                                    <tr key={info._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{info.role}</td>
                                                        <td>{info.name}</td>
                                                        <td>{info.email}</td>
                                                        <td>{info.password}</td>
                                                        <td>0{info.number}</td>
                                                        <td>
                                                            {new Date(`${info.createdAt}`).toLocaleString()}
                                                        </td>
                                                        <td className="text-center">
                                                            <span
                                                                className="btn btn-info"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleUpdate(info)}
                                                            >
                                                                <EditIcon />
                                                            </span>
                                                            <span
                                                                className="btn btn-danger ml-2"
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

                                <h4>
                                    {" "}
                                    Moderator -{" "}
                                    {admins.filter((user) => user.role === "Moderator").length}
                                </h4>
                                <div className="table_div">
                                    <Table className="table-responsive" striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th> No.</th>
                                                <th> Role</th>
                                                <th> Name</th>
                                                <th> Email</th>
                                                <th> Password</th>
                                                <th> Number</th>
                                                <th> Create Date</th>
                                                <th className="text-center">Modify</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admins
                                                .filter((item) => item.role === "Moderator")
                                                .map((info, index) => (
                                                    <tr key={info._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{info.role}</td>
                                                        <td>{info.name}</td>
                                                        <td>{info.email}</td>
                                                        <td>{info.password}</td>
                                                        <td>0{info.number}</td>
                                                        <td>{info.createdAt}</td>
                                                        <td className="text-center">
                                                            <span
                                                                className="btn btn-info"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleUpdate(info)}
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
                            </>
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

export default connect(mapStateToProps)(Admin);