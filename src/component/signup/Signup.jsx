import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../../service/userService';
import { fetchPosts } from '../../store/actions/index';
import * as actions from '../../store/actions/index';
import { getCurrentUser } from "../../service/userService.js";
import MultiForm from '../template/MultiForm';


import 'antd/dist/antd.css';

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.child = React.createRef();
        this.fetch = this.fetch.bind(this);

    }

    fetch() {
        this.props.fetchPosts();
    }

    getData() {
        // getUsers().then(resp => resp.json()).then((body) => {
        //     if (body) { toast.success("data retrieved successfully"); }
        // }, (error) => {
        //     if (error.response && error.response.status === 422) { toast.error(error.response.data.body.message); }
        //     else { console.error(error); toast.error("an unexpected error occurred signup"); }
        // }).catch((error) => { console.error(error) })
    }


    getUserData(user) {
        return {
            "email": user.email,
            "password": user.password
        }
    }

    onSubmitToServer = (user) => {
        const saveData = user;
        delete saveData.confirm;
        const body = { email: user.email, password: user.password }
        // this.getUserData(user)
        this.createUser(body)
    }
    async createUser(user) {
        try {
            const res = await createUser(user);
            const token = res.data.data.token;
            localStorage.setItem('currentUser', token);
            toast.success(`Signup Successful, Welcome `);
            window.location = '/dashboard';
            console.log(res);
        } catch (error) {
            if (error.response && error.response.status === 400) { toast.error(error.response.data.message) }
            console.log(error.response);
        }
    }

    componentDidMount() {

    }

    render() {
        const { location } = this.props;
        if (getCurrentUser()) return <Redirect to="/dashboard" />
        return (
            <React.Fragment>
                <div data-test="signupComponent" className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 py-5 mt-5">
                            <div className="container">
                                <h1 className="pl-3 col-md-4">Manage your Staffs Data</h1>
                                <p className="col-md-9 pt-3"><strong>Welcome</strong>  to  Staff Profile Web Application(STWP) is an intelligent staff management solution that helps you you bring all your staff details into one place—quickly, easily and securely.
                                </p>
                                <div className="pl-3 pt-3">
                                    <img className="img-fluid" src="/images/join_workspace.png" alt="join workspace" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ backgroundColor: '#F6F9FF' }}>
                            <div className="container my-5">
                                <div className="row ">
                                    <div className="col-md-10 offset-md-1">
                                        <div className="row shadow-sm py-5 bg-white">
                                            <div className="col-md-10 offset-md-1">
                                                <MultiForm wrappedComponentRef={(form) => this.form = form}
                                                    ref={this.child} checkUrl={location.pathname}
                                                    onAddUser={this.props.handelAddUser} onSubmitToServer={this.onSubmitToServer} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        storedUser: state.user,
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginUser: (val) => dispatch({ type: actions.LOGIN_USER, resultEld: { fullName: val.fullName, email: val.email, password: val.password, jobTitle: val.jobTitle } }),



    }

}

Signup.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,

    }),
    handelAddUser: PropTypes.func,
    // buttonText: PropTypes.string,
    // emitEvent: PropTypes.func,
};

// insert default values for props to avoid your app breaking
Signup.defaultProps = {
    location: {
        pathname: '',
    },
};

// fetchPosts is an action dispatch from another file
export default connect(mapStateToProps, { mapDispatchToProps: mapDispatchToProps, fetchPosts })(Signup);
