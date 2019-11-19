import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Storage from '../service/Storage.js';
const data = new Storage();
const newData = data.getItemsFromStorage();





const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {

    return (

        < Route
            {...rest}
            render={props => {
                console.log(newData)
                if (!newData) return <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />;
                return Component ? <Component {...props} /> : render(props);
            }} />
    );
}

const mapStateToProps = (state) => {
    return { storedUser: state.user }
}
export default connect(mapStateToProps)(ProtectedRoute);
