import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import LocallyStore from '../components/LocallyStore';
import MyNavbar from '../components/MyNavbar';
import createNotification from '../components/Notification';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [loader, setLoader] = useState(false);
    const [loggedInUser, setLoggedInUser] = LocallyStore('loggedInUser', {});
    const [accessibility, setAccessibility] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const onSubmit = (data) => {
        if (data.email && data.password) {
            axios
                .post(`/api/admin/admin-login`, data)
                .then((res) => {
                    //console.log("loginFrom 28 = ", res.data)
                    createNotification('success', 'LOG IN', 'Successfully !');
                    setLoggedInUser({ _id: res.data.admin._id })
                    setAccessibility(res.data.admin)

                    //   লগইন successfull হলে replace করতে হবে from এ
                    setTimeout(() => {
                        history.replace(from);
                    }, 1000)
                    setLoader(false)
                })
                .catch((err) => {
                    //console.log(err.response)
                    setLoader(false)
                    createNotification('warning', `${err.response?.data.message}`, '')


                });

            // ইনপুট এর পাশে লোডিং আর জন্য এটা; যখন ডাটা পোস্ট হবে তখন setLoader(false) করেতে হবে
            setLoader(true);
            // ইনপুট এর পাশে লোডিং আর জন্য এটা; যখন ডাটা পোস্ট হবে তখন setLoader(false) করেতে হবে
        }
    };
    //console.log(loggedInUser);

    return (
        <section className="fix-menu">
            <section class="login p-fixed d-flex text-center bg-primary common-img-bg">
                {/* <!-- Container-fluid starts --> */}
                
                <NotificationContainer />

                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            {/* <!-- Authentication card start --> */}
                            <div class="login-card card-block auth-body mr-auto ml-auto">

                                <form onSubmit={handleSubmit(onSubmit)} class="md-float-material">
                                    <div class="text-center">
                                        <img src="assets/images/logo.png" alt="logo.png" />
                                    </div>
                                    <div class="auth-box">
                                        <div class="row m-b-20">
                                            <div class="col-md-12">
                                                <h3 class="text-left txt-primary">Sign In to Admin Panel</h3>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="input-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email Address"
                                                {...register("email", { required: true })}
                                            />
                                            {errors.email && (
                                                <span className="errors">This field is required</span>
                                            )}
                                            <span class="md-line"></span>
                                        </div>
                                        <div class="input-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Password"
                                                {...register("password", { required: true })}
                                            />
                                            {errors.password && (
                                                <span className="errors">This field is required</span>
                                            )}
                                            <span class="md-line"></span>
                                        </div>
                                        <div class="row m-t-30">
                                            <div class="col-md-12">
                                                <button type="submit" class="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">Sign in</button>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </form>


                                {/* <!-- end of form --> */}
                            </div>
                            {/* <!-- Authentication card end --> */}
                        </div>
                        {/* <!-- end of col-sm-12 --> */}
                    </div>
                    {/* <!-- end of row --> */}
                </div>
                {/* <!-- end of container-fluid --> */}
            </section>

        </section>

    );
};

export default Login;