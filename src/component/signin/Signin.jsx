import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';
import { getCurrentUser } from "../../service/userService"
import * as actions from '../../store/actions/index';
import Storage from '../../service/Storage.js';
import MultiForm from '../template/MultiForm';

const data = new Storage();


class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { email: "", password: "" },
            timeout: 1000 * 20 * 1,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false
        };

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
    }

    _onAction(e) {
        console.log('user did something', e)
        this.setState({ isTimedOut: false })
    }

    _onActive(e) {
        console.log('user is active', e)
        this.setState({ isTimedOut: false })
    }

    _onIdle(e) {
        console.log('user is idle', e)
        const isTimedOut = this.state.isTimedOut
        if (isTimedOut) {
            this.props.history.push('/')
        } else {
            this.setState({ showModal: true })
            this.idleTimer.reset();
            this.setState({ isTimedOut: true })
        }

    }

    componentDidMount() {
        console.log(this.props);
    }




    fromServer(user) {
        const serverData = data.getItemsFromStorage();
        if (serverData.email !== user.email || serverData.password !== user.password) {
            toast.error("invalid email or password");
            return;
        } else {
            let newData = { ...serverData, loginNow: true };
            data.clearItemsFromStorage();
            data.storeItem(newData);
            window.location = '/profile';
        }

    }
    render() {
        const { location, tempArr } = this.props;
        if (getCurrentUser()) return <Redirect to="/dashboard" />
        return (
            <React.Fragment>
                <div data-test="signinComponent" className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 py-5 mt-5">


                            {/* start idle Modal */}
                            <IdleTimer
                                ref={ref => { this.idleTimer = ref }}
                                element={document}
                                onActive={this.onActive}
                                onIdle={this.onIdle}
                                onAction={this.onAction}
                                debounce={250}
                                timeout={this.state.timeout} />
                            {/* end Idle Modal */}
                            <div className="container">
                                <h1 className="pl-3">Welcome back</h1>
                                <p className="col-md-8 pt-3">EDMS is an intelligent document management solution that helps you you
                                 bring all of your documents into one place—quickly, easily and securely.
                                    </p>
                                <div className="pl-3 pt-3">
                                    <img data-test="workSpaceImage" className="img-fluid" src="/images/welcome_back.png" alt="join workspace" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ backgroundColor: '#F6F9FF' }}>
                            {/* <div>{tempArr[0]}</div> */}
                            {tempArr ? tempArr.map((data, key) => (<span key={key}>{data.age}</span>)) : ""}
                            <div className="container my-5">
                                <div className="row ">
                                    <div className="col-md-10 offset-md-1">
                                        <div className="row shadow-sm py-5 bg-white">
                                            <div className="col-md-10 offset-md-1">
                                                <MultiForm wrappedComponentRef={(form) => this.form = form}
                                                    ref={this.child} checkUrl={location.pathname}
                                                    fromServer={this.fromServer} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginUser: (val) => dispatch({
            type: actions.LOGIN_USER, resultEld: { fullName: val.fullName, jobTitle: val.jobTitle }
        })
    }
}

const mapStateToProps = (state) => {
    return {
        storedUser: state.user
    }
}


Signin.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    tempArr: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.number,
        isOnline: PropTypes.bool,
    })),
};

// insert default values for props which is object to avoid your app breaking
Signin.defaultProps = {
    location: {
        pathname: '/signin',
    },
};

export default connect(mapStateToProps, { mapDispatchToProps, checkAuthTimeout: actions.checkAuthTimeout })(Signin);
// export default Signin;

