import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
// import { storeUser } from "./service/dataService.js";
import { connect } from "react-redux";
import * as actionTypes from './store/actions/index';
import Storage from "./service/Storage.js";

import Signin from './component/signin/Signin';
import Signup from './component/signup/Signup';
import Profile from './component/profile/Profile.jsx';
import NotFound from './component/not-found/NotFound';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import PostDisp from './component/async-list/PostDisp';
import Dashboard from './component/dashboard/Dashboard.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const serverData = new Storage();
const tempArr = [{ name: 'Alabi', age: 30, isOnline: true }];
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { fullName: '', password: '', jobTitle: '', email: '' },
      users: { email: '', password: '' }
    };
    this.child = React.createRef();
  }

  handelAddUser = (user) => {
    const data = { ...user };
    // this.setState({ users: data });
    this.props.onLoginUser(data)
    return data;
  }

  dataToSend(data) {
    return { "name": data.fullName, "email": data.email, "password": data.password }
  }

  componentDidMount() {

    // this.setState({ users: { ...user } });
    // undo this back
    if (serverData.getItemsFromStorage() !== null) {
      let user = serverData.getItemsFromStorage();
      delete user.loginNow;
      if (this.props.onLoginUser) {
        this.props.onLoginUser(user);
      }
    }
  }


  render() {
    return (
      <div data-test="appComponent">
        <ToastContainer />
        <Switch>
          <Route path="/not-found" component={NotFound} />
          <Route path="/list-post" component={PostDisp} />
          <Route path="/signin" render={(props) => <Signin {...props} tempArr={tempArr} />} />
          <ProtectedRoute path="/dashboard" render={(props) => <Dashboard {...props} />} />
          <Route exact path="/" render={(props) => <Signup {...props} handelAddUser={this.handelAddUser} />} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUser: (val) => dispatch({
      type: actionTypes.LOGIN_USER, resultEld: {
        fullName: val.fullName, jobTitle: val.jobTitle,
      }
    })
  }
}



App.propTypes = {
  onLoginUser: PropTypes.func,
};

App.defaultProps = {
  user: {},
};

export default connect(null, mapDispatchToProps)(App);


