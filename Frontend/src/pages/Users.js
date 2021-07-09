import React, { useContext, useState } from 'react';
import MyNavbar from '../components/MyNavbar';
import MySidebar from '../components/MySidebar';
import Modal from 'react-modal';
import { UserContext } from '../App';
import { useEffect } from 'react';
import axios from 'axios';

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

const Users = () => {

    const [users, setUsers] = useState([]);
    const [modalUser, setModalUser] = useState({});
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);
    const [methods, setMethods] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    useEffect(() => {
        axios.get('https://i-browser-api.herokuapp.com/api/user/get-all')
            .then(res => setUsers(res.data.user))
            .catch(err => console.error(err));

        axios.get('https://i-browser-api.herokuapp.com/api/country/get-all')
            .then(res => setCountry(res.data.country))
            .catch(err => console.error(err));

        axios.get('https://i-browser-api.herokuapp.com/api/city/get-all')
            .then(res => setCity(res.data.city))
            .catch(err => console.error(err));


        axios.get("https://i-browser-api.herokuapp.com/api/withdrawal-method/get-all")
            .then((res => setMethods(res.data.withdrawalMethod)))
            .catch((err) => console.log(err));
    }, []);
    console.log("user.... => ", users)
    // ------------------------------- modal / popup function start -------------------------------

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    // ------------------------------- modal / popup function end -------------------------------

    const handleUser = (id) => {
        axios.get(`https://i-browser-api.herokuapp.com/api/user/get-one/${id}`)
            .then(res => {
                setModalUser(res.data.user);
                openModal();
            }).catch(err => console.error(err));
    }


    return (
        <section>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">


                    {/* navbar */}
                    <MyNavbar page={"All Users"} />
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
                                                        <h5>All User</h5>
                                                    </div>
                                                    <div className="card-block table-border-style">
                                                        <div className="table-responsive">
                                                            <table className="table table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Name</th>
                                                                        <th>Phone No</th>
                                                                        <th>Email</th>
                                                                        <th>Gender</th>
                                                                        <th>Withdraw Method</th>
                                                                        <th>Account No</th>
                                                                        <th>City</th>
                                                                        {/* <th>Edit</th> */}
                                                                        <th>Country</th>
                                                                        <th>Interest</th>
                                                                        <th>Wallet Balance</th>
                                                                        <th>Paid Amount</th>
                                                                        <th>Viewed Ads</th>
                                                                        <th>Browsing (minutes)</th>
                                                                        <th>AC Created Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        users?.map(user => (
                                                                            <tr key={user?._id} onClick={() => handleUser(user?._id)}>
                                                                                <th scope="row">{user?._id}</th>
                                                                                <td>{user?.name}</td>
                                                                                <td>{user?.phone}</td>
                                                                                <td>{user?.email}</td>
                                                                                <td>{user?.gender}</td>
                                                                                <td>{methods?.find(method => method?._id === user?.withdrawalMethodId)?.title}</td>
                                                                                <td>{user?.accountNo}</td>
                                                                                <td>{city?.find(city => city?._id === user?.cityId)?.name}</td>
                                                                                {/* <td><a href="edit-user.html"><button className="btn btn-out btn-primary">Edit</button></a></td> */}
                                                                                <td>{country?.find(country => country?._id === user?.countryId)?.name}</td>
                                                                                <td>{user?.interests?.join(", ")}</td>
                                                                                <td>{user?.walletAmount}</td>
                                                                                <td>{"I don't know"}</td>
                                                                                <td>{user?.totalAdsViewed}</td>
                                                                                <td>{user?.totalMinuteServed}</td>
                                                                                <td>{new Date(`${user?.createdAt}`).toLocaleString("bn")}</td>
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
            {/* <!-- Warning Section Ends -->
<!-- Required Jquery --> */}


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
                <div className="row">
                    <div className="col-md-6">
                        <p> <b>ID:</b> {modalUser?._id}</p>
                        <p> <b>Name:</b> {modalUser?.name || "---"}</p>
                        <p> <b>Phone:</b> {modalUser?.phone || "---"}</p>
                        <p> <b>Email:</b> {modalUser?.email || "---"}</p>
                        <p> <b>Gender:</b> {modalUser?.gender || "---"}</p>
                        <p> <b>Country:</b> {country?.find(cou => cou._id === modalUser?.countryId)?.name || "---"}</p>
                        <p> <b>City:</b> {city?.find(cou => cou._id === modalUser?.cityId)?.name || "---"}</p>
                        <p> <b>createdAt:</b> {new Date(`${modalUser?.createdAt}`).toLocaleString("bn")}</p>

                    </div>
                    <div className="col-md-6">
                        <p> <b>walletAmount:</b> {modalUser?.walletAmount}</p>
                        <p> <b>totalMinuteServed:</b> {modalUser?.totalMinuteServed}</p>
                        <p> <b>totalAdsViewed:</b> {modalUser?.totalAdsViewed}</p>

                        <p> <b>withdrawal Method:</b> {methods?.find(method => method?._id === modalUser?.withdrawalMethodId)?.title || "---"}</p>
                        <p> <b>accountNo:</b> {modalUser?.accountNo || "---"}</p>
                        <p> <b>interests:</b> {modalUser?.interests?.join(", ") || "---"}</p>
                        <p> <b>Last updateAt:</b> {new Date(`${modalUser?.updatedAt}`).toLocaleString("bn")}</p>

                    </div>
                </div>
            </Modal>
            {/* --------------------- modal / popup end ---------------------- */}

        </section>
    );
};

export default Users;