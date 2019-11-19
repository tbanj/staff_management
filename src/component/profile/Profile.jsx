import React, { Component } from 'react';
import { connect } from 'react-redux';
import Storage from '../../service/Storage.js';
const data = new Storage();
class Profile extends Component {
    state = {}
    componentDidMount() {
        // data.clearItemsFromStorage();
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    {this.props.storedUser.fullName}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.user)
    return {
        storedUser: state.user
    }
}
export default connect(mapStateToProps)(Profile);