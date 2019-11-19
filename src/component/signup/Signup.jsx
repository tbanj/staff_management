import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../../store/actions/index';
import * as actions from '../../store/actions/index';
import { storeUser } from "../../service/dataService.js";
import MultiForm from '../template/MultiForm';



import Storage from '../../service/Storage';

import 'antd/dist/antd.css';
const data = new Storage();

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {};
        this.child = React.createRef();
        this.fetch = this.fetch.bind(this);

    }

    fetch() {
        console.log('dele');
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



    onSubmitToServer = (user) => {
        const saveData = user;
        delete saveData.confirm;
        console.log(user);
        storeUser(saveData).then(resp => {
            if (resp.status === 201) {

                return resp.json();
            }
        }, (error) => {
            toast.error("error encounter during data fetch");
            return;
        }).then((response) => {
            if (response) {
                toast.success(`registration successfull`);
                data.storeItem(user);
                if (this.props.onLoginUser) {
                    this.props.onLoginUser(user);
                }
                this.child.current.resetFields();
                this.props.history.push("/signin");
            }
        }).catch((error) => { console.log(error); })
    }

    componentDidMount() {

    }

    render() {
        const { location } = this.props;
        return (
            <React.Fragment>
                <div data-test="signupComponent" className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 py-5 mt-5">
                            {/* <div>{this.props.users.email}</div> */}
                            {/* <button onClick={this.getData}>{buttonText}</button> */}
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
