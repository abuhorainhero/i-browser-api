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
        width: '40%',
    },
}

const AllInterest = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [newInterest, setNewInterest] = useState({});
    const [interest, setInterest] = useState([]);
    const [interestUpdate, setInterestUpdate] = useState();
    const [intUpInfo, setIntUpInfo] = useState({});
    const [intDeleteThen, setIntDeleteThen] = useState([]);
    const [accessibility, setAccessibility] = useContext(UserContext);

    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setInterestUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------


    const onSubmit = (data) => {
        if (interestUpdate) {
            axios
                .patch(
                    `https://i-browser-api.herokuapp.com/api/interest/update-one/${interestUpdate._id}`, data)
                .then((res) => {
                    const { interest, error, message } = res.data;
                    closeModal()
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setIntUpInfo(interest);
                })
                .catch((err) => {
                    closeModal()
                    createNotification("warning", "FAILED", `${err.response.data.message}`);
                });
        } else {
            axios
                .post("https://i-browser-api.herokuapp.com/api/interest/create", data)
                .then((res) => {
                    const { interest, error, message } = res.data;
                    closeModal()
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewInterest(interest);
                })
                .catch((err) => {
                    closeModal()
                    createNotification("warning", "FAILED", `${err.response.data.message}`);
                });
        }
    };

    const handleClear = () => {
        setInterestUpdate("");
        reset();
    };
    const handleAdd = () => {
        handleClear();
        openModal();
    }

    useEffect(() => {
        axios
            .get("https://i-browser-api.herokuapp.com/api/interest/get-all")
            .then((res) => {
                const { interest, error, message } = res.data;
                setInterest(interest);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });
    }, [intDeleteThen, newInterest, intUpInfo]);

    // =============== handleUpdate =============================
    const handleUpdate = (interest) => {
        reset();
        setInterestUpdate(interest);
        openModal();
    };

    const handleDelete = (id) => {
        axios
            .delete(
                `https://i-browser-api.herokuapp.com/api/interest/delete-one/${id}`
            )
            .then((res) => {
                const { interest, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setIntDeleteThen(interest);
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
                    <MyNavbar page="All Interest" />
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
                                                        {/* <h5>All Interest</h5> */}
                                                        <button
                                                            className="btn btn-out btn-danger"
                                                            onClick={() => handleAdd()}
                                                        >NEW INTEREST</button>
                                                    </div>
                                                    <div className="card-block table-border-style">
                                                        <div className="table-responsive">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Title</th>
                                                                        <th>Total Users</th>
                                                                        <th>Total News</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        interest?.map(interest => (
                                                                            <tr key={interest?._id}>
                                                                                <th scope="row">{interest?._id}</th>
                                                                                <td>{interest?.topic}</td>
                                                                                <td>{"backend not worked"}</td>
                                                                                <td>{"backend not worked"}</td>
                                                                                <td><button onClick={() => handleUpdate(interest)} className="btn btn-out btn-primary">Edit</button></td>
                                                                            </tr>
                                                                        ))
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div> {/* <!-- Hover table card end --> */}
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
                                id="topic"
                                placeholder="Enter topic"
                                defaultValue={interestUpdate?.topic}
                                className="form-control"
                                {...register("topic", { required: true })}
                            />
                            {errors.topic && (
                                <span className="text-danger">Topic is required</span>
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

export default AllInterest;