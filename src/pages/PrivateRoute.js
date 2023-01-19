//Protects route from unauthorized users 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children, path, exact}) => {
  const { user } = useAuth0();
  //if user is logged in then rout is accessible
  return user ? <Route path={path} exact={exact}>{children}</Route> : <Redirect to='/'/>
};
export default PrivateRoute;
