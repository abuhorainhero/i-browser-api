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

    const [otherSite, setotherSite] = useState([]);
    const [otherSiteUpdate, setotherSiteUpdate] = useState();
    const [otherSiteUpInfo, setotherSiteUpInfo] = useState({});
    const [accessibility, setAccessibility] = useContext(UserContext);
    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setotherSiteUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    const handleUpdate = (news) => {
        reset();
        setotherSiteUpdate(news);
        openModal();
    }
    const onSubmit = (data) => {
        if (otherSiteUpdate) {
            axios
                .patch(
                    `/api/other-revenue-site/update-one/${otherSiteUpdate._id}`,
                    data
                )
                .then((res) => {
                    const { otherRevenueSite, error, message } = res.data;
                    closeModal()
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setotherSiteUpInfo(otherRevenueSite);
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
        setotherSiteUpdate("");
    };
    console.log(otherSite)
    useEffect(() => {
        axios
            .get("/api/other-revenue-site/get-all")
            .then((res) => {
                const { otherRevenueSite } = res.data;
                setotherSite(otherRevenueSite);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [otherSiteUpInfo]);


    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">


                    {/* navbar */}
                    <MyNavbar page={"All Site Revenue"} />
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
                                                        <h5>All Sites Revenue</h5>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Time (minutes)</th>
                                                                        <th>Revenue</th>
                                                                        <th>Created Time</th>
                                                                        <th>Updated Time</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        otherSite?.map(other => (
                                                                            <tr key={other?._id}>
                                                                                <th scope="row">{other?._id}</th>
                                                                                <td>{other?.minVisitingTime}</td>
                                                                                <td>{other?.revenue}৳</td>
                                                                                <td>{new Date(`${other?.createdAt}`).toLocaleString("bn")}</td>
                                                                                <td>{new Date(`${other?.updatedAt}`).toLocaleString("bn")}</td>
                                                                                <td><button onClick={() => handleUpdate(other)} class="btn btn-out btn-primary">Edit</button></td>
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
                                type="number"
                                id="minVisitingTime"
                                placeholder="Enter Minimum Visiting Minutes"
                                defaultValue={otherSiteUpdate?.minVisitingTime}
                                className="form-control"
                                {...register("minVisitingTime", { required: true })}
                            />
                            {errors.minVisitingTime && (
                                <span className="text-danger">min Visiting Time is required</span>
                            )}
                        </div>
                        <div className="col-sm-11">
                            <input
                                type="number"
                                id="revenue"
                                placeholder="Enter revenue TK"
                                defaultValue={otherSiteUpdate?.revenue}
                                className="form-control"
                                {...register("revenue", { required: true })}
                            />
                            {errors.revenue && (
                                <span className="text-danger">Revenue ID is required</span>
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

export default AllSiteRevenue;