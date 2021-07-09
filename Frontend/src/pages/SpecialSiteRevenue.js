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
        width: "60%",
    },
};

const AllSiteRevenue = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [newspecialSite, setNewspecialSite] = useState({});
    const [specialSite, setspecialSite] = useState([]);
    const [specialSiteUpdate, setspecialSiteUpdate] = useState();
    const [specialSiteUpInfo, setspecialSiteUpInfo] = useState({});
    const [specialSiteDeleteThen, setspecialSiteDeleteThen] = useState([]);
    const [accessibility, setAccessibility] = useContext(UserContext);

    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setspecialSiteUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    const handleUpdate = (news) => {
        reset();
        setspecialSiteUpdate(news);
        openModal();
    }
    const handleAdd = () => {
        handleClear();
        openModal();
    }
    console.log(specialSite)


    const onSubmit = (data) => {
        console.log(data);

        if (specialSiteUpdate) {
            axios
                .patch(
                    `/api/special-revenue-site/update-one/${specialSiteUpdate._id}`,
                    data
                )
                .then((res) => {
                    const { specialRevenueSite, error, message } = res.data;
                    closeModal();
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setspecialSiteUpInfo(specialRevenueSite);
                })
                .catch((err) => {
                    closeModal();
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
                    closeModal();
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewspecialSite(specialRevenueSite);
                })
                .catch((err) => {
                    closeModal();
                    createNotification(
                        "warning",
                        "FAILED",
                        `${err.response.data.message}`
                    );
                });
        }
    };

    const handleClear = () => {
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
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">


                    {/* navbar */}
                    <MyNavbar page={"Special Site Revenue"} />
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
                                                        {/* <h5>Special Sites Revenue</h5> */}
                                                        <button
                                                            className="btn btn-out btn-danger"
                                                            onClick={() => handleAdd()}
                                                        >NEW SITE </button>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Title</th>
                                                                        <th>Icon</th>
                                                                        <th>Url</th>
                                                                        <th>Time (minutes)</th>
                                                                        <th>Revenue</th>
                                                                        <th>Created Time</th>
                                                                        <th>Updated Time</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        specialSite?.map(special => (
                                                                            <tr key={special?._id}>
                                                                                <th scope="row">{special?._id}</th>
                                                                                <td>{special?.title}</td>
                                                                                <td><img src={special?.image} alt="image" width="80" height="80" /></td>
                                                                                <td>{special?.url}</td>
                                                                                <td>{special?.minVisitingTime}</td>
                                                                                <td>{special?.revenue}৳</td>
                                                                                <td>{new Date(`${special?.createdAt}`).toLocaleString("bn")}</td>
                                                                                <td>{new Date(`${special?.updatedAt}`).toLocaleString("bn")}</td>
                                                                                <td><button onClick={() => handleUpdate(special)} class="btn btn-out btn-primary">Edit</button></td>
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

                <form onSubmit={handleSubmit(onSubmit)} className="row">

                    <div className="col-md-6">
                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="title">
                                Title
                            </span>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter specialSite title"
                                defaultValue={specialSiteUpdate?.title}
                                className="form-control"
                                {...register("title", { required: true })}
                            />
                            {errors.title && (
                                <span className="text-danger">title is required</span>
                            )}
                        </div>

                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="url">
                                Site url
                            </span>
                            <input
                                type="text"
                                id="url"
                                placeholder="Enter specialSite url"
                                defaultValue={specialSiteUpdate?.url}
                                className="form-control"
                                {...register("url", { required: true })}
                            />
                            {errors.url && (
                                <span className="text-danger">url is required</span>
                            )}
                        </div>

                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="minVisitingTime">
                                Minimum Visiting Minutes
                            </span>
                            <input
                                type="number"
                                id="minVisitingTime"
                                placeholder="Enter specialSite minVisitingTime"
                                defaultValue={specialSiteUpdate?.minVisitingTime}
                                className="form-control"
                                {...register("minVisitingTime", { required: true })}
                            />
                            {errors.minVisitingTime && (
                                <span className="text-danger">minVisitingTime is required</span>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="input-group  my-2">
                            <span className="input-group-text" htmlFor="revenue">
                                Revenue
                            </span>
                            <input
                                type="number"
                                id="revenue"
                                placeholder="Enter revenue"
                                defaultValue={specialSiteUpdate?.revenue}
                                className="form-control"
                                {...register("revenue", { required: true })}
                            />
                            {errors.revenue && (
                                <span className="text-danger">revenue is required</span>
                            )}
                        </div>

                        <div className="input-group  my-2">
                            <input
                                type="file"
                                id="icon"
                                placeholder="Enter specialSite icon"
                                defaultValue={specialSiteUpdate?.icon}
                                className="form-control"
                                {...register("icon", { required: true })}
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

            </Modal>
            {/* --------------------- modal / popup end ---------------------- */}


        </section>

    );
};

export default AllSiteRevenue;








