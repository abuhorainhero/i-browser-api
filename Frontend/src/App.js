import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Home/NotFound/NotFound";
import DashBoard from "./Components/Home/DashBoard/DashBoard";

import LoginForm from "./Components/Home/LoginForm/LoginForm";
import Profile from "./Components/Home/Profile/Profile";
import { createContext, useEffect, useState } from "react";
import PrivateRoute from "./Components/Home/LoginForm/PrivateRoute";
import 'react-notifications/lib/notifications.css';
import axios from "axios";
import LocalStorage from "./Components/Home/LocalStorage";
import loading from './Images/loading.gif';
import Ads from "./Components/Home/DashBoard/Ads/Ads";
import Interest from "./Components/Home/DashBoard/Interest/Interest";
import Users from "./Components/Home/DashBoard/Users/Users";
import Admin from "./Components/Home/DashBoard/Admin/Admin";
import City from "./Components/Home/DashBoard/City/City";
import Country from "./Components/Home/DashBoard/Country/Country";
import SpecialSite from "./Components/Home/DashBoard/SpecialSite/SpecialSite";
import OtherSite from "./Components/Home/DashBoard/OtherSIte/OtherSite";
import News from "./Components/Home/DashBoard/News/News";
import AllEntry from "./Components/Home/DashBoard/Withdraw/AllEntry";
import SuccessEntry from "./Components/Home/DashBoard/Withdraw/SuccessEntry";
import RejectEntry from "./Components/Home/DashBoard/Withdraw/RejectEntry";
// ------------------------------------------------------- new ---------------

export const UserContext = createContext();

function App() {
  const [accessbility, setAccessbility] = useState({});
  const [loggedInUser] = LocalStorage("loggedInUser", {});


  useEffect(() => {
    // //console.log('hit api')
    if (loggedInUser?._id) {
      axios
        .get(`/api/admin/get-one/${loggedInUser._id}`)
        .then((res) => {
          setAccessbility(res.data.admin);
        })
    }
  }, [loggedInUser])


  return (
    <UserContext.Provider value={[accessbility, setAccessbility]}>


      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>

          {/* -------------- new start --------------------- */}

          <PrivateRoute path="/ads"><Ads /></PrivateRoute>
          <PrivateRoute path="/interest"><Interest /></PrivateRoute>
          <PrivateRoute path="/users"><Users /></PrivateRoute>
          <PrivateRoute path="/admin"><Admin /></PrivateRoute>
          <PrivateRoute path="/city"><City /></PrivateRoute>
          <PrivateRoute path="/country"><Country /></PrivateRoute>
          <PrivateRoute path="/special-site"><SpecialSite /></PrivateRoute>
          <PrivateRoute path="/other-site"><OtherSite /></PrivateRoute>
          <PrivateRoute path="/news"><News /></PrivateRoute>
          <PrivateRoute path="/all-entry"><AllEntry /></PrivateRoute>
          <PrivateRoute path="/success-entry"><SuccessEntry /></PrivateRoute>
          <PrivateRoute path="/reject-entry"><RejectEntry /></PrivateRoute>


          {/* ---------------- new end --------------------- */}

          <PrivateRoute path="/dashboard">
            <DashBoard />
          </PrivateRoute>

          <Route path="/login">
            <LoginForm />
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <Route path="*"> <NotFound /> </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
