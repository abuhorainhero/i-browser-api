import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Users from './pages/Users';
import Admin from './pages/Admin';
import AllAds from './pages/AllAds';
import AllInterest from './pages/AllInterest';
import AllCountry from './pages/AllCountry';
import AllCity from './pages/AllCity';
import AllNews from './pages/AllNews';
import AllSiteRevenue from './pages/AllSiteRevenue';
import SpecialSiteRevenue from './pages/SpecialSiteRevenue';
import AllWithdraw from './pages/AllWithdraw';
import SuccessWithdraw from './pages/SuccessWithdraw';
import RejectWithdraw from './pages/RejectWithdraw';
import WithdrawMethod from './pages/WithdrawMethod';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import LocallyStore from './components/LocallyStore';
import 'react-notifications/lib/notifications.css';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound'

export const UserContext = createContext()

function App() {
  const [accessibility, setAccessibility] = useState({});
  const [loggedInUser] = LocallyStore("loggedInUser", {});


  useEffect(() => {
    if (loggedInUser?._id) {
      axios
        .get(`/api/admin/get-one/${loggedInUser._id}`)
        .then((res) => {
          setAccessibility(res?.data?.admin);
        });
    }
  }, [loggedInUser, accessibility]);

  console.log("App to -= ", accessibility, ".... ", loggedInUser)

  return (
    <UserContext.Provider value={[accessibility, setAccessibility]}>

      <Router>
        <Switch>

          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute path="/users">
            <Users />
          </PrivateRoute>

          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>

          <PrivateRoute path="/all-ads" >
            <AllAds />
          </PrivateRoute>

          <PrivateRoute path="/all-interest">
            <AllInterest />
          </PrivateRoute>

          <PrivateRoute path="/all-country">
            <AllCountry />
          </PrivateRoute>

          <PrivateRoute path="/all-city">
            <AllCity />
          </PrivateRoute>

          <PrivateRoute path="/all-news" >
            <AllNews />
          </PrivateRoute>

          <PrivateRoute path="/all-site-revenue" >
            <AllSiteRevenue />
          </PrivateRoute>

          <PrivateRoute path="/special-site-revenue">
            <SpecialSiteRevenue />
          </PrivateRoute>

          <PrivateRoute path="/all-withdraw">
            <AllWithdraw />
          </PrivateRoute>

          <PrivateRoute path="/success-withdraw" >
            <SuccessWithdraw />
          </PrivateRoute>

          <PrivateRoute path="/reject-withdraw">
            <RejectWithdraw />
          </PrivateRoute>

          <PrivateRoute path="/withdraw-method">
            <WithdrawMethod />
          </PrivateRoute>

          <Route path="/login" component={Login} />

          <Route path="*" component={NotFound} />

        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
