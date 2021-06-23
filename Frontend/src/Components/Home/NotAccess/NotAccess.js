import React from 'react';

const page_wrap ={
    minHeight: "100vh"
}
const NotAccess = () => {
    return (
        <div style={page_wrap} className="d-flex flex-row align-items-center">
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <span className="display-1 font-weight-bold d-block">404</span>
                    <div className="mb-4 lead">Sorry ! You are not allow for this page !</div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default NotAccess;