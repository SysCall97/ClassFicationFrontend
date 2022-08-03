import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { context } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;

    return (
        <Route
            {...rest}
            render={({ location }) =>
            loggedinUser.isLoggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;