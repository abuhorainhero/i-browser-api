import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../../App";
import DashboardHeader from "../DashboradHeader/DashboardHeader";
import SideBar from "../Sidebar/SideBar";
import "./AddUser.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Table } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";
import "./AddUser.css";
import NotAccess from "../../NotAccess/NotAccess";
import LocalStorage from "../../LocalStorage";
import { NotificationContainer } from "react-notifications";
import createNotification from "../../Notification/Notification";
import ReactLoading from "react-loading";
import { connect } from "react-redux";

const AddUser = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [userUpdate, setUserUpdate] = useState(false);
  const [ifAdmin, setIfAdmin] = useState("Admin");
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [processing, setProcessing] = useState(false);
  const [accessbility, setAccessbility] = useContext(UserContext);

  // console.log(selectItem)
  const onSubmit = (data) => {
    // console.log(data);
    setProcessing(true);
    if (JSON.stringify(selectItem) !== "{}") {
      axios
        .patch(
          `https://murmuring-hollows-53734.herokuapp.com/user/user-update-one/${selectItem._id}`,
          data
        )
        .then((res) => {
          const { user, error, token, message } = res.data;
          setReload(!reload);
          // console.log(user);
          setSelectItem({});
          createNotification("success", "SUCCESSFULLY", `${message}`);
          handleClear();
          setProcessing(false);
        })
        .catch((err) => {
          setProcessing(false);
          // console.log(err);
        });
    } else {
      axios
        .post(
          "https://murmuring-hollows-53734.herokuapp.com/user/user-create",
          data.role === "Admin"
            ? {
                ...data,
                vendors: true,
                sells: true,
                paymentManage: true,
                pendingOrder: true,
                products: true,
                sellHistory: true,
                paymentHistory: true,
                salary: true,
                otherCost: true,
                sellReport: true,
                productReport: true,
                addUser: true,
                productList: true,
              }
            : data
        )
        .then((res) => {
          setReload(!reload);
          const { user, error, token, message } = res.data;

          createNotification("success", "SUCCESSFULLY", `${message}`);
          handleClear();
          setProcessing(false);
          setSelectItem({});
        })
        .catch((err) => {
          setProcessing(false);
          createNotification(
            "warning",
            "FAILED",
            `${err.response?.data.message}`
          );
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://murmuring-hollows-53734.herokuapp.com/user/user-read-all")
      .then((res) => {
        const { user, error, token, message } = res.data;
        setUsers(user);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [reload]);

  const handleClear = () => {
    setUserUpdate("");
    setIfAdmin("Admin");
    setSelectItem({});
  };

  const handleUpdate = (info) => {
    // console.log("update ID ; ", info);
    setSelectItem(info);
    setModalShow(true);
  };

  const handleDelete = (id) => {
    // console.log("update ID ; ", id);

    axios
      .delete(
        `https://murmuring-hollows-53734.herokuapp.com/user/user-delete-one/${id}`
      )
      .then((res) => {
        // console.log(res);
        const { vendor, error, token, message } = res.data;
        setReload(!reload);
        createNotification("success", "SUCCESSFULLY", `${message}`);
        // setVenDeleteThen(vendor);
      })
      .catch((err) => {
        createNotification(
          "warning",
          "FAILED",
          `${err.response?.data.message}`
        );
      });
  };
  // console.log(ifAdmin);

  return (
    <div className="row">
      {props.sidebarActive && (
        <div className="col-md-2">
          <SideBar />
        </div>
      )}

      <div className={props.sidebarActive ? "col-md-10" : "col-md-12"}>
        <DashboardHeader name={"Add User"} />
        {accessbility.addUser === true ? (
          <section className="container-fluid dashboard_content mt-4">
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="col-md-6">
                  <div className="input-group  my-2">
                    <label className="input-group-text" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter user name"
                      value={selectItem?.name}
                      className="form-control"
                      ref={register({ required: true })}
                    />
                    {errors.name && (
                      <span className="text-danger">name is required</span>
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-group-text" htmlFor="role">
                      Role
                    </label>
                    <select
                      name="role"
                      id="role"
                      className="form-control form-select"
                      ref={register({ required: true })}
                      onChange={(e) => (
                        setIfAdmin(e.target.value), setSelectItem({})
                      )}
                      value={selectItem && selectItem.role}
                    >
                      <option>Admin</option>
                      <option>Moderator</option>
                    </select>
                    {errors.role && (
                      <span className="text-danger">User Role is required</span>
                    )}
                  </div>

                  <div className="input-group  my-2">
                    <label className="input-group-text" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter user email"
                      value={selectItem && selectItem.email}
                      className="form-control"
                      ref={register({ required: true })}
                    />
                    {errors.email && (
                      <span className="text-danger">email is required</span>
                    )}
                  </div>
                  <div className="input-group  my-2">
                    <label className="input-group-text" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="text"
                      name="password"
                      id="password"
                      placeholder="Enter user password"
                      value={selectItem && selectItem.password}
                      className="form-control"
                      ref={register({ required: true })}
                    />
                    {errors.password && (
                      <span className="text-danger">Password is required</span>
                    )}
                  </div>
                  <div className="input-group  my-2">
                    <label className="input-group-text" htmlFor="number">
                      Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      placeholder="Enter user number"
                      value={selectItem && selectItem.number}
                      className="form-control"
                      ref={register({ required: true })}
                    />
                    {errors.number && (
                      <span className="text-danger">number is required</span>
                    )}
                  </div>
                </div>
                <div className={`col-md-6 opacity_block`}>
                  {ifAdmin === "Moderator" || selectItem?.role ? (
                    <>
                      <h5 className="text-center">Permissions</h5>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-check my-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="vendors"
                              id="vendors"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.vendors ? true : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="vendors"
                            >
                              Vendors
                            </label>
                          </div>

                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="products"
                              id="products"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.products === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="products"
                            >
                              Products
                            </label>
                          </div>

                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="sells"
                              id="sells"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.sells === true
                                  ? true
                                  : false
                              }
                            />
                            <label className="form-check-label" htmlFor="sells">
                              Sells
                            </label>
                          </div>

                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="pendingOrder"
                              id="pendingOrder"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.pendingOrder === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="pendingOrder"
                            >
                              Pending Order
                            </label>
                          </div>

                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="paymentManage"
                              id="paymentManage"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.paymentManage === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="paymentManage"
                            >
                              Payment Manage
                            </label>
                          </div>
                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="sellHistory"
                              id="sellHistory"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.sellHistory === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="sellHistory"
                            >
                              Sell History
                            </label>
                          </div>
                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="paymentHistory"
                              id="paymentHistory"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.paymentHistory === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="paymentHistory"
                            >
                              Payment History
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="salary"
                              id="salary"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.salary === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="salary"
                            >
                              Salary
                            </label>
                          </div>
                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="otherCost"
                              id="otherCost"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.otherCost === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="otherCost"
                            >
                              Other Cost
                            </label>
                          </div>
                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="sellReport"
                              id="sellReport"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.sellReport === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="sellReport"
                            >
                              Sell Report
                            </label>
                          </div>
                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="productReport"
                              id="productReport"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.productReport === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productReport"
                            >
                              Product Report
                            </label>
                          </div>
                          <div className="form-check my-2">
                            <input
                              type="checkbox"
                              name="productList"
                              id="productList"
                              className="form-check-input"
                              ref={register()}
                              defaultChecked={
                                selectItem && selectItem.productList === true
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productList"
                            >
                              Products List
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="col-md-6 mt-3 d-flex">
                  {processing ? (
                    <span className="btn btn-success mr-2 w-25 d-flex">
                      Processing{" "}
                      <ReactLoading
                        type={"bubbles"}
                        color={"#FFFFFF"}
                        height={10}
                        width={60}
                      />
                    </span>
                  ) : (
                    <button
                      type="submit"
                      id="update"
                      className="btn btn-success mr-2"
                      title="Save Data"
                    >
                      {JSON.stringify(selectItem) === "{}"
                        ? "User Add"
                        : "User Update"}
                    </button>
                  )}

                  {JSON.stringify(selectItem) === "{}" ? (
                    <button
                      type="reset"
                      className="btn btn-warning"
                      onClick={() => handleClear()}
                    >
                      RESET
                    </button>
                  ) : (
                    <button
                      type="reset"
                      className="btn btn-warning"
                      onClick={() => setSelectItem({})}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Table */}
            <div className="mt-3">
              {users.length > 0 && (
                <>
                  <h2 className="text-center mb-4 mt-5">Present User's</h2>

                  <h4>
                    {" "}
                    Admin -{" "}
                    {users.filter((user) => user.role === "Admin").length}
                  </h4>
                  <div className="table_div">
                    <Table className="table-responsive"    className="table-responsive" striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th> No.</th>
                          <th> Role</th>
                          <th> Name</th>
                          <th> Email</th>
                          <th> Password</th>
                          <th> Number</th>
                          <th> Create Date</th>
                          <th className="text-center">Modify</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .filter((item) => item.role === "Admin")
                          .map((info, index) => (
                            <tr key={info._id}>
                              <td>{index + 1}</td>
                              <td>{info.role}</td>
                              <td>{info.name}</td>
                              <td>{info.email}</td>
                              <td>{info.password}</td>
                              <td>0{info.number}</td>
                              <td>
                                {new Date(`${info.createdAt}`).toLocaleString()}
                              </td>
                              <td className="text-center">
                                <span
                                  className="btn btn-info"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleUpdate(info)}
                                >
                                  <EditIcon />
                                </span>
                                <span
                                  className="btn btn-danger ml-2"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(info._id)}
                                >
                                  <DeleteForeverIcon />
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>

                  <h4>
                    {" "}
                    Moderator -{" "}
                    {users.filter((user) => user.role === "Moderator").length}
                  </h4>
                  <div className="table_div">
                    <Table className="table-responsive"    striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th> No.</th>
                          <th> Role</th>
                          <th> Name</th>
                          <th> Email</th>
                          <th> Password</th>
                          <th> Number</th>
                          <th> Create Date</th>
                          <th className="text-center">Modify</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .filter((item) => item.role === "Moderator")
                          .map((info, index) => (
                            <tr key={info._id}>
                              <td>{index + 1}</td>
                              <td>{info.role}</td>
                              <td>{info.name}</td>
                              <td>{info.email}</td>
                              <td>{info.password}</td>
                              <td>0{info.number}</td>
                              <td>{info.createdAt}</td>
                              <td className="text-center">
                                <span
                                  className="btn btn-info"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleUpdate(info)}
                                >
                                  <EditIcon />
                                </span>{" "}
                                ||{" "}
                                <span
                                  className="btn btn-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(info._id)}
                                >
                                  <DeleteForeverIcon />
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
            </div>
          </section>
        ) : (
          <NotAccess />
        )}
      </div>
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sidebarActive: state.sidebarActive,
});

export default connect(mapStateToProps)(AddUser);
