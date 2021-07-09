import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../App';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';
import { NotificationContainer } from 'react-notifications';
import createNotification from '../components/Notification';
import Modal from 'react-modal';

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

const AllAds = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [newAds, setNewAds] = useState({});
    const [ads, setAds] = useState([]);
    const [adsUpdate, setAdsUpdate] = useState();
    const [adUpInfo, setAdUpInfo] = useState({});
    const [adDeleteThen, setAdDeleteThen] = useState([]);
    const [accessibility, setAccessibility] = useContext(UserContext);

    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setAdsUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    
    const onSubmit = (data) => {
        if (adsUpdate) {
            axios
                .patch(
                    `/api/ads/update-one/${adsUpdate._id}`,
                    data
                )
                .then((res) => {
                    //console.log(res);
                    const { ads, error, message } = res.data;
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setAdUpInfo(ads);
                    closeModal()
                    handleClear();
                })
                .catch((err) => {
                    createNotification("warning", "FAILED", `${err.response.data.message}`);
                    handleClear();
                });
        } else {
            axios
                .post("/api/ads/create", data)
                .then((res) => {
                    const { ads, error, message } = res.data;
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewAds(ads);
                    closeModal()
                    handleClear();
                })
                .catch((err) => {
                    createNotification("warning", "FAILED", `${err.response.data.message}`);
                    handleClear();
                });
        }
    };

    const handleClear = () => {
        setAdsUpdate("");
        reset();
    };
    const handleAdd = () => {
        handleClear();
        openModal();
    }

    useEffect(() => {
        axios
            .get("/api/ads/get-all")
            .then((res) => {
                const { ads, error, message } = res.data;
                setAds(ads);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });
    }, [adDeleteThen, newAds, adUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (ads) => {
        reset();
        setAdsUpdate(ads);
        openModal();
    }

    const handleDelete = (id) => {
        axios
            .delete(
                `/api/ads/delete-one/${id}`
            )
            .then((res) => {
                //console.log(res);
                const { ads, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setAdDeleteThen(ads);
            })
            .catch((err) => {
                createNotification("warning", "FAILED", `${err.response.data.message}`);
            });
    }

    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">

                    {/* navbar */}
                    <MyNavbar page={"All Ads"} />
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
                                                <div className="card col-md-12">
                                                    <div className="card-header">
                                                        {/* <h5>All Ads</h5> */}
                                                        <button
                                                            className="btn btn-out btn-danger"
                                                            onClick={() => handleAdd()}
                                                        >NEW ADS</button>
                                                    </div>
                                                    <div className="card-block table-border-style">
                                                        <div className="table-responsive">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Title</th>
                                                                        <th>Link No</th>
                                                                        <th>Instruction</th>
                                                                        <th>Revenue</th>
                                                                        <th>Duration (seconds)</th>
                                                                        <th>Total View</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {
                                                                        ads?.map(ads => (
                                                                            <tr key={ads?._id}>
                                                                                <th scope="row">{ads?._id}</th>
                                                                                <td>{ads?.title}</td>
                                                                                <td>{ads?.url}</td>
                                                                                <td>{ads?.instruction}</td>
                                                                                <td>{ads?.revenue}৳</td>
                                                                                <td>{ads?.minVisitingTime} sec</td>
                                                                                <td>{ads?.totalView || "Backend not worked"}</td>
                                                                                <td><button onClick={() => handleUpdate(ads)} className="btn btn-out btn-primary">Edit</button></td>
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
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter title"
                                defaultValue={adsUpdate?.title}
                                className="form-control"
                                {...register("title", { required: true })}
                            />
                            {errors.title && (
                                <span className="text-danger">Title is required</span>
                            )}
                        </div>
                        <div className="col-sm-3">
                            <input
                                type="number"
                                id="revenue"
                                placeholder="Revenue"
                                defaultValue={adsUpdate?.revenue}
                                className="form-control"
                                {...register("revenue", { required: true })}
                            />
                            {errors.revenue && (
                                <span className="text-danger">Revenue is required</span>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <input
                                type="text"
                                id="link"
                                placeholder="Enter Link"
                                defaultValue={adsUpdate?.url}
                                className="form-control"
                                {...register("url", { required: true })}
                            />
                            {errors.url && (
                                <span className="text-danger">Url is required</span>
                            )}
                        </div>
                        <div className="col-sm-6">
                            <input
                                type="number"
                                id="minVisitingTime"
                                placeholder="Duration Seconds"
                                defaultValue={adsUpdate?.minVisitingTime}
                                className="form-control"
                                {...register("minVisitingTime", { required: true })}
                            />
                            {errors.minVisitingTime && (
                                <span className="text-danger">Duration is required</span>
                            )}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input
                                type="text"
                                id="instruction"
                                placeholder="Instruction"
                                defaultValue={adsUpdate?.instruction}
                                className="form-control"
                                {...register("instruction", { required: true })}
                            />
                            {errors.instruction && (
                                <span className="text-danger">Instruction is required</span>
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

export default AllAds;