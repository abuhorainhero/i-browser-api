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

const WithdrawMethod = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [newmethod, setNewmethod] = useState({});
    const [method, setmethod] = useState([]);
    const [methodUpdate, setmethodUpdate] = useState();
    const [methodUpInfo, setmethodUpInfo] = useState({});
    const [methodDeleteThen, setmethodDeleteThen] = useState([]);
    const [accessibility, setAccessibility] = useContext(UserContext);

    console.log(method)
    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setmethodUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    const handleUpdate = (method) => {
        reset();
        setmethodUpdate(method);
        openModal();
    }
    const handleAdd = () => {
        handleClear();
        openModal();
    }

    const onSubmit = (data) => {
        if (methodUpdate) {
            axios
                .patch(
                    `/api/withdrawal-method/update-one/${methodUpdate._id}`,
                    data
                )
                .then((res) => {
                    const { withdrawalMethod, error, message } = res.data;
                    closeModal();
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setmethodUpInfo(withdrawalMethod);
                })
                .catch((err) => {
                    closeModal();
                    createNotification("warning", "FAILED", `${err.response.data.message}`);
                });
        } else {
            axios
                .post("/api/withdrawal-method/create", data)
                .then((res) => {
                    const { withdrawalMethod, error, message } = res.data;
                    closeModal();
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewmethod(withdrawalMethod);
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
        //console.log("Clear Click");
        setmethodUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/withdrawal-method/get-all")
            .then((res) => {
                const { withdrawalMethod, error, message } = res.data;
                setmethod(withdrawalMethod);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [methodDeleteThen, newmethod, methodUpInfo]);

    const handleDelete = (id) => {
        axios
            .delete(
                `/api/withdrawal-method/delete-one/${id}`
            )
            .then((res) => {
                const { withdrawalMethod, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setmethodDeleteThen(withdrawalMethod);
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
                    <MyNavbar page={"Withdraw Method"} />
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
                                                        <h5>Withdraw Method</h5>
                                                        <div class="card-header-right">
                                                            <button onClick={() => handleAdd()} class="btn btn-primary">Add New</button>
                                                        </div>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Title</th>
                                                                        <th>Created</th>
                                                                        <th>Updated</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        method?.map(method => (
                                                                            <tr key={method?._id}>
                                                                                <th scope="row">{method?._id}</th>
                                                                                <td>{method?.title}</td>
                                                                                <td>{new Date(`${method?.createdAt}`).toLocaleString("bn")}</td>
                                                                                <td>{new Date(`${method?.updatedAt}`).toLocaleString("bn")}</td>
                                                                                <td><button onClick={() => handleUpdate(method)} class="btn btn-out btn-primary">Edit</button></td>
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
                        <div className="col-sm-12 mb-2" >
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter title"
                                defaultValue={methodUpdate?.title}
                                className="form-control"
                                {...register("title", { required: true })}
                            />
                            {errors.title && (
                                <span className="text-danger">Title is required</span>
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

export default WithdrawMethod;