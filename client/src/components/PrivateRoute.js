import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router';

function PrivateRoute({component: Component, ...rest}) {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    return (
        <Route 
            {...rest} 
            render = {(props) => 
                userInfo? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to = '/signin' />
                )
            }
        />
    )
}

export default PrivateRoute
