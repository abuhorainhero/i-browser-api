import React, { useContext, useEffect, useState } from 'react';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';
import { NotificationContainer } from 'react-notifications';
import createNotification from '../components/Notification';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../App';
import { useForm } from 'react-hook-form';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
    },
};

const AllCity = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [newCity, setNewCity] = useState({});
    const [city, setCity] = useState([]);
    const [cityUpdate, setCityUpdate] = useState();
    const [cityUpInfo, setCityUpInfo] = useState({});
    const [cityDeleteThen, setCityDeleteThen] = useState([]);
    const [accessibility, setAccessibility] = useContext(UserContext);
    const [country, setCountry] = useState([]);
    const [users, setUsers] = useState([]);

    console.log(city)
    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setCityUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    const handleUpdate = (ads) => {
        reset();
        setCityUpdate(ads);
        openModal();
    }
    const handleAdd = () => {
        handleClear();
        openModal();
    }

    const onSubmit = (data) => {
        if (cityUpdate) {
            axios
                .patch(
                    `/api/city/update-one/${cityUpdate._id}`,
                    data
                )
                .then((res) => {
                    const { city, error, message } = res.data;
                    closeModal();
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setCityUpInfo(city);
                })
                .catch((err) => {
                    closeModal()
                    createNotification("warning", "FAILED", `${err.response.data.message}`);
                });
        } else {
            axios
                .post("/api/city/create", data)
                .then((res) => {
                    const { city, error, message } = res.data;
                    closeModal()
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewCity(city);
                })
                .catch((err) => {
                    closeModal()
                    createNotification("warning", "FAILED", `${err.response.data.message}`);
                });
        }
    };

    const handleClear = () => {
        setCityUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/city/get-all")
            .then((res) => {
                const { city, error, message } = res.data;
                setCity(city);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [cityDeleteThen, newCity, cityUpInfo]);

    useEffect(() => {
        axios
            .get("/api/country/get-all")
            .then((res) => {
                const { country, error, message } = res.data;
                setCountry(country)
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

        axios
            .get("/api/user/get-all").then(res => {
                setUsers(res.data.user)
            }).catch((err) => {
                //console.log(err);
            });
    }, [])

    const handleDelete = (id) => {
        axios
            .delete(
                `/api/city/delete-one/${id}`
            )
            .then((res) => {
                //console.log(res);
                const { city, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setCityDeleteThen(city);
            })
            .catch((err) => {
                //console.log(err.response.data.message);
                createNotification("warning", "FAILED", `${err.response.data.message}`);
            });
    }


    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">


                    {/* navbar */}
                    <MyNavbar page={"All City"} />
                    {/* navbar */}

                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">

                            {/* sidebar */}
                            <MySidebar />
                            {/* sidebar */}

                        </div>

                        <NotificationContainer />

                        <div className="pcoded-content">
                            <div className="pcoded-inner-content">
                                <div className="main-body">
                                    <div className="page-wrapper">

                                        <div className="page-body">
                                            <div className="row">
                                                {/* <!-- Hover table card start --> */}
                                                <div class="card col-md-12">
                                                    <div class="card-header">
                                                        {/* <h5>All Country</h5> */}
                                                        <button
                                                            className="btn btn-out btn-danger"
                                                            onClick={() => handleAdd()}
                                                        >NEW CITY</button>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>City Name</th>
                                                                        <th>Country</th>
                                                                        <th>Total Users</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        city?.map(city => (
                                                                            <tr key={city?._id}>
                                                                                <th scope="row">{city?._id}</th>
                                                                                <td>{city?.name}</td>
                                                                                <td>{country?.find(coun => coun._id === city.countryId)?.name || "---"}</td>
                                                                                <td>{users?.filter(user => user?.cityId === city?._id)?.length}</td>
                                                                                <td><button onClick={() => handleUpdate(city)} class="btn btn-out btn-primary">Edit</button></td>
                                                                            </tr>
                                                                        ))
                                                                    }
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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-sm-11 mb-2" >
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter name"
                                defaultValue={cityUpdate?.name}
                                className="form-control"
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <span className="text-danger">Name is required</span>
                            )}
                        </div>
                        <div className="col-sm-11">
                            <input
                                type="text"
                                id="countryId"
                                placeholder="Enter CountryId"
                                defaultValue={cityUpdate?.countryId}
                                className="form-control"
                                {...register("countryId", { required: true })}
                            />
                            {errors.countryId && (
                                <span className="text-danger">Country ID is required</span>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </form>

            </Modal>
            {/* --------------------- modal / popup end ---------------------- */}

        </section>

    );
};

export default AllCity;