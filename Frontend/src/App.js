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
// ------------------------------------------------------- new ---------------

export const UserContext = createContext();

function App() {
  const [accessbility, setAccessbility] = useState({});
  const [loggedInUser] = LocalStorage("loggedInUser", {});


  useEffect(() => {
    // console.log('hit api')
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

          <Route path="/ads"><Ads /></Route>
          <Route path="/interest"><Interest /></Route>
          <Route path="/users"><Users /></Route>
          <Route path="/admin"><Admin /></Route>
          <Route path="/city"><City /></Route>
          <Route path="/country"><Country /></Route>


          {/* ---------------- new end --------------------- */}

          <PrivateRoute path="/dashboard">
            <DashBoard />
          </PrivateRoute>


          <Route exact path="/login">
            <LoginForm />
          </Route>
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>

          {/* <Route path="*">
            <NotFound />
          </Route> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
