import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListUser extends Component {
    render() {
        const { title, desc } = this.props;
        if (!title) {
            return null;
        }
        return (<React.Fragment>
            <div data-test="listUserComponent">
                <h2 data-test="componentTitle">{title}</h2>
                <h4 data-test="componentDesc">{desc}</h4>
            </div>
        </React.Fragment>);
    }
}


ListUser.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
};

export default ListUser;