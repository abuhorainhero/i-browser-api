import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';
import createNotification from '../components/Notification';
import Modal from 'react-modal';
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

const AllWithdraw = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [newallEntry, setNewallEntry] = useState({});
    const [allEntry, setallEntry] = useState([]);
    const [allEntryUpdate, setallEntryUpdate] = useState();
    const [allEntryUpInfo, setallEntryUpInfo] = useState({});
    const [users, setUsers] = useState([]);
    const [methods, setMethods] = useState([]);
    const [newStatus, setNewStatus] = useState("");

    console.log(allEntry)
    // ------------------------------- modal / popup function start -------------------------------
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setallEntryUpdate("");
        reset();
    }
    // ------------------------------- modal / popup function end -------------------------------
    const handleAccept = (withdraw) => {
        reset();
        setNewStatus("success");
        setallEntryUpdate(withdraw);
        openModal();
    }
    const handleReject = (withdraw) => {
        reset();
        setNewStatus("reject");
        setallEntryUpdate(withdraw);
        openModal();
    }

    const onSubmit = (data) => {
        if (allEntryUpdate) {
            axios
                .patch(
                    `/api/withdrawal-request/update-one/${allEntryUpdate._id}`,
                    data
                )
                .then((res) => {
                    const { withdrawalRequest, error, message } = res.data;
                    closeModal();
                    createNotification("success", `SUCCESSFULLY`, `${message}`);
                    setallEntryUpInfo(withdrawalRequest);
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
                .post("/api/withdrawal-request/create", data)
                .then((res) => {
                    const { withdrawalRequest, error, message } = res.data;
                    closeModal();
                    createNotification("success", "SUCCESSFULLY", `${message}`);
                    setNewallEntry(withdrawalRequest);
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
        setallEntryUpdate("");
    };

    useEffect(() => {
        axios
            .get("/api/withdrawal-request/get-all")
            .then((res) => {
                //console.log("allEntry 83 =", res);
                const { withdrawalRequest, error, message } = res.data;
                setallEntry(withdrawalRequest);
            })
            .catch((err) => {
                //console.log(err.response?.data.message);
            });

    }, [newallEntry, allEntryUpInfo]);

    useEffect(() => {
        axios.get("/api/withdrawal-method/get-all")
            .then((res => setMethods(res.data.withdrawalMethod)))
            .catch((err) => console.log(err));

        axios.get("/api/user/get-all")
            .then(res => setUsers(res.data.user))
            .catch((err) => console.log(err));
    }, [])

    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">


                    {/* navbar */}
                    <MyNavbar page={"All Withdraw Request"} />
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
                                                        <h5>All Withdraw Request</h5>
                                                    </div>
                                                    <div class="card-block table-border-style">
                                                        <div class="table-responsive">
                                                            <table class="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Name</th>
                                                                        <th>Wallet Amount</th>
                                                                        <th>Withdraw Amount</th>
                                                                        <th>Method</th>
                                                                        <th>Account No</th>
                                                                        <th>Status</th>
                                                                        <th>Note</th>
                                                                        <th>Accept</th>
                                                                        <th>Reject</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {
                                                                        allEntry?.map(entry => (
                                                                            <tr key={entry?._id}>
                                                                                <th scope="row">{entry?._id}</th>
                                                                                <td>{users?.find(user => user?._id === entry?.userId)?.name}</td>
                                                                                <td>{users?.find(user => user?._id === entry?.userId)?.walletAmount}</td>
                                                                                <td>{entry?.amount}</td>
                                                                                <td>{methods?.find(method => method?._id === entry?.withdrawalMethodId)?.title}</td>
                                                                                <td>{entry?.accountNo}</td>
                                                                                <td ><b>{entry?.status}</b></td>
                                                                                <td>{entry?.note}</td>
                                                                                <td>{
                                                                                    entry?.status === 'success' ? null : entry?.status === 'reject' ? null
                                                                                        : <button onClick={() => handleAccept(entry)} class="btn btn-out btn-primary">Accept</button>}</td>
                                                                                <td>{
                                                                                    entry?.status === 'success' || entry?.status === 'reject' ? null
                                                                                        : <button onClick={() => handleReject(entry)} class="btn btn-out btn-danger">Reject</button>}</td>
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
                        <div className="col-sm-6 mb-2" >
                            <input
                                type="text"
                                value={users?.find(user => user?._id === allEntryUpdate?.userId)?.name}
                                className="form-control"
                                readOnly
                            />
                        </div>
                        <div className="col-sm-6 mb-2" >
                            <input
                                type="text"
                                value={allEntryUpdate?.amount + "৳"}
                                className="form-control"
                                readOnly
                            />
                            
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-12 mb-2" >
                            <input
                                type="text"
                                id="status"
                                placeholder="Enter status"
                                value={newStatus}
                                className="form-control"
                                {...register("status", { required: true })}
                            />
                            {errors.status && (
                                <span className="text-danger">status is required</span>
                            )}
                        </div>
                        <div className="col-sm-12 mb-2" >
                            <input
                                type="text"
                                id="note"
                                placeholder="Enter Note"
                                defaultValue="Ok / Whats reason..."
                                className="form-control"
                                {...register("note", { required: true })}
                            />
                            {errors.note && (
                                <span className="text-danger">Note is required</span>
                            )}
                        </div>

                    </div>
                    <button type="submit" className={newStatus === "success" ? "btn btn-success btn-block" : "btn btn-danger btn-block"}>Are You Sure!</button>
                </form>

            </Modal>
            {/* --------------------- modal / popup end ---------------------- */}


        </section>

    );
};

export default AllWithdraw;