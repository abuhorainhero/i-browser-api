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

const AllCountry = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [newCountry, setNewCountry] = useState({});
    const [country, setCountry] = useState([]);
    const [countryUpdate, setCountryUpdate] = useState();
    const [countryUpInfo, setCountryUpInfo] = useState({});
    const [countryDeleteThen, setCountryDeleteThen] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);
    const [citys, setCitys] = useState([]);
    const [users, setUsers] = useState([]);

    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setCountryUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    const handleUpdate = (ads) => {
        reset();
        setCountryUpdate(ads);
        openModal();
    }
    const handleAdd = () => {
        handleClear();
        openModal();
    }

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
                    closeModal()
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setCountryUpInfo(country);
                })
                .catch((err) => {
                    closeModal()
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
                    const { country, error, message } = res.data;
                    closeModal()
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewCountry(country);
                })
                .catch((err) => {
                    closeModal()
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response.data.message}`
                    );
                });
        }
    };

    const handleClear = () => {
        reset();
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
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">


                    {/* navbar */}
                    <MyNavbar page={"All Country"} />
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
                                                        >NEW COUNTRY</button>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Country Name</th>
                                                                        <th>Total Users</th>
                                                                        <th>Total City</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        country?.map(country => (
                                                                            <tr key={country?._id}>
                                                                                <th scope="row">{country?._id}</th>
                                                                                <td>{country?.name}</td>
                                                                                <td>
                                                                                    {users.filter(user => user?.countryId === country?._id)?.length || "---"}
                                                                                </td>
                                                                                <td>
                                                                                    {citys.filter(city => city?.countryId === country._id)?.length || "---"}
                                                                                </td>
                                                                                <td><button onClick={() => handleUpdate(country)} class="btn btn-out btn-primary">Edit</button></td>
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
                        <div className="col-sm-12">
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter name"
                                defaultValue={countryUpdate?.name}
                                className="form-control"
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <span className="text-danger">Name is required</span>
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

export default AllCountry;