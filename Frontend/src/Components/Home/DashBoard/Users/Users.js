import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../App';
import SideBar from '../Sidebar/SideBar';
import "./Users.css";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import { Table } from '@material-ui/core';
import { connect } from 'react-redux';

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

// Modal.setAppElement('');

const Users = (props) => {

    const [users, setUsers] = useState([]);
    const [modalUser, setModalUser] = useState({});
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);
    const [accessbility, setAccessbility] = useContext(UserContext);

    useEffect(() => {
        axios.get('/api/user/get-all')
            .then(res => {
                const { user, error, message } = res.data
                setUsers(user)
            }).catch(err => {
                console.error(err)
            });

        axios.get('/api/country/get-all')
            .then(res => {
                const { country, error, message } = res.data
                setCountry(country)
            }).catch(err => {
                console.error(err)
            });

        axios.get('/api/city/get-all')
            .then(res => {
                const { city, error, message } = res.data
                setCity(city)
            }).catch(err => {
                console.error(err)
            });

    }, []);

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
        axios.get(`/api/user/get-one/${id}`)
            .then(res => {
                const { user, error, message } = res.data
                setModalUser(user);
                openModal();
            }).catch(err => {
                console.error(err)
            });
    }

    return (
        <div className="row">
            {props.sidebarActive && (
                <div className="col-md-2">
                    <SideBar />
                </div>
            )}
            <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
                <DashboardHeader name={"All Users"} />

                {/* {accessbility.ads === true ? ( */}
                <section className="container-fluid dashboard_content mt-4">

                    <div className="my-3">
                        <h2 className="text-center mb-4 mt-5">All Users</h2>
                        {users?.length > 0 && (
                            <div className="table_div">
                                <Table className="" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th> Count</th>
                                            <th> Name</th>
                                            <th> Phone</th>
                                            <th> Country</th>
                                            <th> City</th>
                                            <th> Wallet Amount</th>
                                            <th> Total Ads Viewed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((info, index) => (
                                            <tr key={info._id} onClick={() => handleUser(info._id)} className="userModel text-center">
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {info.name}
                                                </td>
                                                <td>
                                                    {info.phone}
                                                </td>
                                                <td>
                                                    {country?.find(cou => cou._id == info.countryId)?.name}
                                                </td>
                                                <td>
                                                    {city?.find(cou => cou._id == info.cityId)?.name}
                                                </td>
                                                <td>
                                                    {info.walletAmount}
                                                </td>
                                                <td>
                                                    {info.totalAdsViewed}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                </section>

                {/* ): (
                    <NotAccess />
                )} */}


                {/* --------------------- modal / popup start -------------------- */}

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button className="closeBtn" onClick={closeModal}>X</button>
                    <div className="row">
                        <div className="col-md-6">
                            <p> <b>ID:</b> {modalUser._id}</p>
                            <p> <b>Name:</b> {modalUser.name}</p>
                            <p> <b>Phone:</b> {modalUser.phone}</p>
                            <p> <b>Email:</b> {modalUser.email}</p>
                            <p> <b>Gender:</b> {modalUser.gender}</p>
                            <p> <b>Country:</b> {country?.find(cou => cou._id == modalUser.countryId)?.name}</p>
                            <p> <b>City:</b> {city?.find(cou => cou._id == modalUser.cityId)?.name}</p>
                            <p> <b>createdAt:</b> {new Date(`${modalUser.createdAt}`).toLocaleString("en-US")}</p>

                        </div>
                        <div className="col-md-6">
                            <p> <b>walletAmount:</b> {modalUser.walletAmount}</p>
                            <p> <b>totalMinuteServed:</b> {modalUser.totalMinuteServed}</p>
                            <p> <b>totalAdsViewed:</b> {modalUser.totalAdsViewed}</p>

                            <p> <b>withdrawalMethodId:</b> {modalUser.withdrawalMethodId}</p>
                            <p> <b>accountNo:</b> {modalUser.accountNo}</p>
                            <p> <b>interests:</b> {modalUser.interests}</p>
                            <p> <b>createdAt:</b> {new Date(`${modalUser.updatedAt}`).toLocaleString("en-US")}</p>

                        </div>
                    </div>
                </Modal>

                {/* --------------------- modal / popup end ---------------------- */}
            </div>

        </div>
    );
};

const mapStateToProps = (state) => ({
    sidebarActive: state.sidebarActive,
});


export default connect(mapStateToProps)(Users);