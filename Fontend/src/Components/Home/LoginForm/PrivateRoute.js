import React from 'react';
import { Redirect, Route } from 'react-router';

import LocalStorage from '../LocalStorage';

const PrivateRoute =({ children, ...rest }) => {
    const [ loggedInUser, setLoggedInUser ] = LocalStorage( 'loggedInUser', {} );


    return (
      <Route
        {...rest}
        render={({ location }) =>
        loggedInUser._id ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;