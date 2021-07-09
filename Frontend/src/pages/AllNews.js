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

const AllNews = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const [newnews, setNewnews] = useState({});
    const [news, setnews] = useState([]);
    const [newsUpdate, setnewsUpdate] = useState();
    const [newsUpInfo, setnewsUpInfo] = useState({});
    const [newsDeleteThen, setnewsDeleteThen] = useState([]);
    const [accessibility, setAccessibility] = useContext(UserContext);

    console.log(news)
    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setnewsUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    const handleUpdate = (news) => {
        reset();
        setnewsUpdate(news);
        openModal();
    }
    const handleAdd = () => {
        handleClear();
        openModal();
    }
    console.log(newsUpdate)

    const onSubmit = (data) => {
        if (newsUpdate) {
            axios
                .patch(
                    `/api/news/update-one/${newsUpdate._id}`,
                    data
                )
                .then((res) => {
                    //console.log("news 39 =", res);
                    const { news, error, message } = res.data;
                    closeModal();
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setnewsUpInfo(news);
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
                .post("/api/news/create", data)
                .then((res) => {
                    closeModal();
                    const { news, error, message } = res.data;
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewnews(news);
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
        setnewsUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/news/get-all")
            .then((res) => {
                //console.log("news 83 =", res);
                const { news, error, message } = res.data;
                setnews(news);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [newsDeleteThen, newnews, newsUpInfo]);

    const handleDelete = (id) => {
        axios
            .delete(
                `/api/news/delete-one/${id}`
            )
            .then((res) => {
                const { news, error, message } = res.data;
                createNotification("success", "DELETE", `${message}`);
                setnewsDeleteThen(news);
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
                    <MyNavbar page={"All News"} />
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
                                                        {/* <h5>All News</h5> */}
                                                        <button
                                                            className="btn btn-out btn-danger"
                                                            onClick={() => handleAdd()}
                                                        >NEW NEWS</button>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Title</th>
                                                                        <th>Image</th>
                                                                        <th>Description</th>
                                                                        <th>Interest</th>
                                                                        {/* <th>City</th> */}
                                                                        {/* <th>Link</th> */}
                                                                        <th>collect From</th>
                                                                        <th>View</th>
                                                                        <th>Time</th>
                                                                        <th>Edit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        news?.map(news => (
                                                                            <tr key={news?._id}>
                                                                                <th scope="row">{news?._id}</th>
                                                                                <td>{news?.title}</td>
                                                                                <td><img src={news?.image} alt="image" width="80" height="80" /></td>
                                                                                <td>{news?.description}</td>
                                                                                <td>{news?.topic}</td>
                                                                                {/* <td>Bogura</td> */}
                                                                                {/* <td>Bogura.com</td> */}
                                                                                <td>{news?.collectFrom}</td>
                                                                                <td>{"not worked backend"}</td>
                                                                                <td>{new Date(`${news?.createdAt}`).toLocaleString("bn")}</td>
                                                                                <td><button onClick={() => handleUpdate(news)} class="btn btn-out btn-primary">Edit</button></td>
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
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter Title"
                                defaultValue={newsUpdate?.title}
                                className="form-control"
                                {...register("title", { required: true })}
                            />
                            {errors.title && (
                                <span className="text-danger">Title is required</span>
                            )}
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <textarea type="text"
                                id="description"
                                placeholder="Enter Description"
                                defaultValue={newsUpdate?.description}
                                className="form-control"
                                {...register("description", { required: true })}
                                cols="30" rows="5"
                            ></textarea>
                            {errors.description && (
                                <span className="text-danger">Description is required</span>
                            )}
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <input
                                type="text"
                                id="collectFrom"
                                placeholder="Enter Collect From"
                                defaultValue={newsUpdate?.collectFrom}
                                className="form-control"
                                {...register("collectFrom", { required: true })}
                            />
                            {errors.collectFrom && (
                                <span className="text-danger">Collect From is required</span>
                            )}
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6">
                            <input
                                type="text"
                                id="topic"
                                placeholder="Enter topic"
                                defaultValue={newsUpdate?.topic}
                                className="form-control"
                                {...register("topic", { required: true })}
                            />
                            {errors.topic && (
                                <span className="text-danger">Topic is required</span>
                            )}
                        </div>
                        {
                            newsUpdate ? null :

                                <div class="col-sm-6">
                                    <input
                                        type="file"
                                        id="image"
                                        placeholder="Enter Image"
                                        defaultValue={newsUpdate?.image}
                                        className="form-control"
                                        {...register("image", { required: true })}
                                    />
                                    {errors.image && (
                                        <span className="text-danger">Image is required</span>
                                    )}
                                </div>
                        }
                    </div>


                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </form>

            </Modal>
            {/* --------------------- modal / popup end ---------------------- */}

        </section>

    );
};

export default AllNews;