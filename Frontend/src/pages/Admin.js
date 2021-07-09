import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { UserContext } from '../App';
import ReactLoading from "react-loading";
import { NotificationContainer } from 'react-notifications';
import createNotification from '../components/Notification';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Admin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [adminUpdate, setAdminUpdate] = useState(false);
    const [ifAdmin, setIfAdmin] = useState("Admin");
    const [admins, setAdmins] = useState([]);
    const [reload, setReload] = useState(false);
    const [selectItem, setSelectItem] = useState({});
    const [processing, setProcessing] = useState(false);
    const [accessibility, setAccessibility] = useContext(UserContext);

    console.log(selectItem)
    const onSubmit = (data) => {
        setProcessing(true);
        if (adminUpdate) {
            axios
                .patch(
                    `/api/admin/update-one/${selectItem._id}`,
                    data
                )
                .then((res) => {
                    const { admin, error, message } = res.data;
                    setReload(!reload);
                    console.log(admin);
                    setSelectItem({});
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    handleClear();
                    setProcessing(false);
                    closeModal()
                })
                .catch((err) => {
                    setProcessing(false);
                    // //console.log(err);
                });
        } else {
            axios
                .post(
                    "/api/admin/create",
                    data
                )
                .then((res) => {
                    setReload(!reload);
                    const { admin, error, message } = res.data;
                    handleClear();
                    setProcessing(false);
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setSelectItem({});
                    closeModal()
                })
                .catch((err) => {
                    setProcessing(false);
                });
        }
    };

    useEffect(() => {
        axios
            .get("/api/admin/get-all")
            .then((res) => setAdmins(res?.data?.admin))
            .catch((err) => console.log(err));
    }, [reload]);

    const handleClear = () => {
        setAdminUpdate(false);
        setIfAdmin("Admin");
        setSelectItem({});
        reset();
    };

    const handleUpdate = (info) => {
        setAdminUpdate(true);
        setSelectItem(info);
        openModal();
    };
    const handleAddAdmin = () => {
        handleClear();
        openModal();
    }

    const handleDelete = (id) => {
        axios
            .delete(
                `/api/admin/delete-one/${id}`
            )
            .then((res) => {
                const { admin, error, message } = res.data;
                createNotification("success", "SUCCESSFULLY", `${message}`);
                setReload(!reload);
            })
            .catch((err) => console.log(err));
    };

    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    // ------------------------------- modal / popup function end -------------------------------

    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">

                    {/* navbar */}
                    <MyNavbar page={"All Admins"} />
                    {/* navbar */}

                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">

                            {/* sidebar */}
                            <MySidebar />
                            {/* sidebar */}

                        </div>

                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">

                                        <div className="page-body">
                                            <div className="row">
                                                {/* <!-- Hover table card start --> */}
                                                <div className="card col-md-12">
                                                    <div className="card-header">
                                                        {/* <h5>All Admins</h5> */}
                                                        <button
                                                            className="btn btn-out btn-danger"
                                                            onClick={() => handleAddAdmin()}
                                                        >ADD ADMIN</button>
                                                    </div>
                                                    <div className="card-block table-border-style">
                                                        <div className="table-responsive">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Name</th>
                                                                        <th>Role</th>
                                                                        <th>Phone No</th>
                                                                        <th>Email</th>
                                                                        <th>Gender</th>
                                                                        {/* <th>City</th>
                                                                        <th>Country</th> */}
                                                                        <th>AC Created Date</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {admins?.map(admin => (
                                                                        <tr key={admin?._id}>
                                                                            <th scope="row">{admin?._id}</th>
                                                                            <td>{admin?.name}</td>
                                                                            <td>{admin?.role}</td>
                                                                            <td>{admin?.phone}</td>
                                                                            <td>{admin?.email}</td>
                                                                            <td>{admin?.gender}</td>
                                                                            {/* <td>{admin?.city}</td>
                                                                            <td>{admin?.country}</td> */}
                                                                            <td>{new Date(`${admin?.createdAt}`).toLocaleString("bn")}</td>
                                                                            <td><button onClick={() => handleUpdate(admin)} className="btn btn-out btn-primary">Edit</button></td>
                                                                        </tr>
                                                                    ))}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Hover table card end --> */}
                                            </div>
                                        </div>
                                        <div id="styleSelector">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --------------------- modal / popup start -------------------- */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="d-flex justify-content-end">
                    <button className="bg-danger" onClick={closeModal}>X</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="row">
                    <div className={ifAdmin === "Moderator" || selectItem?.role === "Moderator" ? "col-md-6" : "col-md-11"}>
                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="name">
                                Name
                            </span>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter user name"
                                defaultValue={selectItem?.name}
                                className="form-control"
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <span className="text-danger">name is required</span>
                            )}
                        </div>

                        <div className="input-group">
                            <span className="input-group-text" htmlFor="role">
                                Role
                            </span>
                            <select
                                id="role"
                                className="form-control form-select"
                                {...register("role", { required: true })}
                                onChange={(e) => setIfAdmin(e.target.value)}
                                defaultValue={selectItem && selectItem.role}
                            >
                                <option>Admin</option>
                                <option>Moderator</option>
                            </select>
                            {errors.role && (
                                <span className="text-danger">User Role is required</span>
                            )}
                        </div>

                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="phone">
                                Phone
                            </span>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Enter admin phone"
                                defaultValue={selectItem && selectItem.phone}
                                className="form-control"
                                {...register("phone", { required: true })}
                            />
                            {errors.phone && (
                                <span className="text-danger">phone is required</span>
                            )}
                        </div>

                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="email">
                                Email
                            </span>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter user email"
                                defaultValue={selectItem && selectItem.email}
                                className="form-control"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="text-danger">email is required</span>
                            )}
                        </div>
                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="password">
                                Password
                            </span>
                            <input
                                type="text"
                                id="password"
                                placeholder="Enter user password"
                                defaultValue={selectItem && selectItem.password}
                                className="form-control"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <span className="text-danger">Password is required</span>
                            )}
                        </div>

                        <div className="input-group">
                            <span className="input-group-text" htmlFor="gender">
                                gender
                            </span>
                            <select
                                id="gender"
                                className="form-control form-select"
                                {...register("gender", { required: true })}
                                defaultValue={selectItem?.gender}
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

                        {/* 
                    <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="city">
                                City
                            </span>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter user city"
                                defaultValue={selectItem && selectItem.city}
                                className="form-control"
                                {...register("city", { required: true })}
                            />
                            {errors.city && (
                                <span className="text-danger">City is required</span>
                            )}
                        </div>
                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="country">
                                Country
                            </span>
                            <input
                                type="country"
                                id="country"
                                placeholder="Enter user country"
                                defaultValue={selectItem && selectItem.country}
                                className="form-control"
                                {...register("country", { required: true })}
                            />
                            {errors.country && (
                                <span className="text-danger">Country is required</span>
                            )}
                        </div>
 */}


                        {ifAdmin === "Moderator" || selectItem?.role === "Moderator" ? (
                            <>
                                <h5 className="text-center">Permissions</h5>

                                <div className="row">
                                    <div className="col-md-6">

                                        <div className="form-check my-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="ads"
                                                {...register("ads")}
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
                                                id="interest"
                                                className="form-check-input"
                                                {...register("interest")}
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
                                                id="withdrawal"
                                                className="form-check-input"
                                                {...register("withdrawal")}
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
                                                {...register("news")}
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
                                                id="country"
                                                className="form-check-input"
                                                {...register("country")}
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
                                                id="city"
                                                className="form-check-input"
                                                {...register("city")}
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
                                                id="browsingRevenue"
                                                className="form-check-input"
                                                {...register("browsingRevenue")}
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
                                {
                                    JSON.stringify(selectItem) === "{}" ? "ADMIN ADD" : "ADMIN UPDATE"
                                }
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

            </Modal>
            {/* --------------------- modal / popup end ---------------------- */}

            <NotificationContainer   />

        </section >
    );
};

export default Admin;